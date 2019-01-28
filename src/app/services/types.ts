
export interface Task {
    id: string;
    version: number;
    title: string;
    description: string;
}

export interface AllTasks {
    allTasks: Task[];
    task: Task;
    tasks: TaskSubscription;
}

interface TaskSubscription {
  mutation: MutationType;
  task: Task;
}

export enum MutationType {
    CREATED = 'CREATED',
    MUTATED = 'MUTATED',
    DELETED = 'DELETED'
}

