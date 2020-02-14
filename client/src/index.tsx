import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { IonLoading } from '@ionic/react';
import { ApolloOfflineClient } from 'offix-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloOfflineProvider } from 'react-offix-hooks';
import App from './App';
import { clientConfig } from './clientConfig';
import * as serviceWorker from './serviceWorker';

const client = new ApolloOfflineClient(clientConfig);

const Main = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    client.init().then(() => setInitialized(true));
  }, []);

  // If client is still initializing,
  // display loading screen
  if (!initialized) return <IonLoading
    isOpen={!initialized}
    message={'Loading...'}
  />;

  return (
    <ApolloOfflineProvider client={client}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ApolloOfflineProvider>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
