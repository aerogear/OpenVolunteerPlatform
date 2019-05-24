import { Injectable } from '@angular/core';
import {
  ADD_TASK,
  DELETE_TASK,
  GET_TASKS,
  UPDATE_TASK
} from './graphql.queries';
import { AllTasks, Task } from './types';
import { VoyagerService } from './voyager.service';
import {
  ApolloOfflineClient,
  OfflineStore,
  CacheOperation,
  createMutationOptions,
  subscribeToMoreHelper
} from '@aerogear/voyager-client';
import { subscriptionOptions } from './cache.updates';

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
    subscribeToMoreHelper(getTasks, subscriptionOptions);
    return getTasks;
  }

  createItem(title, description) {
    return this.apollo.offlineMutation<Task>({
        mutation: ADD_TASK,
        variables: {
          'title': title,
          'description': description,
          'version': 1,
          'status': 'OPEN'
        },
        updateQuery: GET_TASKS,
        typeName: 'Task'
      });
  }

  updateItem(item) {
    return this.apollo.offlineMutation<Task>({
        mutation: UPDATE_TASK,
        variables: item,
        updateQuery: GET_TASKS,
        typeName: 'Task',
        operationType: CacheOperation.REFRESH
      }
    );
  }

  deleteItem(item) {
    return this.apollo.offlineMutation<Task>({
        mutation: DELETE_TASK,
        variables: item,
        updateQuery: GET_TASKS,
        typeName: 'Task',
        operationType: CacheOperation.DELETE
      }
    );
  }

  getOfflineItems() {
    return this.offlineStore.getOfflineData();
  }

  getClient() {
    return this.apollo;
  }
}
