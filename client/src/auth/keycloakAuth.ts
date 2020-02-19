import Keycloak, { KeycloakInstance, KeycloakInitOptions } from 'keycloak-js';
import { keycloakHelpers } from '../helpers';

export const keycloak: KeycloakInstance<'native'> | undefined = new (Keycloak as any )();

export const keycloakInstance = async () => {
  await init(keycloak);
  return keycloak;
} 

// initiate keycloak instance
export const init = async (keycloak : any) => {
  try {
    const config: KeycloakInitOptions = keycloakHelpers.getInitConfig();
    await keycloak.init(config);
    keycloakHelpers.setLocalTokens(keycloak);
  } catch(error) {
    keycloak = undefined;
    console.log(error);
  }
}

// load user profile
export const loadUserProfile = async (keycloak: any) => {
  try {
    await keycloak.loadUserProfile();
  } catch(error) {
    console.log(error);
  }
}
