export default {
    Address: {
        __resolveType() {
            return null;
        }
    },

    Mutation: {
        assignVolunteers: (parent, variables, context, info) => {
            // console.log("entering")
            // const graphback = {
            //     services: context.graphback.services,
            //     options: {
            //         selectedFields: [
            //             "id",
            //             "owner",
            //             "date",
            //             "numberOfCasesCreated",
            //             "numberOfVolunteersAssigned"],
            //         aggregations: {
            //             count: false
            //         }
            //     }
            // };
            // console.log(Object.keys(context.graphback));
            // const newContext = { ...context, graphback };
            // const srv = context.graphback.services;
            // // TODO iterate thru all volunteers
            // const volunteers = srv.Volunteer.findBy(undefined,
            //     newContext, undefined, { limit: 10, offset: 0 });
            // const recipients = srv.Recipient.findBy({},
            //     newContext, undefined, { limit: 10, offset: 0 });
            // const distributionCenters = srv.DistributionCenter.find({},
            //     newContext, undefined, { limit: 10, offset: 0 })
            // console.log(recipients)
            // console.log(distributionCenters)
            // TODO 
            return {
                numberOfCasesCreated: 0,
                numberOfVolunteersAssigned: 0
            }
        }

    }
}
