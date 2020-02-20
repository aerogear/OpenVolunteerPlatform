import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { ILogoutParams } from '../declarations';

export let keycloak: KeycloakInstance<'native'> | undefined;

export const getKeycloakInstance = async () => {
  await init();
  return keycloak;
} 

// initiate keycloak instance
export const init = async () => {
  try {
    keycloak = new (Keycloak as any )();
    if (keycloak) {
      await keycloak.init({
        promiseType: 'native',
        onLoad: 'login-required',
      });
    }
  } catch {
    keycloak = undefined;
    console.error('Keycloak error: Unable to initialize keycloak');
  }
}


// This function keeps getting called by wslink
// connection param function, so carry out 
// an early return if keycloak is not initialized
// otherwise get the auth token
export const getAuthHeader = async () => {
  if (!keycloak) return '';
  return {
    'authorization': `Bearer ${getKeyCloakToken()}`
  };
};


const getKeyCloakToken = async () => {
  await keycloak?.updateToken(50);
  if (keycloak?.token) return keycloak.token;
  console.error('No keycloak token available');
  return '';
}

// logout of keycloak, clear cache and offline store then redirect to
// keycloak login page
export const logout = async ({ keycloak, client: apolloClient } : ILogoutParams) => {
  if(keycloak) {
    await keycloak.logout();
    // clear offix client offline store
    await apolloClient.resetStore();
    // clear offix client cache
    await apolloClient.cache.reset();
    // redirect to login page
    keycloak.login();
  }
}
