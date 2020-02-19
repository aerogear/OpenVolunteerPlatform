import Keycloak, { KeycloakInstance, KeycloakInitOptions } from 'keycloak-js';
import { setLocalTokens, getInitConfig, flushInvalidTokens } from './keycloakHelpers';

export let keycloak: KeycloakInstance<'native'> | undefined;

export const getKeycloakInstance = async () => {
  flushInvalidTokens();
  await init();
  return keycloak;
} 

// initiate keycloak instance
export const init = async () => {
  try {
    const config: KeycloakInitOptions = getInitConfig();
    keycloak = new (Keycloak as any )();
    if (keycloak) {
      await keycloak.init(config);
      setLocalTokens({
        token: keycloak.token,
        refreshToken: keycloak.refreshToken
      });
    }
  } catch {
    keycloak = undefined;
    console.error('Keycloak error: Unable to initialize keycloak');
  }
}
