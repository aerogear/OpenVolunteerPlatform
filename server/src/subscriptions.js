const {
  execute,
  subscribe
} = require('graphql')
const { PubSub } = require('apollo-server');
const { SubscriptionServer } = require('subscriptions-transport-ws')

function subscriptionServer (keycloakService, httpServer, apolloServer) {
    return new SubscriptionServer({
      execute,
      subscribe,
      onConnect: async connectionParams => {
        if(keycloakService) {
          return await keycloakService.validateToken(connectionParams)
        } else {
          return true;
        }
      },
      schema: apolloServer.schema
    }, {
      server: httpServer,
      path: '/graphql'
    });
}

module.exports = {
    pubSub: new PubSub(),
    subscriptionServer
}