import { ApolloClient, InMemoryCache } from "@apollo/client";

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
  client: ApolloClient<object>
}