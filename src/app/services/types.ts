
export interface Task {
    id: string;
    version: number;
    title: string;
    description: string;
}

export interface AllTasks {
    allTasks: Task[];
}
