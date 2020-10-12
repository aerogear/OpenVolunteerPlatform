
import { IResolvers, GraphQLResolveInfo, QueryFilter, GraphbackContext } from './generated';
import { NoteFilter } from './generated/generated-types';

/**
 * getDraftTasks serverless function
 */
export const noteResolvers: IResolvers = {
    Query: {
        getDraftTasks: async (parent: any, args: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
            const filter: QueryFilter<NoteFilter> = {
                title: {
                    startsWith: 'Draft'
                }
            }

            const results = await context.graphback.Task.findBy({ filter }, context, info);

            return results.items;
        }
    }
}
