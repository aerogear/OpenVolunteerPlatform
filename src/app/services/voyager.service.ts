import { createClient, VoyagerClient, DataSyncConfig, OfflineQueueListener, ConflictListener } from '@aerogear/datasync-js';
import { Injectable } from '@angular/core';
import { OpenShiftService } from './openshift.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { HeaderProvider } from '@aerogear/datasync-js/types/config/HeaderProvider';

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

  constructor(private openShift: OpenShiftService, public alertCtrl: AlertController, public auth: AuthService) {
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
      conflictListener: new ConflictLogger(this.alertCtrl),
      headerProvider: new AuthHeaderProvider(this.auth)
    };
    if (!this.openShift.hasSyncConfig()) {
      // Use default localhost urls when OpenShift config is missing
      options.httpUrl = 'http://localhost:4000/graphql';
      options.wsUrl = 'ws://localhost:4000/graphql';
    }
    this._apolloClient = await createClient(options);
  }
}

class AuthHeaderProvider implements HeaderProvider {

  constructor(private auth: AuthService) {
  }
  getHeaders(): { [index: string]: string; } {
    if (this.auth.authService) {
      // TODO async
      this.auth.authService.extract().updateToken(30);
      return {
        'Authorization': 'Bearer ' + this.auth.authService.extract().token
      };
    }
  }

}


