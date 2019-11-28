import {
  ApolloOfflineClient,
  DataSyncConfig,
  ConflictListener,
  createClient,
  ApolloOfflineStore
} from '@aerogear/voyager-client';
import { Injectable } from '@angular/core';
import { ShowcaseConfigService } from '../config.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { taskCacheUpdates } from './cache.updates';
import { AuthStateService } from '../auth-state.service';

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
  async mergeOccurred(operationName: string, resolvedData: any, server: any, client: any) {
    const dialog = await this.alertCtrl.create({
      message: `Merged data ${operationName}.</br>,
      Version from server: ${server.version}.</br>`,
      header: `🎉 Auto merge occurred`
    });
    dialog.present();
    setTimeout(() => {
      dialog.dismiss();
    }, 5000);
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

  private _apolloClient: ApolloOfflineClient;
  private _offlineStore: ApolloOfflineStore;
  private _authStateService: AuthStateService;

  constructor(private configService: ShowcaseConfigService, public alertCtrl: AlertController,
    public authService: AuthService, authStateService: AuthStateService) {
    this._authStateService = authStateService;
    this._authStateService.subscribe({
      next: async (info) => {
        if (info.type === 'logout' && this._apolloClient) {
          console.log('user logged out, reset store');
          await this._apolloClient.resetStore();
          await this._apolloClient.cache.reset();
        }
      }
    });
  }

  get apolloClient(): ApolloOfflineClient {
    return this._apolloClient;
  }

  get offlineStore(): ApolloOfflineStore {
    return this._offlineStore;
  }

  public async createApolloClient() {
    const urls = this.configService.config.backend;
    const options: DataSyncConfig = {
      httpUrl: urls.serverUrl,
      wsUrl: urls.wsServerUrl,
      conflictListener: new ConflictLogger(this.alertCtrl),
      fileUpload: true,
      mutationCacheUpdates: taskCacheUpdates,
    };

    options.authContextProvider = await this.authService.getAuthContextProvider();
    const offlineClient = await createClient(options);
    this._offlineStore = offlineClient.offlineStore;
    this._apolloClient = offlineClient.apolloClient;
  }
}
