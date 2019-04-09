
export interface Task {
    id: string;
    version: number;
    title: string;
    description: string;
    status: TaskStatus;
}

export interface AllTasks {
    allTasks: Task[];
    task: Task;
    tasks: TaskSubscription;
}

interface TaskSubscription {
  action: MutationType;
  task: Task;
}

export enum MutationType {
    CREATED = 'CREATED',
    MUTATED = 'MUTATED',
    DELETED = 'DELETED'
}

export enum TaskStatus {
    OPEN = 'OPEN',
    ASSIGNED = 'ASSIGNED',
    COMPLETE = 'COMPLETE'
}

