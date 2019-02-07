import { Injectable } from '@angular/core';
import {
  UPLOADS,
  UPLOAD_FILE
} from './graphql.queries';
import { VoyagerService } from '../sync/voyager.service';
import { VoyagerClient, createOptimisticResponse } from '@aerogear/voyager-client';
import { FileEntries } from './types';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly apollo: VoyagerClient;

  constructor(aeroGear: VoyagerService) {
    this.apollo = aeroGear.apolloClient;
  }

  // Watch local cache for updates
  getItems() {
    const getTasks = this.apollo.query<FileEntries>({
      query: UPLOADS,
    });
    return getTasks;
  }

  createItem(title, description) {
    const item = {
      'title': title,
      'description': description,
    };
    return this.apollo.mutate<FileEntries>({
      mutation: UPLOAD_FILE,
      variables: item
    });
  }
}
