import { createClient, VoyagerClient, DataSyncConfig, OfflineQueueListener, ConflictListener } from '@aerogear/datasync-js';
import { Injectable } from '@angular/core';
import { OpenShiftService } from './openshift.service';

class ConflictLogger implements ConflictListener {
  conflictOccurred(operationName: string, resolvedData: any, server: any, client: any): void {
    alert(`Conflict for ${operationName}`);
    console.log(arguments);
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service provides Apollo Voyager client
 */
export class VoyagerService {

  private _apolloClient: VoyagerClient;
  private listener: OfflineQueueListener;

  constructor(private openShift: OpenShiftService) {
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
    const options: DataSyncConfig = {
      offlineQueueListener: numberOfOperationsProvider,
      conflictListener: new ConflictLogger()
    };
    if (!this.openShift.hasSyncConfig()) {
      options.httpUrl = 'http://localhost:4000/graphql';
      options.wsUrl = 'ws://localhost:4000/graphql';
    }
    this._apolloClient = await createClient(options);
  }
}

