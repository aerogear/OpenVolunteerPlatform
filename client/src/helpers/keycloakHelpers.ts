// check if keycloak has been configured
export const keycloakEnabled = (config: any) => {
  if (!config.auth) return false;
  return (Object.keys(config.auth).length > 0);
};

// save tokens to localstorage
export const onKeycloakTokens = ({ token, refreshToken } : { token: string, refreshToken: string}) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};

// helper method to flush invalid tokens on app startup
// as undefined tokens cause app to crash
export const flushInvalidTokens = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  if (token === undefined || refreshToken === undefined) localStorage.clear();
}

// logout of keycloak, clear localstorage and then redirect to
// keycloak login page
export const logout = async ({ keycloak } : { keycloak: Keycloak.KeycloakInstance<'native'> }) => {
  await keycloak.logout();
  localStorage.clear();
  keycloak.login();
}