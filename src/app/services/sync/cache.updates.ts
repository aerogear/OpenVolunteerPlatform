import {
  GET_TASKS,
  TASK_ADDED_SUBSCRIPTION,
  TASK_UPDATED_SUBSCRIPTION,
  TASK_DELETED_SUBSCRIPTION
} from './graphql.queries';
import { SubscriptionHelperOptions, CacheOperation, getUpdateFunction } from '@aerogear/voyager-client';

export const taskCacheUpdates = {
  createTask: getUpdateFunction({
    mutationName: 'createTask',
    idField: 'id',
    operationType: CacheOperation.ADD,
    updateQuery: GET_TASKS
  }),
  updateTask: getUpdateFunction({
    mutationName: 'updateTask',
    idField: 'id',
    operationType: CacheOperation.REFRESH,
    updateQuery: GET_TASKS
  }),
  deleteTask: getUpdateFunction({
    mutationName: 'deleteTask',
    idField: 'id',
    operationType: CacheOperation.DELETE,
    updateQuery: GET_TASKS
  })
};

export const taskAddedHelper: SubscriptionHelperOptions = {
  subscriptionQuery: TASK_ADDED_SUBSCRIPTION,
  cacheUpdateQuery: GET_TASKS,
  operationType: CacheOperation.ADD
};

export const taskUpdatedHelper: SubscriptionHelperOptions = {
  subscriptionQuery: TASK_UPDATED_SUBSCRIPTION,
  cacheUpdateQuery: GET_TASKS,
  operationType: CacheOperation.REFRESH
};

export const taskDeletedHelper: SubscriptionHelperOptions = {
  subscriptionQuery: TASK_DELETED_SUBSCRIPTION,
  cacheUpdateQuery: GET_TASKS,
  operationType: CacheOperation.DELETE
};

export const subscriptionOptions: SubscriptionHelperOptions[] = [taskAddedHelper, taskUpdatedHelper, taskDeletedHelper];
