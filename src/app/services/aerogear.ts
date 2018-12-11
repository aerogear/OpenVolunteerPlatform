import { createClient, strategies, VoyagerClient } from '@aerogear/datasync-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AeroGear {

  private _apolloClient: VoyagerClient;

  constructor() {
  }

  get apolloClient(): VoyagerClient {
    return this._apolloClient;
  }

  public async createApolloClient() {
    const uri = 'http://ee26f0f7.ngrok.io/graphql';
    const wsUri = 'ws://ee26f0f7.ngrok.io/graphql';
    this._apolloClient = await createClient({
      httpUrl: uri,
      wsUrl: wsUri,
      conflictStrategy: strategies.diffMergeClientWins
    });
  }

}
