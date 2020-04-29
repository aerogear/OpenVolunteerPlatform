import React from 'react';
import { KeycloakInstance, KeycloakProfile } from 'keycloak-js';
export interface IAuthContext {
    keycloak?: KeycloakInstance | undefined
    profile?: KeycloakProfile | undefined
}

export const AuthContext = React.createContext<IAuthContext>({});