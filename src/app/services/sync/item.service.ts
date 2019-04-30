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
import { ApolloOfflineClient, createOptimisticResponse, OfflineStore } from '@aerogear/voyager-client';
import { taskCacheUpdates } from './cache.updates';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly apollo: ApolloOfflineClient;
  private offlineStore: OfflineStore;

  constructor(aeroGear: VoyagerService) {
    this.apollo = aeroGear.apolloClient;
    this.offlineStore = aeroGear.offlineStore;
  }

  /**
   * Force cache refresh to get recent data
   */
  refreshItems() {
    // Force cache refresh by performing network
    return this.apollo.query<AllTasks>({
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
        if (subscriptionData.data.tasks.action === MutationType.CREATED) {
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
        if (subscriptionData.data.tasks.action === MutationType.DELETED) {
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
      'version': 1,
      'status': 'OPEN'
    };
    return this.apollo.mutate<Task>({
      mutation: ADD_TASK,
      variables: item,
      optimisticResponse:
        createOptimisticResponse('createTask', 'Task', item),
      update: taskCacheUpdates.createTask
    });
  }

  updateItem(item) {
    return this.apollo.mutate<Task>({
      mutation: UPDATE_TASK,
      variables: item,
      update: taskCacheUpdates.updateTask,
      optimisticResponse:
        createOptimisticResponse('updateTask', 'Task', item, false)
    });
  }

  deleteItem(item) {
    return this.apollo.mutate<Task>({
      mutation: DELETE_TASK,
      variables: { id: item.id },
      update: taskCacheUpdates.deleteTask,
      optimisticResponse:
        createOptimisticResponse('deleteTask', 'Task', { id: item.id }, false)
    });
  }

  filterItems(items, searchTerm) {
    return items.filter((item) => {
      const itemContent = item['title'] + item['description'];
      return itemContent.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  getOfflineItems() {
    return this.offlineStore.getOfflineData();
  }

}
