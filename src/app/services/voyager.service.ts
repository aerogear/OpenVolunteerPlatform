import { createClient, VoyagerClient, OfflineQueueListener } from '@aerogear/datasync-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Service provides Apollo Voyager client
 */
export class VoyagerService {

  private _apolloClient: VoyagerClient;
  private listener: OfflineQueueListener;

  constructor() {
  }

  set queueListener(listener: OfflineQueueListener) {
    this.listener = listener;
  }

  get apolloClient(): VoyagerClient {
    return this._apolloClient;
  }

  public async createApolloClient() {
    const self = this;
    // Provides basic info about the offline queue
    const numberOfOperationsProvider: OfflineQueueListener = {
      onOperationEnqueued(operation) {
        if (self.listener) {
          self.listener.onOperationEnqueued(operation);
        }
      },

      queueCleared() {
        if (self.listener) {
          self.listener.queueCleared();
        }
      }
    };
    const uri = 'http://ee26f0f7.ngrok.io/graphql';
    const wsUri = 'ws://ee26f0f7.ngrok.io/graphql';
    this._apolloClient = await createClient({
      httpUrl: uri,
      wsUrl: wsUri,
      offlineQueueListener: numberOfOperationsProvider
    });
  }

}
