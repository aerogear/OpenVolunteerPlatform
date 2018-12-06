import { createClient, strategies } from '@aerogear/datasync-js';
import { Injectable } from '@angular/core';
import ApolloClient from 'apollo-client/ApolloClient';

@Injectable({
  providedIn: 'root'
})

export class AeroGear {

  // @ts-ignore
  private _apolloClient: ApolloClient;

  constructor() {
  }

  // @ts-ignore
  get apolloClient(): ApolloClient {
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
