import { createClient, strategies, VoyagerClient } from '@aerogear/datasync-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AeroGear {

  private _apolloClient: VoyagerClient;

  constructor() {
  }

  // @ts-ignore
  get apolloClient(): VoyagerClient {
    return this._apolloClient;
  }

  public async createApolloClient() {
    const uri = 'http://localhost:4000/graphql';
    const wsUri = 'ws://localhost:4000/graphql';
    this._apolloClient = await createClient({
      httpUrl: uri,
      wsUrl: wsUri,
      conflictStrategy: strategies.diffMergeClientWins
    });
  }

}
