import { KeycloakInstance } from "keycloak-js";
import { ApolloOfflineClient } from "offix-client";



export interface IContainerProps {
  app: React.FC
};

export interface ILoadingProps {
  loading: boolean
};

export interface IUpdateMatchParams {
  id: string
}

export interface IAuthHeaders {
  headers: {
    Authorization: String
  }
}

export interface ILogoutParams {
  keycloak: Keycloak.KeycloakInstance | undefined,
  client: ApolloOfflineClient
}