const token = localStorage.getItem('token');
const refreshToken =localStorage.getItem('refreshToken');

export const keycloakConfig : { initConfig: Keycloak.KeycloakInitOptions, auth?: Keycloak.KeycloakConfig } = {
  initConfig: {
    onLoad: 'check-sso',
    token: (token) ? token : undefined,
    refreshToken: (refreshToken) ? refreshToken : undefined,
  },
  auth: {
    url: "http://localhost:8080/auth",
    realm: "voyager-testing",
    clientId: "voyager-testing-public"
  },
};
