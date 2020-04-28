import React from 'react';
import { KeycloakInstance, KeycloakProfile } from 'keycloak-js';
import { VolunteerFieldsFragment } from '../dataFacade';

export interface IAuthContext {
    keycloak?: KeycloakInstance | undefined
    profile?: KeycloakProfile | undefined
    volunteer?: VolunteerFieldsFragment | undefined
}

export const AuthContext = React.createContext<IAuthContext>({});