import { Injectable } from '@angular/core';
import {
  ADD_TASK,
  DELETE_TASK,
  GET_TASKS,
  TASK_MUTATED_SUBSCRIPTION,
  UPDATE_TASK
} from './graphql.queries';
import { AllTasks, Task, MutationType } from './types';
import { VoyagerService } from './voyager.service';
import { VoyagerClient, createOptimisticResponse } from '@aerogear/voyager-client';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly apollo: VoyagerClient;

  constructor(aeroGear: VoyagerService) {
    this.apollo = aeroGear.apolloClient;
  }

  /**
   * Force cache refresh to get recent data
   */
  refreshItems() {
    // Force cache refresh by performing network
    this.apollo.query<AllTasks>({
      query: GET_TASKS,
      fetchPolicy: 'network-only',
      errorPolicy: 'none'
    });
  }

  // Watch local cache for updates
  getItems() {
    const getTasks = this.apollo.watchQuery<AllTasks>({
      query: GET_TASKS,
      fetchPolicy: 'cache-first',
      errorPolicy: 'none'
    });
    getTasks.subscribeToMore({
      document: TASK_MUTATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.tasks.task) {
          return prev;
        }
        if (subscriptionData.data.tasks.mutation === MutationType.CREATED) {
          const newTask = subscriptionData.data.tasks.task;
          // don't double add the message
          if (!prev.allTasks.find((task) => task.id === newTask.id)) {
            return Object.assign({}, prev, {
              allTasks: [...prev.allTasks, newTask]
            });
          } else {
            return prev;
          }
        }
        if (subscriptionData.data.tasks.mutation === MutationType.DELETED) {
          const { id } = subscriptionData.data.tasks.task;
          const filteredTasks = prev.allTasks.filter(item => {
            return Number(item.id) !== Number(id);
          });
          prev.allTasks = filteredTasks;
          return prev;
        }
      }
    });
    return getTasks;
  }

  createItem(title, description) {
    const item = {
      'title': title,
      'description': description,
    };
    return this.apollo.mutate<Task>({
      mutation: ADD_TASK,
      variables: item,
      optimisticResponse:
        createOptimisticResponse('createTask', 'Task', item),
      update: this.updateCacheOnAdd
    });
  }

  updateItem(item) {
    return this.apollo.mutate<Task>({
      mutation: UPDATE_TASK,
      variables: item,
      update: this.updateCacheOnEdit,
      optimisticResponse:
        createOptimisticResponse('updateTask', 'Task', item, false)
    });
  }

  deleteItem(item) {
    return this.apollo.mutate<Task>({
      mutation: DELETE_TASK,
      variables: { id: item.id },
      update: this.updateCacheOnDelete,
      optimisticResponse:
        createOptimisticResponse('deleteTask', 'Task', { id: item.id }, false)
    });
  }

  // Local cache updates for CRUD operations
  updateCacheOnAdd(cache, { data: { createTask } }) {
    const { allTasks } = cache.readQuery({ query: GET_TASKS });
    if (!allTasks.find((task) => task.id === createTask.id)) {
      allTasks.push(createTask);
    }
    cache.writeQuery({
      query: GET_TASKS,
      data: {
        'allTasks': allTasks
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

  updateCacheOnDelete(cache, { data: { deleteTask } }) {
    let deletedId;
    if (deleteTask.optimisticResponse) {
      // Map optimistic response field
      deletedId = deleteTask.id;
    } else {
      deletedId = deleteTask;
    }

    const { allTasks } = cache.readQuery({ query: GET_TASKS });
    const newData = allTasks.filter((item) => {
      return deletedId !== item.id;
    });
    cache.writeQuery({
      query: GET_TASKS,
      data: {
        'allTasks': newData
      }
    });
  }
}
