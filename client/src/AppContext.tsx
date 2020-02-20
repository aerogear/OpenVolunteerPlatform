import React from 'react';
import { IAppContext } from './declarations';

export const AppContext = React.createContext<IAppContext>({ keycloak: undefined });