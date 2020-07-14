import React, { useState, useEffect } from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { clientConfig } from './config';
import { Loading } from './components/generic/Loading';
import { IContainerProps } from './declarations';
import { getKeycloakInstance } from './keycloakAuth';
import { AuthContext } from './context/AuthContext';

let keycloak: any;
const apolloClient = new ApolloClient(clientConfig);

export const AppContainer: React.FC<IContainerProps> = ({ app: App }) => {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  // Initialize the client
  useEffect(() => {
    const init = async () => {
      keycloak = await getKeycloakInstance();
      if (keycloak) {
        await keycloak.loadUserProfile();
      }
      setKeycloakInitialized(true);
    }
    init();
  }, []);

  if (!keycloakInitialized || !keycloak.profile) return <Loading loading={true} />;

  // return container with keycloak provider
  return (
    <AuthContext.Provider value={{ keycloak, profile: keycloak.profile }}>
        <ApolloProvider client={apolloClient as any}>
          <App />
        </ApolloProvider>
    </AuthContext.Provider>
  );
};
