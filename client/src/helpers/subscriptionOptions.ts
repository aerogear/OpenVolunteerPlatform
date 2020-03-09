import { createSubscriptionOptions } from 'offix-client';
import { CacheOperation } from 'offix-cache';
import { findAllTasks } from '../graphql/queries/findAllTasks';
import { newTask } from '../graphql/subscriptions/newTask';
import { updatedTask } from '../graphql/subscriptions/updatedTask';
import { deletedTask } from '../graphql/subscriptions/deletedTask';

// use offix-client helpers to create the required
// subscription options for an `add` event
export const add = createSubscriptionOptions({
  subscriptionQuery: newTask,
  cacheUpdateQuery: findAllTasks,
  operationType: CacheOperation.ADD,
});

// use offix-client helpers to create the required
// subscription options for an `update` event
export const edit = createSubscriptionOptions({
  subscriptionQuery: updatedTask,
  cacheUpdateQuery: findAllTasks,
  operationType: CacheOperation.REFRESH,
});

export const remove = createSubscriptionOptions({
  subscriptionQuery: deletedTask,
  cacheUpdateQuery: findAllTasks,
  operationType: CacheOperation.DELETE,
});
