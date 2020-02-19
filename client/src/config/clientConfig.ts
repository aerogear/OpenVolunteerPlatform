import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { globalCacheUpdates, ConflictLogger } from '../helpers';

// retrieve token and get authorization header
const getToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
}

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    lazy: true,
    // add authorization headers for graphql
    // subscriptions
    connectionParams: () => ({
      authorization: getToken(),
    }),
  },
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// add authorization headers for queries
// to grapqhql backend
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getToken(),
    }
  }
});

// split queries and subscriptions.
// send subscriptions to websocket url &
// queries to http url
const link = split(
  ({ query }) => {
    const { kind, operation} : any = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const cache =  new InMemoryCache({
  // cache redirects are used
  // to query the cache for individual Task item
  cacheRedirects: {
    Query: {
      getTask: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Task', id: args.id })
    },
  },
});

export const clientConfig = {
  link: authLink.concat(link),
  cache: cache,
  conflictListener: new ConflictLogger(),
  mutationCacheUpdates: globalCacheUpdates,
};
