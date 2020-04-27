import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { ILogoutParams } from './declarations';

export let keycloak: KeycloakInstance | undefined;

/**
 * Get keycloak instance
 * 
 * @return an initiated keycloak instance or `undefined`
 * if keycloak isn't configured
 * 
 */
export const getKeycloakInstance = async () => {
  if (!keycloak) await init();
  return keycloak;
} 

/**
 * Initiate keycloak instance.
 * 
 * Set keycloak to undefined if 
 * keycloak isn't configured
 * 
 */
export const init = async () => {
  try {
    keycloak = new (Keycloak as any )();
    if (keycloak) {
      await keycloak.init({
        onLoad: 'login-required'
      });
    }
  } catch {
    keycloak = undefined;
    console.warn('Auth: Unable to initialize keycloak. Client side will not be configured to use authentication');
  }
}


/**
 * This function keeps getting called by wslink
 * connection param function, so carry out 
 * an early return if keycloak is not initialized
 * otherwise get the auth token
 * 
 * @return authorization header or empty string
 * 
 */
export const getAuthHeader = async () => {
  if (!keycloak) return '';
  return {
    'authorization': `Bearer ${await getKeyCloakToken()}`
  };
};


/**
 * Use keycloak update token function to retrieve
 * keycloak token
 * 
 * @return keycloak token or empty string if keycloak
 * isn't configured
 * 
 */
const getKeyCloakToken = async () => {
  await keycloak?.updateToken(50);
  if (keycloak?.token) return keycloak.token;
  console.error('No keycloak token available');
  return '';
}

/**
 * logout of keycloak, clear cache and offline store then redirect to 
 * keycloak login page
 * 
 * @param keycloak the keycloak instance
 * @param client offix client
 *  
 */
export const logout = async ({ keycloak, client: apolloClient } : ILogoutParams) => {
  if(keycloak) {
    await keycloak.logout();
    // clear offix client offline store
    await apolloClient.resetStore();
    // clear offix client cache
    await apolloClient.cache.reset();
  }
}
