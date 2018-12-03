import { Injectable } from '@angular/core';
import { GET_TASKS } from './graphql.queries';
import { Apollo } from 'apollo-angular';


interface Task {
  id: string;
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
    const randomId = Math.random().toString(36).substr(2, 5);
    // this.items.push({
    //   'id': randomId,
    //   'title': title,
    //   'description': description
    // });
  }

  updateItem(newValues) {
    // let itemIndex = this.items.findIndex(item => item.id == newValues.id);
    // this.items[itemIndex] = newValues;
  }
}
