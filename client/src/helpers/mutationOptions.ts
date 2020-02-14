import { getUpdateFunction, CacheOperation } from 'offix-cache';
import { GET_TASKS } from '../gql/queries';

export const createTask = {
  updateQuery: GET_TASKS,
  returnType: 'Task',
  mutationName: 'createTask',
  operationType: CacheOperation.ADD,
};

export const updateTask = {
  updateQuery: GET_TASKS,
  returnType: 'Task',
  mutationName: 'updateTask',
  operationType: CacheOperation.REFRESH,
};

export const deleteTask = {
  updateQuery: GET_TASKS,
  returnType: 'Task',
  mutationName: 'deleteTask',
  operationType: CacheOperation.DELETE,
};

export const globalCacheUpdates = {
  createTask: getUpdateFunction(createTask),
  updateTask: getUpdateFunction(updateTask),
  deleteTask: getUpdateFunction(deleteTask),
}
