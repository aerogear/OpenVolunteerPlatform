import { ObjectId } from "mongodb";
import { GraphbackContext } from "graphback";
import { isAuthorizedByRole } from "keycloak-connect-graphql";
import { UnauthorizedError } from "@graphback/keycloak-authz/dist/utils";
import { CONTEXT_KEY as KEYCLOAK_CONTEXT_KEY } from "keycloak-connect-graphql";
import { GraphQLResolveInfo } from 'graphql';

export default {
  Address: {
    __resolveType() {
      return null;
    }
  },

  Mutation: {
    assignVolunteers: async ( _, __, context: GraphbackContext, info: GraphQLResolveInfo ) => {
      const graphback = context.graphback;

      if (!isAuthorizedByRole(["admin"], context)) {
        // only admin are allowed to create volunteer actions
        throw new UnauthorizedError();
      }

      const now = new Date();

      // find volunteers and recipients with ongoing actions
      // and store their ids somewhere so that they will not be picked as candidates
      // for automatic scheduling
      const { items } = await graphback.VolunteerAction.findBy(
        { filter: { status: { in: ["CREATED", "ASSIGNED"] } } },
        context
      );

      const volunteerIds: any = [];
      const recipientIds: any = [];
      const notCompletedVolunteerActions: any = items || [];
      for (const action of notCompletedVolunteerActions) {
        volunteerIds.push(action.volunteerId);
        recipientIds.push(action.recipientId);
      }

      // let's retrieve volunteers who are deemed free
      const findVolunteers = graphback.Volunteer.findBy(
        {
          filter: buildQueryToFindAllItemsExcludingThoseWithGivenIds(
            volunteerIds
          )
        },
        context
      );

      // let's retrieve recipients who do not have action
      const findRecipients = graphback.Recipient.findBy(
        {
          filter: buildQueryToFindAllItemsExcludingThoseWithGivenIds(
            recipientIds
          )
        },
        context
      );

      const [
        { items: newVolunteers },
        { items: newRecipients }
      ] = await Promise.all([findVolunteers, findRecipients]);

      let numberOfCasesCreated = 0;

      // The owner that initiated this creation. This is the current signed in user.
      const owner =
        context[KEYCLOAK_CONTEXT_KEY].accessToken.content.preferred_username;

      if (newVolunteers!.length === 0 || newRecipients!.length == 0) {
        // create an empty action since no volunteer or recipients
        const actionPlan = {
            date: now,
            owner,
            numberOfCasesCreated,
            numberOfVolunteersAssigned: 0,
            numberOfRecipients: 0
        };

        return graphback.DailyActionPlan.create(actionPlan, context, info);
      }

      const productsLabels = newRecipients?.reduce(
        (acc: any, recipient: any) => {
          const prefferedProducts = recipient.prefferedProducts || "";
          const labels = prefferedProducts
            .split(",")
            .map((label: any) => label.trim());
          recipient.productsLabels = labels; // hack to store product label so as to not recompute it again
          return [...acc, ...labels];
        },
        []
      );

      // let's find products details based on recipients needs
      // this include the distribution centres that the product is available
      const { items: products } = await graphback.Product.findBy(
        {
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
              };
            })
          }
        },
        context
      );

      // Let's now create automatic actions based on recipients needs.
      // Volunteers will be picked randomly.
      // Later on they can be picked according to proximity to the distribution center recipient location. See "pickVolunteer" function.
      const pickedVolunteers = new Set<string>();
      for (const recipient of newRecipients!) {
        const labels = recipient.productsLabels;

        // map products to their corresponding distribution centres
        const productsPerDistributionCentres = labels.reduce(
          (acc: any, label: any) => {
            const foundProduct = products?.find((product: any) => {
              return (
                product.label?.indexOf(label) > -1 ||
                product.description?.indexOf(label) > -1
              );
            });

            if (foundProduct) {
              const distributionCentreId = foundProduct.distributionCentreId.toString();
              const distributionCentreProducts = acc[distributionCentreId] || [];
              distributionCentreProducts.push(foundProduct);
              acc[distributionCentreId] = distributionCentreProducts;
            }

            return acc;
          },
          {}
        );

        // create volunteer action
        const distributionCentreIds = Object.keys( productsPerDistributionCentres);
        for (const distributionCentreId of distributionCentreIds) {
          const products = productsPerDistributionCentres[distributionCentreId];

          // automatic action label, can be edited later on
          const productsLabels = products
            .map((product) => product.label)
            .join(",");
            
          const title = `Automatic Daily Delivery to ${recipient.firstName} ${recipient.lastName}`;

          const volunteerId = pickVolunteer(pickedVolunteers, newVolunteers);

          // action to be created
          const volunteerAction = {
            title,
            description: `Delivery of ${productsLabels}`,
            status: "ASSIGNED",
            assignedAt: now,
            _createdAt: now,
            volunteerId,
            distributionCentreId: new ObjectId(distributionCentreId),
            recipientId: recipient._id
          };

          const {
            id: volunteerActionId
          } = await graphback.VolunteerAction.create(volunteerAction, context);
          numberOfCasesCreated++;

          // create volunteer action product
          for (const product of products) {
            const volunteerActionProduct = {
              volunteerActionId: volunteerActionId,
              productId: product._id
            };

            await graphback.VolunteerActionProduct.create(
              volunteerActionProduct,
              context
            );
          }
        }
      }

      // create a new action plan based with number of cases created
      const actionPlan = {
        date: now,
        owner,
        numberOfCasesCreated,
        numberOfVolunteersAssigned: pickedVolunteers.size,
        numberOfRecipients: newRecipients!.length
      };

      return graphback.DailyActionPlan.create( actionPlan, context, info);
    }
  }
};

function buildQueryToFindAllItemsExcludingThoseWithGivenIds(ids: []) {
  if (!ids.length) {
    return {};
  }
  return {
    not: {
      _id: {
        in: ids
      }
    }
  };
}

/**
 * Pick a volunteer randomly from the list of new potential volunteers.
 * This function will try to evenly distribute the number of times a volunteer is choosen
 * to make sure that a volunteer is choosen at least one.
 * Later on this function can take the distribution center and potential recipient so that
 * a volunteer will be picked depending on the closeness to the two locations (distribution centre and recipient locations)
 */
function pickVolunteer(pickedVolunteers: Set<string>, newVolunteers: any[]) {
  let volunteerIndex = Math.round(Math.random() * newVolunteers.length);
  if (volunteerIndex >= newVolunteers.length) {
    volunteerIndex = newVolunteers.length - 1;
  }

  const volunteerId = newVolunteers[volunteerIndex]._id;
  if (
    pickedVolunteers.has(volunteerId.toHexString()) &&
    pickedVolunteers.size != newVolunteers.length
  ) {
    return pickVolunteer(pickedVolunteers, newVolunteers);
  }

  pickedVolunteers.add(volunteerId.toHexString());
  return volunteerId;
}
