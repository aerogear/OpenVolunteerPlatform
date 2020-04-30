import React, { useState } from 'react';
import { KeycloakInstance, KeycloakProfile } from 'keycloak-js';
import { VolunteerFieldsFragment } from '../dataFacade';

type VolunteerType = VolunteerFieldsFragment | undefined;

export interface IAuthContext {
    keycloak?: KeycloakInstance | undefined
    profile?: KeycloakProfile | undefined
    volunteer?: VolunteerType,
    setVolunteer: (volunteer: VolunteerType) => void
}

export const AuthContext = React.createContext<IAuthContext>({
    setVolunteer: () => {}
});

export const AuthContextProvider = (props: any) => {
    const setVolunteer = (volunteer: VolunteerType) => {
      setState({...state, volunteer: volunteer})
    }
  
    const authContextInitialState: IAuthContext = {
        setVolunteer: setVolunteer,
        volunteer: undefined,
        ...props.value
    } 
  
    const [state, setState] = useState(authContextInitialState)
  
    return (
      <AuthContext.Provider value={state}>
        {props.children}
      </AuthContext.Provider>
    )
  }