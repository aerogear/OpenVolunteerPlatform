import React, { useState, useEffect } from 'react';
import { clientConfig } from './config';
import { Loading } from './components/Loading';
import { IContainerProps } from './declarations';
import { getKeycloakInstance } from './keycloakAuth';
import { AuthContextProvider } from './context/AuthContext';
import { ApolloClient, ApolloProvider } from '@apollo/client'

let keycloak: any;
const apolloClient = new ApolloClient(clientConfig);

export const AppContainer: React.FC<IContainerProps> = ({ app: App }) => {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  // Initialize the client
  useEffect(() => {
    const init = async () => {
      keycloak = await getKeycloakInstance();
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
    <AuthContextProvider value={{ keycloak, profile: keycloak.profile }}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </AuthContextProvider>
  );
};
