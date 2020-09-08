
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from 'apollo-utilities';
import { getAuthHeader } from '../keycloakAuth';
import { Capacitor } from '@capacitor/core';
import { InMemoryCache, FetchPolicy, ApolloLink, HttpLink } from '@apollo/client';

let httpUri = 'http://localhost:4000/graphql';
let wsUri = 'ws://localhost:4000/graphql';

if (Capacitor.isNative && Capacitor.platform === 'android') {
  httpUri = 'http://10.0.2.2:4000/graphql';
  wsUri = 'ws://10.0.2.2:4000/graphql';
}

if (process.env.REACT_APP_URI_FORMAT === 'RELATIVEURI') {
  httpUri = "/graphql";
  const protocol = window.location.protocol === "https:" ? "wss://" : "ws://";
  const port = window.location.port !== "" ? `:${window.location.port}` : "";
  wsUri = `${protocol}${window.location.hostname}${port}${httpUri}`
}

/**
 * Create websocket link and
 * define websocket link options
 */
const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
    lazy: true,
    // returns auth header or empty string
    connectionParams: async () => (await getAuthHeader())
  },
});

const httpLink = new HttpLink({
  uri: httpUri,
});

/**
 * add authorization headers for queries
 * to grapqhql backend
 * 
 */
const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      // returns auth header or empty string
      ...await getAuthHeader()
    }
  }
});

/**
 * split queries and subscriptions.
 * send subscriptions to websocket url &
 * queries to http url
 * 
 */
const splitLink = ApolloLink.split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const noCache: FetchPolicy = 'no-cache';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: noCache,
  },
  query: {
    fetchPolicy: noCache,
  },
  mutate: {
    fetchPolicy: noCache
  }
}

export const clientConfig = {
  defaultOptions,
  cache: new InMemoryCache(),
  link: authLink.concat(splitLink)
};
