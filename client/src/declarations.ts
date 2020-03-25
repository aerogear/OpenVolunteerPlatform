import { KeycloakInstance } from "keycloak-js";
import { ApolloOfflineClient } from "offix-client";

export interface ITask {
  id: string;
  version: number;
  title: string;
  description: string;
  status: TaskStatus;
  __typename?: string;
};

export enum TaskStatus {
  OPEN = 'OPEN',
  ASSIGNED = 'ASSIGNED',
  COMPLETE = 'COMPLETE'
};

export interface AllTasks {
  allTasks: ITask[];
  task: ITask;
  taskAdded: ITask;
  taskDeleted: ITask;
  taskUpdated: ITask;
};

export enum MutationType {
  CREATED = 'CREATED',
  MUTATED = 'MUTATED',
  DELETED = 'DELETED',
};

export interface IOfflineStore {
  offlineStore: [ITask]
}

export interface ITaskListProps {
  tasks: [ITask]
}

export interface IOfflineListProps {
  offlineStore: Array<ITask>
};

export interface ITaskProps {
  task: ITask,
  updateTask: Function,
  deleteTask: Function
};

export interface IContainerProps {
  app: React.FC
};

export interface ILoadingProps {
  loading: boolean
};

export interface IUpdateMatchParams {
  id: string
}

export interface IAppContext {
  keycloak: KeycloakInstance | undefined
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