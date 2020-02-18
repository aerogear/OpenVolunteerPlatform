import React, { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from '@react-keycloak/web';
import { ApolloOfflineClient } from 'offix-client';
import { ApolloOfflineProvider } from 'react-offix-hooks';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppContext } from './services/AppContext';
import { keycloakConfig, clientConfig } from './config';
import { keycloakEnabled, onKeycloakTokens } from './helpers/keycloakHelpers';
import { Loading } from './components/Loading';
import { IContainerProps } from './declarations';

const client = new ApolloOfflineClient(clientConfig);

export const AppContainer: React.FC<IContainerProps> = ({ app: App }) => {

  const [initialized, setInitialized] = useState(false);

  // Initialize the client
  useEffect(() => {
    client.init().then(() => setInitialized(true));
  }, []);

  if (!initialized) return <Loading loading={!initialized} />;

  // check if keycloak is configured
  if (keycloakEnabled(keycloakConfig)) {

    // get keycloak config options
    const { auth, initConfig} = keycloakConfig;

    // instantiate keycloak
    const keycloak: Keycloak.KeycloakInstance = new (Keycloak as any)(auth);

    // return container with keycloak provider
    return (
      <AppContext.Provider value={{ keycloakEnabled: true }}>
        <KeycloakProvider keycloak={keycloak} initConfig={initConfig} onTokens={onKeycloakTokens}>
          <ApolloOfflineProvider client={client}>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </ApolloOfflineProvider>
        </KeycloakProvider>
      </AppContext.Provider>
    );
  }

  // if keycloak is not configured
  // return container without keycloak provider
  return (
    <AppContext.Provider value={{ keycloakEnabled: false }}>
      <ApolloOfflineProvider client={client}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ApolloOfflineProvider>
    </AppContext.Provider>
  );

};
