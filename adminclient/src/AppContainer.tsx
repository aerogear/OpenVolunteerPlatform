import React, { useState, useEffect } from 'react';
import { ApolloOfflineClient } from 'offix-client';
import { ApolloOfflineProvider } from 'react-offix-hooks';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppContext } from './AppContext';
import { clientConfig } from './config';
import { Loading } from './components/Loading';
import { IContainerProps } from './declarations';
import { getKeycloakInstance } from './auth/keycloakAuth';

let keycloak: any;
const apolloClient = new ApolloOfflineClient(clientConfig);

export const AppContainer: React.FC<IContainerProps> = ({ app: App }) => {

  const [initialized, setInitialized] = useState(false);

  // Initialize the client
  useEffect(() => {
    const init = async () => {
      keycloak = await getKeycloakInstance();
      await apolloClient.init();

      setInitialized(true);
    }
    init();
  }, []);

  if (!initialized) return <Loading loading={!initialized} />;

  // return container with keycloak provider
  return (
    <AppContext.Provider value={{ keycloak }}>
      <ApolloOfflineProvider client={apolloClient}>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </ApolloOfflineProvider>
    </AppContext.Provider>
  );


};
