import { GraphbackContext } from "graphback";
import { ObjectId } from "mongodb";
import { isAuthorizedByRole } from 'keycloak-connect-graphql';
import { UnauthorizedError } from "@graphback/keycloak-authz/dist/utils";

export default {
    Address: {
        __resolveType() {
            return null;
        }
    },

    Mutation: {
        assignVolunteers: async (parent, variables, context: GraphbackContext, info) => {
            const graphback = context.graphback;

            if (!isAuthorizedByRole(["admin"], context)) { // only admin are allowed to create volunteer actions
                throw new UnauthorizedError()
            }

            const now = new Date();


            // find volunteers and recipients with ongoing actions
            // and store their ids somewhere so that they will not be picked as candidates
            // for automatic scheduling
            const { items } = await graphback.VolunteerAction.findBy({ filter: { status: { in: ["CREATED", "ASSIGNED"] } } }, context, info);

            const volunteerIds: any = [];
            const recipientIds: any = [];
            const notCompletedVolunteerActions: any = items || [];
            for (const action of notCompletedVolunteerActions) {
                volunteerIds.push(action.volunteerId);
                recipientIds.push(action.recipientId);
            }

            // let's retrieve volunteers who are deemed free
            const findVolunteers = graphback.Volunteer.findBy({ filter: buildFilter(volunteerIds) }, context, info);

            // let's retrieve recipients who do not have action
            const findRecipients = graphback.Recipient.findBy({ filter: buildFilter(recipientIds) }, context, info);

            const [{ items: newVolunteers }, { items: newRecipients }] = await Promise.all([findVolunteers, findRecipients]);

            let numberOfCasesCreated = 0;
            if (newVolunteers!.length === 0 || newRecipients!.length == 0) {
                return graphback.DailyActionPlan.create({
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
            const { items: products } = await graphback.Product.findBy({
                filter: {
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
                }
            }, context, info)

            // Let's do created automatic actions based on recipients needs.
            // Volunteers will be picked randomly. 
            const pickedVolunteers = new Set<string>();
            for (const recipient of newRecipients!) {
                const labels = recipient.productsLabels;

                // map products to their corresponding distribution centres
                const productsPerDistributionCentres = labels.reduce((acc: any, label: any) => {
                    const foundProduct = products?.find((product: any) => {
                        return product.label.indexOf(label) > -1 || product.description?.indexOf(label) > -1
                    });
                    if (foundProduct) {
                        const distributionCentreProducts = acc[foundProduct.distributionCentreId.toString()] || [];
                        distributionCentreProducts.push(foundProduct);
                        acc[foundProduct.distributionCentreId.toString()] = distributionCentreProducts;
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

                    const volunteerId = volunteerIds[volunteerIndex];
                    pickedVolunteers.add(volunteerId);
                    const volunteerAction = {
                        title,
                        description: `Delivery of ${productsLabels}`,
                        status: "ASSIGNED",
                        assignedAt: now,
                        _createdAt: now,
                        volunteerId,
                        distributionCentreId: new ObjectId(distributionCentreId),
                        recipientId: recipient._id
                    }

                    const { id: volunteerActionId } = await graphback.VolunteerAction.create(volunteerAction, context);
                    numberOfCasesCreated++;

                    // create volunteer action product
                    for (const product of products) {
                        const volunteerActionProduct = {
                            volunteerActionId: volunteerActionId,
                            productId: product._id
                        }

                        await graphback.VolunteerActionProduct.create(volunteerActionProduct, context);
                    }
                }
            }
            
            return {}
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