import {
  createClient, VoyagerClient, Voyager, DataSyncConfig,
  OfflineQueueListener, OfflineStore, ConflictListener, AuthContextProvider
} from '@aerogear/voyager-client';
import { Injectable, Injector } from '@angular/core';
import { OpenShiftService } from '../openshift.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { taskCacheUpdates } from './cache.updates';

/**
 * Class used to log data conflicts in server
 */
class ConflictLogger implements ConflictListener {
  constructor(public alertCtrl: AlertController) { }
  async conflictOccurred(operationName: string, resolvedData: any, server: any, client: any) {
    const dialog = await this.alertCtrl.create({
      message: `Conflict on ${operationName}.</br>
      Version from server: ${server.version}.</br>`,
      header: `🤷 Data conflict occurred`,
      buttons: ['OK']
    });
    dialog.present();
    console.log(`data: ${JSON.stringify(resolvedData)}, server: ${JSON.stringify(server)} client: ${JSON.stringify(client)} `);
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
  private _voyagerConfig: DataSyncConfig;

  constructor(private openShift: OpenShiftService, public alertCtrl: AlertController, public injector: Injector) {
  }

  set queueListener(listener: OfflineQueueListener) {
    this.listener = listener;
  }

  get apolloClient(): VoyagerClient {
    return this._apolloClient;
  }

  get voyagerConfig(): DataSyncConfig {
    return this._voyagerConfig;
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
    // Merget all cache updates functions (currently only single)
    const mergedCacheUpdates = taskCacheUpdates;
    const options: DataSyncConfig = {
      offlineQueueListener: numberOfOperationsProvider,
      conflictListener: new ConflictLogger(this.alertCtrl),
      fileUpload: true,
      mutationCacheUpdates: mergedCacheUpdates
    };
    if (!this.openShift.hasSyncConfig()) {
      // Use default localhost urls when OpenShift config is missing
      options.httpUrl = 'http://localhost:4000/graphql';
      options.wsUrl = 'ws://localhost:4000/graphql';
    } else {
      options.openShiftConfig = this.openShift.getConfig();
    }
    const authService = this.injector.get(AuthService);
    if (authService.isEnabled()) {
      options.authContextProvider = authService.getAuthContextProvider();
    }
    const voyager = await createClient(options);
    this._apolloClient = voyager.client;
    this._voyagerConfig = voyager.config;
  }
}
