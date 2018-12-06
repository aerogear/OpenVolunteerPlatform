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
import ApolloClient from 'apollo-client/ApolloClient';
import { AeroGear } from './aerogear';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // @ts-ignore
  private readonly apollo: ApolloClient;

  constructor(private aeroGear: AeroGear) {
    this.apollo = aeroGear.apolloClient;
  }

  getItems() {
    return this.apollo.query<AllTasks>({ query: GET_TASKS });
  }

  createItem(title, description) {
    const item = {
      'title': title,
      'description': description,
    };
    return this.apollo.mutate<Task>({ mutation: ADD_TASK, variables: item });
  }

  updateItem(newValues) {
    return this.apollo.mutate<Task>({ mutation: UPDATE_TASK, variables: newValues });
  }

  deleteItem(item) {
    return this.apollo.mutate<Task>({ mutation: DELETE_TASK, variables: { id: item.id } });
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
}
