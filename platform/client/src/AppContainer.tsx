import React, { useState, useEffect } from 'react';
import { ApolloOfflineClient } from 'offix-client';
import { ApolloOfflineProvider } from 'react-offix-hooks';
import { ApolloProvider } from '@apollo/react-hooks';
import { clientConfig } from './config';
import { Loading } from './components/Loading';
import { IContainerProps } from './declarations';
import { getKeycloakInstance } from './keycloakAuth';
import { AuthContextContextProvider } from './context/AuthContext';

let keycloak: any;
const apolloClient = new ApolloOfflineClient(clientConfig);

export const AppContainer: React.FC<IContainerProps> = ({ app: App }) => {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  // Initialize the client
  useEffect(() => {
    const init = async () => {
      keycloak = await getKeycloakInstance();
      await apolloClient.init();
      if (keycloak) {
        await keycloak?.loadUserProfile();
      }
      setKeycloakInitialized(true);
    }
    init();
  }, []);

  if (!keycloakInitialized || !keycloak.profile) return <Loading loading={true} />;

  // return container with keycloak provider
  return (
    <AuthContextContextProvider value={{ keycloak, profile: keycloak.profile }}>
      <ApolloOfflineProvider client={apolloClient}>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </ApolloOfflineProvider>
    </AuthContextContextProvider>
  );
};
