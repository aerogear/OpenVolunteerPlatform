import { getUpdateFunction, CacheOperation } from 'offix-cache';
import { findAllTasks } from '../graphql/queries/findAllTasks';

export const createTask = {
  updateQuery: findAllTasks,
  returnType: 'Task',
  mutationName: 'createTask',
  operationType: CacheOperation.ADD,
};

export const updateTask = {
  updateQuery: findAllTasks,
  returnType: 'Task',
  mutationName: 'updateTask',
  operationType: CacheOperation.REFRESH,
};

export const deleteTask = {
  updateQuery: findAllTasks,
  returnType: 'Task',
  mutationName: 'deleteTask',
  operationType: CacheOperation.DELETE,
};

export const globalCacheUpdates = {
  createTask: getUpdateFunction(createTask),
  updateTask: getUpdateFunction(updateTask),
  deleteTask: getUpdateFunction(deleteTask),
}
