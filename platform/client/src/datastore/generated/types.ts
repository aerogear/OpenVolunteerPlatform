export interface DistributionCentre {
  _id: string;
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  postcode?: number;
  lat?: number;
  long?: number;
  _version: string;
  _lastUpdatedAt: number
}

export type DistributionCentreCreate = Omit<DistributionCentre, "_id">;
export type DistributionCentreChange =  Pick<DistributionCentre, "_id"> & Partial<DistributionCentreCreate>;
export interface Volunteer {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username: string;
  address1?: string;
  address2?: string;
  city?: string;
  postcode?: number;
  dateOfBirth?: any;
  canDeliver?: boolean;
  actionsCompleted?: number;
  actionsActive?: number;
  active?: boolean;
  _version: string;
  _lastUpdatedAt: number
}

export type VolunteerCreate = Omit<Volunteer, "_id">;
export type VolunteerChange =  Pick<Volunteer, "_id"> & Partial<VolunteerCreate>;
export interface Recipient {
  _id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  postcode?: number;
  city?: string;
  lat?: number;
  long?: number;
  actionsCompleted?: number;
  deliveryDays?: string;
  prefferedProducts?: string;
  _version: string;
  _lastUpdatedAt: number
}

export type RecipientCreate = Omit<Recipient, "_id">;
export type RecipientChange =  Pick<Recipient, "_id"> & Partial<RecipientCreate>;
export interface VolunteerAction {
  _id: string;
  title: string;
  description?: string;
  status?: any;
  assignedAt?: any;
  completedAt?: any;
  _createdAt?: any;
  distributionCentreId?: string;
  volunteerId?: string;
  recipientId?: string;
  _version: string;
  _lastUpdatedAt: number
}

export type VolunteerActionCreate = Omit<VolunteerAction, "_id">;
export type VolunteerActionChange =  Pick<VolunteerAction, "_id"> & Partial<VolunteerActionCreate>;
export interface VolunteerActionProduct {
  _id: string;
  volunteerActionId?: string;
  productId?: string;
  _version: string;
  _lastUpdatedAt: number
}

export type VolunteerActionProductCreate = Omit<VolunteerActionProduct, "_id">;
export type VolunteerActionProductChange =  Pick<VolunteerActionProduct, "_id"> & Partial<VolunteerActionProductCreate>;
export interface Product {
  _id: string;
  label: string;
  description?: string;
  distributionCentreId?: string;
  _version: string;
  _lastUpdatedAt: number
}

export type ProductCreate = Omit<Product, "_id">;
export type ProductChange =  Pick<Product, "_id"> & Partial<ProductCreate>;
export interface DailyActionPlan {
  _id: string;
  owner?: string;
  date?: any;
  numberOfCasesCreated?: number;
  numberOfVolunteersAssigned?: number;
  numberOfRecipients?: number;
  _version: string;
  _lastUpdatedAt: number
}

export type DailyActionPlanCreate = Omit<DailyActionPlan, "_id">;
export type DailyActionPlanChange =  Pick<DailyActionPlan, "_id"> & Partial<DailyActionPlanCreate>;
export interface VolunteerEntry {
  _id: string;
  volunteer?: string;
  distributionCentre?: string;
  volunteerActions?: any[];
  checkedInAt?: any;
  checkedOutAt?: any;
  _version: string;
  _lastUpdatedAt: number
}

export type VolunteerEntryCreate = Omit<VolunteerEntry, "_id">;
export type VolunteerEntryChange =  Pick<VolunteerEntry, "_id"> & Partial<VolunteerEntryCreate>;