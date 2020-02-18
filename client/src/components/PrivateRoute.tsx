import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { AppContext } from '../services/AppContext';
import { Loading } from './Loading';

// @ts-ignore
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [keycloak, initialized] = useKeycloak();
  const { keycloakEnabled } = useContext(AppContext);

  if (keycloakEnabled && !initialized) return <Loading loading={!initialized} />;

  if (keycloakEnabled && !keycloak.authenticated) return <Redirect to='/login' />;

  return (
    <Route
      {...rest}
      component={Component}
    />
  );
};
