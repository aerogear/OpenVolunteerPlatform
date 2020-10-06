export interface VolunteerAction {
    _id: string;
    title: string;
    description?: string;
    status?: any;
    assignedAt?: any;
    completedAt?: any;
    _createdAt?: any;
    _version: number;
}

export type VolunteerActionCreate = Omit<VolunteerAction, "_id">;
export type VolunteerActionChange =  Pick<VolunteerAction, "_id"> & Partial<VolunteerActionCreate>;
