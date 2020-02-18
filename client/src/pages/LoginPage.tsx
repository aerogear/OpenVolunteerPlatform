import React, { useCallback, useContext } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../services/AppContext';

export const LoginPage: React.FC = () => {

  const [ keycloak ] = useKeycloak();
  const { keycloakEnabled } = useContext(AppContext);

  const login = useCallback(() => {
    keycloak.login()
  }, [keycloak]);

  if (!keycloakEnabled || keycloak.authenticated) return <Redirect to='/tasks' />;

  return (
    <div>
      <button type="button" onClick={login}>
        Login
      </button>
    </div>
  );

};
