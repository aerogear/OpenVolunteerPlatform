export interface ITask {
  id: string;
  version: number;
  title: string;
  description: string;
  status: TaskStatus;
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