import { Injectable } from '@angular/core';
import {
  ADD_TASK,
  DELETE_TASK,
  GET_TASKS,
  TASK_CREATED_SUBSCRIPTION,
  TASK_DELETED_SUBSCRIPTION,
  TASK_MODIFIED_SUBSCRIPTION,
  UPDATE_TASK
} from './graphql.queries';
import { AllTasks, Task } from './types';
import { VoyagerService } from './voyager.service';
import { VoyagerClient, createOptimisticResponse } from '@aerogear/datasync-js';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly apollo: VoyagerClient;

  constructor(private aeroGear: VoyagerService) {
    this.apollo = aeroGear.apolloClient;
  }

  getItems() {
    // Try watch query
    return this.apollo.watchQuery<AllTasks>({
      query: GET_TASKS,
      // TODO document this as suggested approach
      fetchPolicy: 'cache-first',
      errorPolicy: 'none'
    });
  }

  createItem(title, description) {
    const item = {
      'title': title,
      'description': description,
    };
    return this.apollo.mutate<Task>({
      mutation: ADD_TASK,
      variables: item,
      optimisticResponse: createOptimisticResponse('createTask', 'Task', item),
      update: this.updateCacheOnAdd
    });
  }

  updateItem(item) {
    // TODO support update
    const response = createOptimisticResponse('updateTask', 'Task', item);
    response.updateTask.id = item.id;
    return this.apollo.mutate<Task>({
      mutation: UPDATE_TASK,
      variables: item,
      update: this.updateCacheOnEdit,
      optimisticResponse: response,
    });
  }

  deleteItem(item) {
    // TODO support update
    const response = createOptimisticResponse('deleteTask', 'Task', item);
    response.deleteTask.id = item.id;
    return this.apollo.mutate<Task>({
      mutation: DELETE_TASK,
      variables: { id: item.id },
      update: this.updateCacheOnDelete,
      optimisticResponse: response
    });
  }

  subscribeToUpdate(observer?: (value: any) => void) {
    return this.apollo.subscribe<any>({ query: TASK_MODIFIED_SUBSCRIPTION }).subscribe(observer);
  }

  subscribeToDelete(observer?: (value: any) => void) {
    return this.apollo.subscribe({ query: TASK_DELETED_SUBSCRIPTION }).subscribe(observer);
  }

  subscribeToNew(observer?: (value: any) => void) {
    return this.apollo.subscribe<any>({ query: TASK_CREATED_SUBSCRIPTION }).subscribe(observer);
  }

  // Cache processors

  updateCacheOnDelete(cache, { data: { deleteTask } }) {
    if (deleteTask.optimisticResponse) {
      deleteTask = deleteTask.id;
    }
    const { allTasks } = cache.readQuery({ query: GET_TASKS });
    const newData = allTasks.filter((item) => {
      return deleteTask !== item.id;
    });
    cache.writeQuery({
      query: GET_TASKS,
      data: {
        'allTasks': newData
      }
    });
  }

  updateCacheOnAdd(cache, { data: { createTask } }) {
    const { allTasks } = cache.readQuery({ query: GET_TASKS });
    cache.writeQuery({
      query: GET_TASKS,
      data: {
        'allTasks': allTasks.concat([createTask])
      }
    });
  }

  updateCacheOnEdit(cache, { data: { updateTask } }) {
    const { allTasks } = cache.readQuery({ query: GET_TASKS });
    if (allTasks) {
      const index = allTasks.findIndex((task) => {
        return updateTask.id === task.id;
      });
      allTasks[index] = updateTask;
    }
    cache.writeQuery({
      query: GET_TASKS,
      data: {
        'allTasks': allTasks
      }
    });
  }
}
