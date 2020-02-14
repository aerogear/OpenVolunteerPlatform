import { createSubscriptionOptions } from 'offix-client';
import { CacheOperation } from 'offix-cache';
import {
  GET_TASKS,
  TASK_ADDED_SUBSCRIPTION,
  TASK_UPDATED_SUBSCRIPTION,
  TASK_DELETED_SUBSCRIPTION,
} from '../gql/queries';
import { ITask } from '../declarations';

// use offix-client helpers to create the required
// subscription options for an `add` event
export const add = createSubscriptionOptions({
  subscriptionQuery: TASK_ADDED_SUBSCRIPTION,
  cacheUpdateQuery: GET_TASKS,
  operationType: CacheOperation.ADD,
});

// use offix-client helpers to create the required
// subscription options for an `update` event
export const edit = createSubscriptionOptions({
  subscriptionQuery: TASK_UPDATED_SUBSCRIPTION,
  cacheUpdateQuery: GET_TASKS,
  operationType: CacheOperation.REFRESH,
});

// Custom options for delete subscription event
// since offix expects the return type to
// be the full object on not id only
export const remove = {
  document: TASK_DELETED_SUBSCRIPTION,
  updateQuery: (prev: any, { subscriptionData } : { subscriptionData: any}) => {
    if (!subscriptionData.data) return prev;

    const { data } = subscriptionData;
 
    // get the object key for the todo list
    // in this case `findAllTodos`
    const [queryField] = Object.keys(prev);

    // get the object key for the mutated
    // item, in this case `deletedTodo`
    const [key] = Object.keys(data);

    // Get the `prev` object and replace
    // the `findAllTodos` array with
    // filtered todo list
    return {
      // ...prev,
      [queryField]: prev[queryField].filter((task : ITask): boolean => {
        return task.id !== data[key].id;
      }),
    };
  },
};
