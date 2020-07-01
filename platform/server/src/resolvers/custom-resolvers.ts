import { GraphbackContext } from "graphback";
import {ObjectId} from "mongodb";

export default {
    Address: {
        __resolveType() {
            return null;
        }
    },

    Mutation: {
        assignVolunteers: async (parent, variables, context: GraphbackContext, info) => {
            const now = new Date();
            const services = context.graphback.services;
            
            // find volunteers and recipients with ongoing actions
            // and store their ids somewhere so that they will not be picked as candidates
            // for automatic scheduling
            const { items } = await services.VolunteerAction.findBy({ status: { in: ["CREATED", "ASSIGNED"] } }, context);
                
            const volunteerIds: any = [];
            const recipientIds: any = [];
            const notCompletedVolunteerActions: any = items || [];
            for ( const action of notCompletedVolunteerActions) {
                volunteerIds.push(new ObjectId(action.volunteerId));
                recipientIds.push(new ObjectId(action.recipientId));
            }
            
            // let's retrieve volunteers who are deemed free
            const findVolunteers = services.Volunteer.findBy(buildFilter(volunteerIds), context);
            
            // let's retrieve recipients who do not have action
            const findRecipients = services.Recipient.findBy(buildFilter(recipientIds), context);
                
            const [{items: newVolunteers}, {items: newRecipients}] = await Promise.all([findVolunteers, findRecipients]);
            
            let numberOfCasesCreated = 0; 
            if (newVolunteers!.length === 0 || newRecipients!.length == 0) {
                return services.DailyActionPlan.create({
                    date: now,
                    owner: "ovp-admin", // TODO retrieve this info from Keycloak context
                    numberOfCasesCreated,
                    numberOfVolunteersAssigned: 0,
                    numberOfRecipients: 0
                }, context);
            }

            const productsLabels = newRecipients?.reduce((acc: any, recipient: any) => {
                const prefferedProducts = recipient.prefferedProducts || '';  
                const labels = prefferedProducts.split(",")
                .map((label: any) => label.trim());
                recipient.productsLabels = labels; // hack to store product label so as to not recompute it again
                return [...acc, ...labels];
            }, []);


            // let's find products details based on recipients needs
            // this include the distribution centres that the product is available
            const {items: products} = await services.Product.findBy({
                distributionCentreId: {
                    ne: undefined
                },
                or: productsLabels.map((label: string) => {
                    return {
                        label: {
                            contains: label
                        },
                        description: {
                            contains: label
                        }
                    }
                })
            }, context)

        
            // Let's do created automatic actions based on recipients needs.
            // Volunteers will be picked randomly. 
            for (const recipient of newRecipients!) {
                const labels = recipient.productsLabels;
                
                // map products to their corresponding distribution centres
                const productsPerDistributionCentres = labels.reduce((acc: any, label: any) => {
                    const foundProduct = products?.find((product: any) => {
                        return product.label.indexOf(label) > -1 || product.description?.indexOf(label) > -1
                    });
                    if (foundProduct) {
                        const distributionCentreProducts = acc[foundProduct.distributionCentreId] || [];
                        distributionCentreProducts.push(foundProduct);
                        acc[foundProduct.distributionCentreId] = distributionCentreProducts;
                    }

                    return acc;
                }, {});

                // create volunteer action
                for (const distributionCentreId of Object.keys(productsPerDistributionCentres)) {
                    const products = productsPerDistributionCentres[distributionCentreId]
                    
                    // automatic action label, can be edited later on
                    const productsLabels = products.map((product) => product.label).join(",");
                    const title = `Automatic Daily Delivery to ${recipient.firstName} ${recipient.lastName}`; 
                    
                    // action to be created
                    let volunteerIndex = Math.round(Math.random() * volunteerIds.length);
                    if (volunteerIndex >= volunteerIds.length) {
                        volunteerIndex = volunteerIds.length - 1;
                    }

                    const volunteerId = volunteerIds[volunteerIndex].toString();

                    const volunteerAction = {
                        title,
                        description: `${title} of ${productsLabels}`,
                        status: "ASSIGNED",
                        assignedAt: now,
                        _createdAt: now,
                        volunteerId,
                        distributionCentreId,
                        recipientId: recipient.id.toString()
                    }

                    const {id: volunteerActionId} = await services.VolunteerAction.create(volunteerAction, context);
                    numberOfCasesCreated++;

                    // create volunteer action product
                    for (const product of products) {
                        const volunteerActionProduct = {
                           volunteerActionId: volunteerActionId,
                           productId: product.id
                        }

                        await services.VolunteerActionProduct.create(volunteerActionProduct, context);
                    }
                }
            }    
                // TODO 
            return services.DailyActionPlan.create({
                date: now,
                owner: "ovp-admin", // TODO retrieve this info from Keycloak context
                numberOfCasesCreated,
                numberOfVolunteersAssigned: newVolunteers!.length,
                numberOfRecipients: newRecipients!.length
            }, context)
        }

    }
}

function buildFilter(ids: []) {
    if (!ids.length) {
        return {}
    }
    return {
        not: {
            _id: {
                in: ids
            }
        }
    }
}