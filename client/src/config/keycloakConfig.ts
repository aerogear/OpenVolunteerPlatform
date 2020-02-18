const token = localStorage.getItem('token');
const refreshToken =localStorage.getItem('refreshToken');

export const keycloakConfig : { initConfig: Keycloak.KeycloakInitOptions, auth?: Keycloak.KeycloakConfig } = {
  initConfig: {
    onLoad: 'check-sso',
    token: (token) ? token : undefined,
    refreshToken: (refreshToken) ? refreshToken : undefined,
  },
  // auth: {
  //   url: <keycloak-url>,
  //   realm: <realm-name>,
  //   clientId: <client-id>
  // },
};
