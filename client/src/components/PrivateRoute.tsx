import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { AppContext } from '../AppContext';
import { Loading } from './Loading';
import { useNetworkStatus } from 'react-offix-hooks';

export const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const isOnline = useNetworkStatus();
  const [keycloak, initialized] = useKeycloak();
  const { keycloakEnabled } = useContext(AppContext);

  if (keycloakEnabled && !initialized) return <Loading loading={!initialized} />;

  if (keycloakEnabled && !keycloak.authenticated && isOnline) keycloak.login();

  return (
    <Route
      {...rest}
      component={Component}
    />
  );
};
