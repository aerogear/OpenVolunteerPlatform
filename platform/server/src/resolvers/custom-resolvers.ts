import { GraphbackContext } from "graphback"

export default {
    Address: {
        __resolveType() {
            return null;
        }
    },

    Mutation: {
        assignVolunteers: (parent, variables, context: GraphbackContext, info) => {
            console.log("entering")
            const srv = context.graphback.services;
            // TODO iterate thru all volunteers
            const volunteers = srv.Volunteer.findBy({},
                context, undefined, { limit: 10, offset: 0 });
            const recipients = srv.Recipient.findBy({},
                context, undefined, { limit: 10, offset: 0 });
            const distributionCenters = srv.DistributionCenter.findBy({},
                context, undefined, { limit: 10, offset: 0 })

            console.log(volunteers)
            console.log(recipients)
            console.log(distributionCenters)
            // TODO 
            return {
                id: "whatever",
                date: new Date(),
                owner: "temp guy",
                numberOfCasesCreated: 0,
                numberOfVolunteersAssigned: 0
            }
        }

    }
}
