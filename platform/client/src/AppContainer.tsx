import React, { useState, useEffect } from 'react';
import { clientConfig } from './config';
import { Loading } from './components/Loading';
import { IContainerProps } from './declarations';
import { getKeycloakInstance } from './keycloakAuth';
import { AuthContextProvider } from './context/AuthContext';
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { datastore } from './datastore/config';
import { useNetworkStatus } from './hooks/useNetworkStatus';

let keycloak: any;
const apolloClient = new ApolloClient(clientConfig);

export const AppContainer: React.FC<IContainerProps> = ({ app: App }) => {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const isOnline = useNetworkStatus();

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
  
  useEffect(() => {
    if (isOnline) {
      console.log("Start replication");
      datastore.startReplication();
    } else {
      console.log("Stop replication");
      datastore.stopReplication();
    }
  }, [isOnline])

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
