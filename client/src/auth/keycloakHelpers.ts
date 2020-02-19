import { KeycloakInitOptions } from "keycloak-js";

// get tokens from localstorage
export const getLocalTokens = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  return [token, refreshToken];
};

// save tokens to localstorage
export const setLocalTokens = ({ token, refreshToken } : { token: string | undefined, refreshToken: string | undefined}) => {
  if (token) localStorage.setItem('token', token);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};

export const getInitConfig = () : KeycloakInitOptions => {
  const [token, refreshToken] = getLocalTokens();
  if(token && refreshToken) return {
    token,
    refreshToken,
    'promiseType': 'native',
    'onLoad': 'login-required',
  };
  return {
    'promiseType': 'native',
    'onLoad': 'login-required',
  }
}

// retrieve token and get authorization header
export const getAuthHeader = () => {
  const [ token ] = getLocalTokens();
  return token ? `Bearer ${token}` : '';
}

// helper method to flush invalid tokens on app startup
// as undefined tokens cause app to crash
export const flushInvalidTokens = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  if (token === undefined || refreshToken === undefined) localStorage.clear();
}

// logout of keycloak, clear localstorage and then redirect to
// keycloak login page
export const logout = async ({ keycloak } : { keycloak: Keycloak.KeycloakInstance<'native'> | undefined }) => {
  if(keycloak) {
    await keycloak.logout();
    localStorage.clear();
    keycloak.login();
  }
}