import { Injectable } from '@angular/core';
import { GET_TASKS, UPDATE_TASK, DELETE_TASK, ADD_TASK } from './graphql.queries';
import { Apollo } from 'apollo-angular';

export interface Task {
  id: string;
  version: number;
  title: string;
  description: string;
}

interface AllTasks {
  allTasks: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private apollo: Apollo) { }

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
}
