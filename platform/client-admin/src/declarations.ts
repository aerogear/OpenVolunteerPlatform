import { KeycloakInstance } from "keycloak-js";


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