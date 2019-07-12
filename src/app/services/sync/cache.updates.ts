import {
    GET_TASKS,
    TASK_ADDED_SUBSCRIPTION,
    TASK_UPDATED_SUBSCRIPTION,
    TASK_DELETED_SUBSCRIPTION
} from './graphql.queries';
import {
    SubscriptionHelperOptions,
    CacheOperation,
    getUpdateFunction
} from '@aerogear/voyager-client';


export const taskCacheUpdates = {
    createTask: getUpdateFunction('createTask', 'id', CacheOperation.ADD, GET_TASKS),
    updateTask: getUpdateFunction('updateTask', 'id', CacheOperation.REFRESH, GET_TASKS),
    deleteTask: getUpdateFunction('deleteTask', 'id', CacheOperation.DELETE, GET_TASKS)
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

