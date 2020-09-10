/* tslint:disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  GraphbackDateTime: Date;
  GraphbackObjectID: string;
};

export enum ActionStatus {
  Created = 'CREATED',
  Assigned = 'ASSIGNED',
  Completed = 'COMPLETED'
}

export type Address = {
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
};

export type BooleanInput = {
  ne?: Maybe<Scalars['Boolean']>;
  eq?: Maybe<Scalars['Boolean']>;
};

export type CreateDailyActionPlanInput = {
  _id?: Maybe<Scalars['GraphbackObjectID']>;
  owner?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['GraphbackDateTime']>;
  numberOfCasesCreated?: Maybe<Scalars['Int']>;
  numberOfVolunteersAssigned?: Maybe<Scalars['Int']>;
  numberOfRecipients?: Maybe<Scalars['Int']>;
};

export type CreateDistributionCentreInput = {
  _id?: Maybe<Scalars['GraphbackObjectID']>;
  name?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
};

export type CreateProductInput = {
  _id?: Maybe<Scalars['GraphbackObjectID']>;
  label: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  distributionCentreId?: Maybe<Scalars['GraphbackObjectID']>;
};

export type CreateRecipientInput = {
  _id?: Maybe<Scalars['GraphbackObjectID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
  actionsCompleted?: Maybe<Scalars['Int']>;
  deliveryDays?: Maybe<Scalars['String']>;
  prefferedProducts?: Maybe<Scalars['String']>;
};

export type CreateVolunteerActionInput = {
  _id?: Maybe<Scalars['GraphbackObjectID']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status?: Maybe<ActionStatus>;
  assignedAt?: Maybe<Scalars['GraphbackDateTime']>;
  completedAt?: Maybe<Scalars['GraphbackDateTime']>;
  _createdAt?: Maybe<Scalars['GraphbackDateTime']>;
  volunteerId?: Maybe<Scalars['GraphbackObjectID']>;
  recipientId?: Maybe<Scalars['GraphbackObjectID']>;
  distributionCentreId?: Maybe<Scalars['GraphbackObjectID']>;
};

export type CreateVolunteerActionProductInput = {
  _id?: Maybe<Scalars['GraphbackObjectID']>;
  volunteerActionId?: Maybe<Scalars['GraphbackObjectID']>;
  productId?: Maybe<Scalars['GraphbackObjectID']>;
};

export type CreateVolunteerInput = {
  _id?: Maybe<Scalars['GraphbackObjectID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  dateOfBirth?: Maybe<Scalars['GraphbackDateTime']>;
  canDeliver?: Maybe<Scalars['Boolean']>;
  actionsCompleted?: Maybe<Scalars['Int']>;
  actionsActive?: Maybe<Scalars['Int']>;
  active?: Maybe<Scalars['Boolean']>;
};

/** @model */
export type DailyActionPlan = {
  __typename?: 'DailyActionPlan';
  _id: Scalars['GraphbackObjectID'];
  owner?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['GraphbackDateTime']>;
  numberOfCasesCreated?: Maybe<Scalars['Int']>;
  numberOfVolunteersAssigned?: Maybe<Scalars['Int']>;
  numberOfRecipients?: Maybe<Scalars['Int']>;
};

export type DailyActionPlanFilter = {
  _id?: Maybe<GraphbackObjectIdInput>;
  owner?: Maybe<StringInput>;
  date?: Maybe<GraphbackDateTimeInput>;
  numberOfCasesCreated?: Maybe<IntInput>;
  numberOfVolunteersAssigned?: Maybe<IntInput>;
  numberOfRecipients?: Maybe<IntInput>;
  and?: Maybe<Array<DailyActionPlanFilter>>;
  or?: Maybe<Array<DailyActionPlanFilter>>;
  not?: Maybe<DailyActionPlanFilter>;
};

export type DailyActionPlanResultList = {
  __typename?: 'DailyActionPlanResultList';
  items: Array<Maybe<DailyActionPlan>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

/** @model(delete: false) */
export type DistributionCentre = Address & {
  __typename?: 'DistributionCentre';
  _id: Scalars['GraphbackObjectID'];
  name?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
  /**
   * @oneToMany(field: 'distributionCentre', key: 'distributionCentreId')
   * @oneToMany(field: "distributionCentre")
   */
  products?: Maybe<Array<Maybe<Product>>>;
  /**
   * @oneToMany(field: 'distributionCentre', key: 'distributionCentreId')
   * @oneToMany(field: "distributionCentre")
   */
  actions?: Maybe<Array<Maybe<VolunteerAction>>>;
};


/** @model(delete: false) */
export type DistributionCentreProductsArgs = {
  filter?: Maybe<ProductFilter>;
};


/** @model(delete: false) */
export type DistributionCentreActionsArgs = {
  filter?: Maybe<VolunteerActionFilter>;
};

export type DistributionCentreFilter = {
  _id?: Maybe<GraphbackObjectIdInput>;
  name?: Maybe<StringInput>;
  address1?: Maybe<StringInput>;
  address2?: Maybe<StringInput>;
  city?: Maybe<StringInput>;
  postcode?: Maybe<IntInput>;
  lat?: Maybe<FloatInput>;
  long?: Maybe<FloatInput>;
  and?: Maybe<Array<DistributionCentreFilter>>;
  or?: Maybe<Array<DistributionCentreFilter>>;
  not?: Maybe<DistributionCentreFilter>;
};

export type DistributionCentreResultList = {
  __typename?: 'DistributionCentreResultList';
  items: Array<Maybe<DistributionCentre>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

export type FloatInput = {
  ne?: Maybe<Scalars['Float']>;
  eq?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Scalars['Float']>>;
  between?: Maybe<Array<Scalars['Float']>>;
};


export type GraphbackDateTimeInput = {
  ne?: Maybe<Scalars['GraphbackDateTime']>;
  eq?: Maybe<Scalars['GraphbackDateTime']>;
  le?: Maybe<Scalars['GraphbackDateTime']>;
  lt?: Maybe<Scalars['GraphbackDateTime']>;
  ge?: Maybe<Scalars['GraphbackDateTime']>;
  gt?: Maybe<Scalars['GraphbackDateTime']>;
  in?: Maybe<Array<Scalars['GraphbackDateTime']>>;
  between?: Maybe<Array<Scalars['GraphbackDateTime']>>;
};


export type GraphbackObjectIdInput = {
  ne?: Maybe<Scalars['GraphbackObjectID']>;
  eq?: Maybe<Scalars['GraphbackObjectID']>;
  le?: Maybe<Scalars['GraphbackObjectID']>;
  lt?: Maybe<Scalars['GraphbackObjectID']>;
  ge?: Maybe<Scalars['GraphbackObjectID']>;
  gt?: Maybe<Scalars['GraphbackObjectID']>;
  in?: Maybe<Array<Scalars['GraphbackObjectID']>>;
  between?: Maybe<Array<Scalars['GraphbackObjectID']>>;
};

export type IntInput = {
  ne?: Maybe<Scalars['Int']>;
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  between?: Maybe<Array<Scalars['Int']>>;
};

export type MutateDailyActionPlanInput = {
  _id: Scalars['GraphbackObjectID'];
  owner?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['GraphbackDateTime']>;
  numberOfCasesCreated?: Maybe<Scalars['Int']>;
  numberOfVolunteersAssigned?: Maybe<Scalars['Int']>;
  numberOfRecipients?: Maybe<Scalars['Int']>;
};

export type MutateDistributionCentreInput = {
  _id: Scalars['GraphbackObjectID'];
  name?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
};

export type MutateProductInput = {
  _id: Scalars['GraphbackObjectID'];
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  distributionCentreId?: Maybe<Scalars['GraphbackObjectID']>;
};

export type MutateRecipientInput = {
  _id: Scalars['GraphbackObjectID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
  actionsCompleted?: Maybe<Scalars['Int']>;
  deliveryDays?: Maybe<Scalars['String']>;
  prefferedProducts?: Maybe<Scalars['String']>;
};

export type MutateVolunteerActionInput = {
  _id: Scalars['GraphbackObjectID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<ActionStatus>;
  assignedAt?: Maybe<Scalars['GraphbackDateTime']>;
  completedAt?: Maybe<Scalars['GraphbackDateTime']>;
  _createdAt?: Maybe<Scalars['GraphbackDateTime']>;
  volunteerId?: Maybe<Scalars['GraphbackObjectID']>;
  recipientId?: Maybe<Scalars['GraphbackObjectID']>;
  distributionCentreId?: Maybe<Scalars['GraphbackObjectID']>;
};

export type MutateVolunteerInput = {
  _id: Scalars['GraphbackObjectID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  dateOfBirth?: Maybe<Scalars['GraphbackDateTime']>;
  canDeliver?: Maybe<Scalars['Boolean']>;
  actionsCompleted?: Maybe<Scalars['Int']>;
  actionsActive?: Maybe<Scalars['Int']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Automatically create actions for the day of the month specified */
  assignVolunteers?: Maybe<DailyActionPlan>;
  createDistributionCentre?: Maybe<DistributionCentre>;
  updateDistributionCentre?: Maybe<DistributionCentre>;
  createVolunteer?: Maybe<Volunteer>;
  updateVolunteer?: Maybe<Volunteer>;
  createRecipient?: Maybe<Recipient>;
  updateRecipient?: Maybe<Recipient>;
  createVolunteerAction?: Maybe<VolunteerAction>;
  updateVolunteerAction?: Maybe<VolunteerAction>;
  createVolunteerActionProduct?: Maybe<VolunteerActionProduct>;
  createProduct?: Maybe<Product>;
  updateProduct?: Maybe<Product>;
  createDailyActionPlan?: Maybe<DailyActionPlan>;
  updateDailyActionPlan?: Maybe<DailyActionPlan>;
};


export type MutationCreateDistributionCentreArgs = {
  input: CreateDistributionCentreInput;
};


export type MutationUpdateDistributionCentreArgs = {
  input: MutateDistributionCentreInput;
};


export type MutationCreateVolunteerArgs = {
  input: CreateVolunteerInput;
};


export type MutationUpdateVolunteerArgs = {
  input: MutateVolunteerInput;
};


export type MutationCreateRecipientArgs = {
  input: CreateRecipientInput;
};


export type MutationUpdateRecipientArgs = {
  input: MutateRecipientInput;
};


export type MutationCreateVolunteerActionArgs = {
  input: CreateVolunteerActionInput;
};


export type MutationUpdateVolunteerActionArgs = {
  input: MutateVolunteerActionInput;
};


export type MutationCreateVolunteerActionProductArgs = {
  input: CreateVolunteerActionProductInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationUpdateProductArgs = {
  input: MutateProductInput;
};


export type MutationCreateDailyActionPlanArgs = {
  input: CreateDailyActionPlanInput;
};


export type MutationUpdateDailyActionPlanArgs = {
  input: MutateDailyActionPlanInput;
};

export type OrderByInput = {
  field: Scalars['String'];
  order?: Maybe<SortDirectionEnum>;
};

export type PageRequest = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

/** @model(delete: false) */
export type Product = {
  __typename?: 'Product';
  _id: Scalars['GraphbackObjectID'];
  label: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  /**
   * @oneToMany(field: 'product', key: 'productId')
   * @oneToMany(field: 'product')
   */
  volunteerActionProducts?: Maybe<Array<Maybe<VolunteerActionProduct>>>;
  /** @manyToOne(field: 'products', key: 'distributionCentreId') */
  distributionCentre?: Maybe<DistributionCentre>;
};


/** @model(delete: false) */
export type ProductVolunteerActionProductsArgs = {
  filter?: Maybe<VolunteerActionProductFilter>;
};

export type ProductFilter = {
  _id?: Maybe<GraphbackObjectIdInput>;
  label?: Maybe<StringInput>;
  description?: Maybe<StringInput>;
  distributionCentreId?: Maybe<GraphbackObjectIdInput>;
  and?: Maybe<Array<ProductFilter>>;
  or?: Maybe<Array<ProductFilter>>;
  not?: Maybe<ProductFilter>;
};

export type ProductResultList = {
  __typename?: 'ProductResultList';
  items: Array<Maybe<Product>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getDistributionCentre?: Maybe<DistributionCentre>;
  findDistributionCentres: DistributionCentreResultList;
  getVolunteer?: Maybe<Volunteer>;
  findVolunteers: VolunteerResultList;
  getRecipient?: Maybe<Recipient>;
  findRecipients: RecipientResultList;
  getVolunteerAction?: Maybe<VolunteerAction>;
  findVolunteerActions: VolunteerActionResultList;
  getVolunteerActionProduct?: Maybe<VolunteerActionProduct>;
  findVolunteerActionProducts: VolunteerActionProductResultList;
  getProduct?: Maybe<Product>;
  findProducts: ProductResultList;
  getDailyActionPlan?: Maybe<DailyActionPlan>;
  findDailyActionPlans: DailyActionPlanResultList;
};


export type QueryGetDistributionCentreArgs = {
  id: Scalars['GraphbackObjectID'];
};


export type QueryFindDistributionCentresArgs = {
  filter?: Maybe<DistributionCentreFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetVolunteerArgs = {
  id: Scalars['GraphbackObjectID'];
};


export type QueryFindVolunteersArgs = {
  filter?: Maybe<VolunteerFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetRecipientArgs = {
  id: Scalars['GraphbackObjectID'];
};


export type QueryFindRecipientsArgs = {
  filter?: Maybe<RecipientFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetVolunteerActionArgs = {
  id: Scalars['GraphbackObjectID'];
};


export type QueryFindVolunteerActionsArgs = {
  filter?: Maybe<VolunteerActionFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetVolunteerActionProductArgs = {
  id: Scalars['GraphbackObjectID'];
};


export type QueryFindVolunteerActionProductsArgs = {
  filter?: Maybe<VolunteerActionProductFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetProductArgs = {
  id: Scalars['GraphbackObjectID'];
};


export type QueryFindProductsArgs = {
  filter?: Maybe<ProductFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetDailyActionPlanArgs = {
  id: Scalars['GraphbackObjectID'];
};


export type QueryFindDailyActionPlansArgs = {
  filter?: Maybe<DailyActionPlanFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};

/** @model(delete: false) */
export type Recipient = Address & {
  __typename?: 'Recipient';
  _id: Scalars['GraphbackObjectID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
  actionsCompleted?: Maybe<Scalars['Int']>;
  deliveryDays?: Maybe<Scalars['String']>;
  /**
   * Comma separated list of preferrend products labels.
   * Easier to create volunteer actions when knowing what one really needs.
   */
  prefferedProducts?: Maybe<Scalars['String']>;
  /**
   * @oneToMany(field: 'recipient', key: 'recipientId')
   * @oneToMany(field: 'recipient')
   */
  actions?: Maybe<Array<Maybe<VolunteerAction>>>;
};


/** @model(delete: false) */
export type RecipientActionsArgs = {
  filter?: Maybe<VolunteerActionFilter>;
};

export type RecipientFilter = {
  _id?: Maybe<GraphbackObjectIdInput>;
  firstName?: Maybe<StringInput>;
  lastName?: Maybe<StringInput>;
  phone?: Maybe<StringInput>;
  address1?: Maybe<StringInput>;
  address2?: Maybe<StringInput>;
  postcode?: Maybe<IntInput>;
  city?: Maybe<StringInput>;
  lat?: Maybe<FloatInput>;
  long?: Maybe<FloatInput>;
  actionsCompleted?: Maybe<IntInput>;
  deliveryDays?: Maybe<StringInput>;
  prefferedProducts?: Maybe<StringInput>;
  and?: Maybe<Array<RecipientFilter>>;
  or?: Maybe<Array<RecipientFilter>>;
  not?: Maybe<RecipientFilter>;
};

export type RecipientResultList = {
  __typename?: 'RecipientResultList';
  items: Array<Maybe<Recipient>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

export enum SortDirectionEnum {
  Desc = 'DESC',
  Asc = 'ASC'
}

export type StringInput = {
  ne?: Maybe<Scalars['String']>;
  eq?: Maybe<Scalars['String']>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

/** @model(delete: false) */
export type Volunteer = {
  __typename?: 'Volunteer';
  _id: Scalars['GraphbackObjectID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  dateOfBirth?: Maybe<Scalars['GraphbackDateTime']>;
  canDeliver?: Maybe<Scalars['Boolean']>;
  actionsCompleted?: Maybe<Scalars['Int']>;
  actionsActive?: Maybe<Scalars['Int']>;
  active?: Maybe<Scalars['Boolean']>;
  /**
   * @oneToMany(field: 'volunteer', key: 'volunteerId')
   * @oneToMany(field: 'volunteer')
   */
  actions?: Maybe<Array<Maybe<VolunteerAction>>>;
};


/** @model(delete: false) */
export type VolunteerActionsArgs = {
  filter?: Maybe<VolunteerActionFilter>;
};

/**
 * Represents action that is assigned to volunteer
 * 
 * @model
 */
export type VolunteerAction = {
  __typename?: 'VolunteerAction';
  _id: Scalars['GraphbackObjectID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status?: Maybe<ActionStatus>;
  assignedAt?: Maybe<Scalars['GraphbackDateTime']>;
  completedAt?: Maybe<Scalars['GraphbackDateTime']>;
  _createdAt?: Maybe<Scalars['GraphbackDateTime']>;
  /**
   * @manyToOne(field: 'actions', key: 'volunteerId')
   * @manyToOne(field: 'actions')
   */
  volunteer?: Maybe<Volunteer>;
  /**
   * @manyToOne(field: 'actions', key: 'recipientId')
   * @manyToOne(field: 'actions')
   */
  recipient?: Maybe<Recipient>;
  /**
   * @manyToOne(field: 'actions', key: 'distributionCentreId')
   * @manyToOne(field: 'actions')
   */
  distributionCentre?: Maybe<DistributionCentre>;
  /**
   * @oneToMany(field: 'volunteerAction', key: 'volunteerActionId')
   * @oneToMany(field: 'volunteerAction')
   */
  products?: Maybe<Array<Maybe<VolunteerActionProduct>>>;
};


/**
 * Represents action that is assigned to volunteer
 * 
 * @model
 */
export type VolunteerActionProductsArgs = {
  filter?: Maybe<VolunteerActionProductFilter>;
};

export type VolunteerActionFilter = {
  _id?: Maybe<GraphbackObjectIdInput>;
  title?: Maybe<StringInput>;
  description?: Maybe<StringInput>;
  status?: Maybe<StringInput>;
  assignedAt?: Maybe<GraphbackDateTimeInput>;
  completedAt?: Maybe<GraphbackDateTimeInput>;
  _createdAt?: Maybe<GraphbackDateTimeInput>;
  volunteerId?: Maybe<GraphbackObjectIdInput>;
  recipientId?: Maybe<GraphbackObjectIdInput>;
  distributionCentreId?: Maybe<GraphbackObjectIdInput>;
  and?: Maybe<Array<VolunteerActionFilter>>;
  or?: Maybe<Array<VolunteerActionFilter>>;
  not?: Maybe<VolunteerActionFilter>;
};

/**
 * Represents a join model between a volunteer action and product
 * 
 * @model(create: true, update: false, delete: false, subCreate: false, subUpdate: false, subDelete: false)
 */
export type VolunteerActionProduct = {
  __typename?: 'VolunteerActionProduct';
  _id: Scalars['GraphbackObjectID'];
  /** @manyToOne(field: 'products', key: 'volunteerActionId') */
  volunteerAction?: Maybe<VolunteerAction>;
  /** @manyToOne(field: 'volunteerActionProducts', key: 'productId') */
  product?: Maybe<Product>;
};

export type VolunteerActionProductFilter = {
  _id?: Maybe<GraphbackObjectIdInput>;
  volunteerActionId?: Maybe<GraphbackObjectIdInput>;
  productId?: Maybe<GraphbackObjectIdInput>;
  and?: Maybe<Array<VolunteerActionProductFilter>>;
  or?: Maybe<Array<VolunteerActionProductFilter>>;
  not?: Maybe<VolunteerActionProductFilter>;
};

export type VolunteerActionProductResultList = {
  __typename?: 'VolunteerActionProductResultList';
  items: Array<Maybe<VolunteerActionProduct>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

export type VolunteerActionResultList = {
  __typename?: 'VolunteerActionResultList';
  items: Array<Maybe<VolunteerAction>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

export type VolunteerFilter = {
  _id?: Maybe<GraphbackObjectIdInput>;
  firstName?: Maybe<StringInput>;
  lastName?: Maybe<StringInput>;
  email?: Maybe<StringInput>;
  username?: Maybe<StringInput>;
  address1?: Maybe<StringInput>;
  address2?: Maybe<StringInput>;
  city?: Maybe<StringInput>;
  postcode?: Maybe<IntInput>;
  dateOfBirth?: Maybe<GraphbackDateTimeInput>;
  canDeliver?: Maybe<BooleanInput>;
  actionsCompleted?: Maybe<IntInput>;
  actionsActive?: Maybe<IntInput>;
  active?: Maybe<BooleanInput>;
  and?: Maybe<Array<VolunteerFilter>>;
  or?: Maybe<Array<VolunteerFilter>>;
  not?: Maybe<VolunteerFilter>;
};

export type VolunteerResultList = {
  __typename?: 'VolunteerResultList';
  items: Array<Maybe<Volunteer>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

export type DistributionCentreFieldsFragment = (
  { __typename?: 'DistributionCentre' }
  & Pick<DistributionCentre, '_id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long'>
);

export type DistributionCentreExpandedFieldsFragment = (
  { __typename?: 'DistributionCentre' }
  & Pick<DistributionCentre, '_id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long'>
  & { products?: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'label' | 'description'>
  )>>>, actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, '_id' | 'title' | 'description' | 'status' | 'assignedAt' | 'completedAt' | '_createdAt'>
  )>>> }
);

export type ProductFieldsFragment = (
  { __typename?: 'Product' }
  & Pick<Product, '_id' | 'label' | 'description'>
);

export type ProductExpandedFieldsFragment = (
  { __typename?: 'Product' }
  & Pick<Product, '_id' | 'label' | 'description'>
  & { volunteerActionProducts?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & Pick<VolunteerActionProduct, '_id'>
  )>>>, distributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & Pick<DistributionCentre, '_id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long'>
  )> }
);

export type VolunteerActionProductFieldsFragment = (
  { __typename?: 'VolunteerActionProduct' }
  & Pick<VolunteerActionProduct, '_id'>
);

export type VolunteerActionProductExpandedFieldsFragment = (
  { __typename?: 'VolunteerActionProduct' }
  & Pick<VolunteerActionProduct, '_id'>
  & { volunteerAction?: Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, '_id' | 'title' | 'description' | 'status' | 'assignedAt' | 'completedAt' | '_createdAt'>
  )>, product?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'label' | 'description'>
  )> }
);

export type VolunteerActionFieldsFragment = (
  { __typename?: 'VolunteerAction' }
  & Pick<VolunteerAction, '_id' | 'title' | 'description' | 'status' | 'assignedAt' | 'completedAt' | '_createdAt'>
);

export type VolunteerActionExpandedFieldsFragment = (
  { __typename?: 'VolunteerAction' }
  & Pick<VolunteerAction, '_id' | 'title' | 'description' | 'status' | 'assignedAt' | 'completedAt' | '_createdAt'>
  & { volunteer?: Maybe<(
    { __typename?: 'Volunteer' }
    & Pick<Volunteer, '_id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'postcode' | 'dateOfBirth' | 'canDeliver' | 'actionsCompleted' | 'actionsActive' | 'active'>
  )>, recipient?: Maybe<(
    { __typename?: 'Recipient' }
    & Pick<Recipient, '_id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'lat' | 'long' | 'actionsCompleted' | 'deliveryDays' | 'prefferedProducts'>
  )>, distributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & Pick<DistributionCentre, '_id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long'>
  )>, products?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & Pick<VolunteerActionProduct, '_id'>
  )>>> }
);

export type VolunteerFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, '_id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'postcode' | 'dateOfBirth' | 'canDeliver' | 'actionsCompleted' | 'actionsActive' | 'active'>
);

export type VolunteerExpandedFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, '_id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'postcode' | 'dateOfBirth' | 'canDeliver' | 'actionsCompleted' | 'actionsActive' | 'active'>
  & { actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, '_id' | 'title' | 'description' | 'status' | 'assignedAt' | 'completedAt' | '_createdAt'>
  )>>> }
);

export type RecipientFieldsFragment = (
  { __typename?: 'Recipient' }
  & Pick<Recipient, '_id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'lat' | 'long' | 'actionsCompleted' | 'deliveryDays' | 'prefferedProducts'>
);

export type RecipientExpandedFieldsFragment = (
  { __typename?: 'Recipient' }
  & Pick<Recipient, '_id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'lat' | 'long' | 'actionsCompleted' | 'deliveryDays' | 'prefferedProducts'>
  & { actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, '_id' | 'title' | 'description' | 'status' | 'assignedAt' | 'completedAt' | '_createdAt'>
  )>>> }
);

export type DailyActionPlanFieldsFragment = (
  { __typename?: 'DailyActionPlan' }
  & Pick<DailyActionPlan, '_id' | 'owner' | 'date' | 'numberOfCasesCreated' | 'numberOfVolunteersAssigned' | 'numberOfRecipients'>
);

export type DailyActionPlanExpandedFieldsFragment = (
  { __typename?: 'DailyActionPlan' }
  & Pick<DailyActionPlan, '_id' | 'owner' | 'date' | 'numberOfCasesCreated' | 'numberOfVolunteersAssigned' | 'numberOfRecipients'>
);

export type FindDistributionCentresQueryVariables = Exact<{
  filter?: Maybe<DistributionCentreFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
}>;


export type FindDistributionCentresQuery = (
  { __typename?: 'Query' }
  & { findDistributionCentres: (
    { __typename?: 'DistributionCentreResultList' }
    & Pick<DistributionCentreResultList, 'offset' | 'limit' | 'count'>
    & { items: Array<Maybe<(
      { __typename?: 'DistributionCentre' }
      & DistributionCentreExpandedFieldsFragment
    )>> }
  ) }
);

export type GetDistributionCentreQueryVariables = Exact<{
  id: Scalars['GraphbackObjectID'];
}>;


export type GetDistributionCentreQuery = (
  { __typename?: 'Query' }
  & { getDistributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & DistributionCentreExpandedFieldsFragment
  )> }
);

export type FindProductsQueryVariables = Exact<{
  filter?: Maybe<ProductFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
}>;


export type FindProductsQuery = (
  { __typename?: 'Query' }
  & { findProducts: (
    { __typename?: 'ProductResultList' }
    & Pick<ProductResultList, 'offset' | 'limit' | 'count'>
    & { items: Array<Maybe<(
      { __typename?: 'Product' }
      & ProductExpandedFieldsFragment
    )>> }
  ) }
);

export type GetProductQueryVariables = Exact<{
  id: Scalars['GraphbackObjectID'];
}>;


export type GetProductQuery = (
  { __typename?: 'Query' }
  & { getProduct?: Maybe<(
    { __typename?: 'Product' }
    & ProductExpandedFieldsFragment
  )> }
);

export type FindVolunteerActionProductsQueryVariables = Exact<{
  filter?: Maybe<VolunteerActionProductFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
}>;


export type FindVolunteerActionProductsQuery = (
  { __typename?: 'Query' }
  & { findVolunteerActionProducts: (
    { __typename?: 'VolunteerActionProductResultList' }
    & Pick<VolunteerActionProductResultList, 'offset' | 'limit' | 'count'>
    & { items: Array<Maybe<(
      { __typename?: 'VolunteerActionProduct' }
      & VolunteerActionProductExpandedFieldsFragment
    )>> }
  ) }
);

export type GetVolunteerActionProductQueryVariables = Exact<{
  id: Scalars['GraphbackObjectID'];
}>;


export type GetVolunteerActionProductQuery = (
  { __typename?: 'Query' }
  & { getVolunteerActionProduct?: Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & VolunteerActionProductExpandedFieldsFragment
  )> }
);

export type FindVolunteerActionsQueryVariables = Exact<{
  filter?: Maybe<VolunteerActionFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
}>;


export type FindVolunteerActionsQuery = (
  { __typename?: 'Query' }
  & { findVolunteerActions: (
    { __typename?: 'VolunteerActionResultList' }
    & Pick<VolunteerActionResultList, 'offset' | 'limit' | 'count'>
    & { items: Array<Maybe<(
      { __typename?: 'VolunteerAction' }
      & VolunteerActionExpandedFieldsFragment
    )>> }
  ) }
);

export type GetVolunteerActionQueryVariables = Exact<{
  id: Scalars['GraphbackObjectID'];
}>;


export type GetVolunteerActionQuery = (
  { __typename?: 'Query' }
  & { getVolunteerAction?: Maybe<(
    { __typename?: 'VolunteerAction' }
    & VolunteerActionExpandedFieldsFragment
  )> }
);

export type FindVolunteersQueryVariables = Exact<{
  filter?: Maybe<VolunteerFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
}>;


export type FindVolunteersQuery = (
  { __typename?: 'Query' }
  & { findVolunteers: (
    { __typename?: 'VolunteerResultList' }
    & Pick<VolunteerResultList, 'offset' | 'limit' | 'count'>
    & { items: Array<Maybe<(
      { __typename?: 'Volunteer' }
      & VolunteerExpandedFieldsFragment
    )>> }
  ) }
);

export type GetVolunteerQueryVariables = Exact<{
  id: Scalars['GraphbackObjectID'];
}>;


export type GetVolunteerQuery = (
  { __typename?: 'Query' }
  & { getVolunteer?: Maybe<(
    { __typename?: 'Volunteer' }
    & VolunteerExpandedFieldsFragment
  )> }
);

export type FindRecipientsQueryVariables = Exact<{
  filter?: Maybe<RecipientFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
}>;


export type FindRecipientsQuery = (
  { __typename?: 'Query' }
  & { findRecipients: (
    { __typename?: 'RecipientResultList' }
    & Pick<RecipientResultList, 'offset' | 'limit' | 'count'>
    & { items: Array<Maybe<(
      { __typename?: 'Recipient' }
      & RecipientExpandedFieldsFragment
    )>> }
  ) }
);

export type GetRecipientQueryVariables = Exact<{
  id: Scalars['GraphbackObjectID'];
}>;


export type GetRecipientQuery = (
  { __typename?: 'Query' }
  & { getRecipient?: Maybe<(
    { __typename?: 'Recipient' }
    & RecipientExpandedFieldsFragment
  )> }
);

export type FindDailyActionPlansQueryVariables = Exact<{
  filter?: Maybe<DailyActionPlanFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
}>;


export type FindDailyActionPlansQuery = (
  { __typename?: 'Query' }
  & { findDailyActionPlans: (
    { __typename?: 'DailyActionPlanResultList' }
    & Pick<DailyActionPlanResultList, 'offset' | 'limit' | 'count'>
    & { items: Array<Maybe<(
      { __typename?: 'DailyActionPlan' }
      & DailyActionPlanExpandedFieldsFragment
    )>> }
  ) }
);

export type GetDailyActionPlanQueryVariables = Exact<{
  id: Scalars['GraphbackObjectID'];
}>;


export type GetDailyActionPlanQuery = (
  { __typename?: 'Query' }
  & { getDailyActionPlan?: Maybe<(
    { __typename?: 'DailyActionPlan' }
    & DailyActionPlanExpandedFieldsFragment
  )> }
);

export type CreateDistributionCentreMutationVariables = Exact<{
  input: CreateDistributionCentreInput;
}>;


export type CreateDistributionCentreMutation = (
  { __typename?: 'Mutation' }
  & { createDistributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & DistributionCentreFieldsFragment
  )> }
);

export type UpdateDistributionCentreMutationVariables = Exact<{
  input: MutateDistributionCentreInput;
}>;


export type UpdateDistributionCentreMutation = (
  { __typename?: 'Mutation' }
  & { updateDistributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & DistributionCentreFieldsFragment
  )> }
);

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct?: Maybe<(
    { __typename?: 'Product' }
    & ProductFieldsFragment
  )> }
);

export type UpdateProductMutationVariables = Exact<{
  input: MutateProductInput;
}>;


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { updateProduct?: Maybe<(
    { __typename?: 'Product' }
    & ProductFieldsFragment
  )> }
);

export type CreateVolunteerActionProductMutationVariables = Exact<{
  input: CreateVolunteerActionProductInput;
}>;


export type CreateVolunteerActionProductMutation = (
  { __typename?: 'Mutation' }
  & { createVolunteerActionProduct?: Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & VolunteerActionProductFieldsFragment
  )> }
);

export type CreateVolunteerActionMutationVariables = Exact<{
  input: CreateVolunteerActionInput;
}>;


export type CreateVolunteerActionMutation = (
  { __typename?: 'Mutation' }
  & { createVolunteerAction?: Maybe<(
    { __typename?: 'VolunteerAction' }
    & VolunteerActionFieldsFragment
  )> }
);

export type UpdateVolunteerActionMutationVariables = Exact<{
  input: MutateVolunteerActionInput;
}>;


export type UpdateVolunteerActionMutation = (
  { __typename?: 'Mutation' }
  & { updateVolunteerAction?: Maybe<(
    { __typename?: 'VolunteerAction' }
    & VolunteerActionFieldsFragment
  )> }
);

export type CreateVolunteerMutationVariables = Exact<{
  input: CreateVolunteerInput;
}>;


export type CreateVolunteerMutation = (
  { __typename?: 'Mutation' }
  & { createVolunteer?: Maybe<(
    { __typename?: 'Volunteer' }
    & VolunteerFieldsFragment
  )> }
);

export type UpdateVolunteerMutationVariables = Exact<{
  input: MutateVolunteerInput;
}>;


export type UpdateVolunteerMutation = (
  { __typename?: 'Mutation' }
  & { updateVolunteer?: Maybe<(
    { __typename?: 'Volunteer' }
    & VolunteerFieldsFragment
  )> }
);

export type CreateRecipientMutationVariables = Exact<{
  input: CreateRecipientInput;
}>;


export type CreateRecipientMutation = (
  { __typename?: 'Mutation' }
  & { createRecipient?: Maybe<(
    { __typename?: 'Recipient' }
    & RecipientFieldsFragment
  )> }
);

export type UpdateRecipientMutationVariables = Exact<{
  input: MutateRecipientInput;
}>;


export type UpdateRecipientMutation = (
  { __typename?: 'Mutation' }
  & { updateRecipient?: Maybe<(
    { __typename?: 'Recipient' }
    & RecipientFieldsFragment
  )> }
);

export type CreateDailyActionPlanMutationVariables = Exact<{
  input: CreateDailyActionPlanInput;
}>;


export type CreateDailyActionPlanMutation = (
  { __typename?: 'Mutation' }
  & { createDailyActionPlan?: Maybe<(
    { __typename?: 'DailyActionPlan' }
    & DailyActionPlanFieldsFragment
  )> }
);

export type UpdateDailyActionPlanMutationVariables = Exact<{
  input: MutateDailyActionPlanInput;
}>;


export type UpdateDailyActionPlanMutation = (
  { __typename?: 'Mutation' }
  & { updateDailyActionPlan?: Maybe<(
    { __typename?: 'DailyActionPlan' }
    & DailyActionPlanFieldsFragment
  )> }
);

export type FindActiveVolunteerQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type FindActiveVolunteerQuery = (
  { __typename?: 'Query' }
  & { findVolunteers: (
    { __typename?: 'VolunteerResultList' }
    & { items: Array<Maybe<(
      { __typename?: 'Volunteer' }
      & VolunteerFieldsFragment
    )>> }
  ) }
);

export type FindMyVolunteerActionsQueryVariables = Exact<{
  volunteerId: Scalars['GraphbackObjectID'];
  status?: Maybe<Scalars['String']>;
}>;


export type FindMyVolunteerActionsQuery = (
  { __typename?: 'Query' }
  & { findVolunteerActions: (
    { __typename?: 'VolunteerActionResultList' }
    & { items: Array<Maybe<(
      { __typename?: 'VolunteerAction' }
      & VolunteerActionFieldsFragment
    )>> }
  ) }
);

export const DistributionCentreFieldsFragmentDoc = gql`
    fragment DistributionCentreFields on DistributionCentre {
  _id
  name
  address1
  address2
  city
  postcode
  lat
  long
}
    `;
export const DistributionCentreExpandedFieldsFragmentDoc = gql`
    fragment DistributionCentreExpandedFields on DistributionCentre {
  _id
  name
  address1
  address2
  city
  postcode
  lat
  long
  products {
    _id
    label
    description
  }
  actions {
    _id
    title
    description
    status
    assignedAt
    completedAt
    _createdAt
  }
}
    `;
export const ProductFieldsFragmentDoc = gql`
    fragment ProductFields on Product {
  _id
  label
  description
}
    `;
export const ProductExpandedFieldsFragmentDoc = gql`
    fragment ProductExpandedFields on Product {
  _id
  label
  description
  volunteerActionProducts {
    _id
  }
  distributionCentre {
    _id
    name
    address1
    address2
    city
    postcode
    lat
    long
  }
}
    `;
export const VolunteerActionProductFieldsFragmentDoc = gql`
    fragment VolunteerActionProductFields on VolunteerActionProduct {
  _id
}
    `;
export const VolunteerActionProductExpandedFieldsFragmentDoc = gql`
    fragment VolunteerActionProductExpandedFields on VolunteerActionProduct {
  _id
  volunteerAction {
    _id
    title
    description
    status
    assignedAt
    completedAt
    _createdAt
  }
  product {
    _id
    label
    description
  }
}
    `;
export const VolunteerActionFieldsFragmentDoc = gql`
    fragment VolunteerActionFields on VolunteerAction {
  _id
  title
  description
  status
  assignedAt
  completedAt
  _createdAt
}
    `;
export const VolunteerActionExpandedFieldsFragmentDoc = gql`
    fragment VolunteerActionExpandedFields on VolunteerAction {
  _id
  title
  description
  status
  assignedAt
  completedAt
  _createdAt
  volunteer {
    _id
    firstName
    lastName
    email
    username
    address1
    address2
    city
    postcode
    dateOfBirth
    canDeliver
    actionsCompleted
    actionsActive
    active
  }
  recipient {
    _id
    firstName
    lastName
    phone
    address1
    address2
    postcode
    city
    lat
    long
    actionsCompleted
    deliveryDays
    prefferedProducts
  }
  distributionCentre {
    _id
    name
    address1
    address2
    city
    postcode
    lat
    long
  }
  products {
    _id
  }
}
    `;
export const VolunteerFieldsFragmentDoc = gql`
    fragment VolunteerFields on Volunteer {
  _id
  firstName
  lastName
  email
  username
  address1
  address2
  city
  postcode
  dateOfBirth
  canDeliver
  actionsCompleted
  actionsActive
  active
}
    `;
export const VolunteerExpandedFieldsFragmentDoc = gql`
    fragment VolunteerExpandedFields on Volunteer {
  _id
  firstName
  lastName
  email
  username
  address1
  address2
  city
  postcode
  dateOfBirth
  canDeliver
  actionsCompleted
  actionsActive
  active
  actions {
    _id
    title
    description
    status
    assignedAt
    completedAt
    _createdAt
  }
}
    `;
export const RecipientFieldsFragmentDoc = gql`
    fragment RecipientFields on Recipient {
  _id
  firstName
  lastName
  phone
  address1
  address2
  postcode
  city
  lat
  long
  actionsCompleted
  deliveryDays
  prefferedProducts
}
    `;
export const RecipientExpandedFieldsFragmentDoc = gql`
    fragment RecipientExpandedFields on Recipient {
  _id
  firstName
  lastName
  phone
  address1
  address2
  postcode
  city
  lat
  long
  actionsCompleted
  deliveryDays
  prefferedProducts
  actions {
    _id
    title
    description
    status
    assignedAt
    completedAt
    _createdAt
  }
}
    `;
export const DailyActionPlanFieldsFragmentDoc = gql`
    fragment DailyActionPlanFields on DailyActionPlan {
  _id
  owner
  date
  numberOfCasesCreated
  numberOfVolunteersAssigned
  numberOfRecipients
}
    `;
export const DailyActionPlanExpandedFieldsFragmentDoc = gql`
    fragment DailyActionPlanExpandedFields on DailyActionPlan {
  _id
  owner
  date
  numberOfCasesCreated
  numberOfVolunteersAssigned
  numberOfRecipients
}
    `;
export const FindDistributionCentresDocument = gql`
    query findDistributionCentres($filter: DistributionCentreFilter, $page: PageRequest, $orderBy: OrderByInput) {
  findDistributionCentres(filter: $filter, page: $page, orderBy: $orderBy) {
    items {
      ...DistributionCentreExpandedFields
    }
    offset
    limit
    count
  }
}
    ${DistributionCentreExpandedFieldsFragmentDoc}`;

/**
 * __useFindDistributionCentresQuery__
 *
 * To run a query within a React component, call `useFindDistributionCentresQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDistributionCentresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDistributionCentresQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFindDistributionCentresQuery(baseOptions?: Apollo.QueryHookOptions<FindDistributionCentresQuery, FindDistributionCentresQueryVariables>) {
        return Apollo.useQuery<FindDistributionCentresQuery, FindDistributionCentresQueryVariables>(FindDistributionCentresDocument, baseOptions);
      }
export function useFindDistributionCentresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindDistributionCentresQuery, FindDistributionCentresQueryVariables>) {
          return Apollo.useLazyQuery<FindDistributionCentresQuery, FindDistributionCentresQueryVariables>(FindDistributionCentresDocument, baseOptions);
        }
export type FindDistributionCentresQueryHookResult = ReturnType<typeof useFindDistributionCentresQuery>;
export type FindDistributionCentresLazyQueryHookResult = ReturnType<typeof useFindDistributionCentresLazyQuery>;
export type FindDistributionCentresQueryResult = Apollo.QueryResult<FindDistributionCentresQuery, FindDistributionCentresQueryVariables>;
export const GetDistributionCentreDocument = gql`
    query getDistributionCentre($id: GraphbackObjectID!) {
  getDistributionCentre(id: $id) {
    ...DistributionCentreExpandedFields
  }
}
    ${DistributionCentreExpandedFieldsFragmentDoc}`;

/**
 * __useGetDistributionCentreQuery__
 *
 * To run a query within a React component, call `useGetDistributionCentreQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDistributionCentreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDistributionCentreQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDistributionCentreQuery(baseOptions?: Apollo.QueryHookOptions<GetDistributionCentreQuery, GetDistributionCentreQueryVariables>) {
        return Apollo.useQuery<GetDistributionCentreQuery, GetDistributionCentreQueryVariables>(GetDistributionCentreDocument, baseOptions);
      }
export function useGetDistributionCentreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDistributionCentreQuery, GetDistributionCentreQueryVariables>) {
          return Apollo.useLazyQuery<GetDistributionCentreQuery, GetDistributionCentreQueryVariables>(GetDistributionCentreDocument, baseOptions);
        }
export type GetDistributionCentreQueryHookResult = ReturnType<typeof useGetDistributionCentreQuery>;
export type GetDistributionCentreLazyQueryHookResult = ReturnType<typeof useGetDistributionCentreLazyQuery>;
export type GetDistributionCentreQueryResult = Apollo.QueryResult<GetDistributionCentreQuery, GetDistributionCentreQueryVariables>;
export const FindProductsDocument = gql`
    query findProducts($filter: ProductFilter, $page: PageRequest, $orderBy: OrderByInput) {
  findProducts(filter: $filter, page: $page, orderBy: $orderBy) {
    items {
      ...ProductExpandedFields
    }
    offset
    limit
    count
  }
}
    ${ProductExpandedFieldsFragmentDoc}`;

/**
 * __useFindProductsQuery__
 *
 * To run a query within a React component, call `useFindProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProductsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFindProductsQuery(baseOptions?: Apollo.QueryHookOptions<FindProductsQuery, FindProductsQueryVariables>) {
        return Apollo.useQuery<FindProductsQuery, FindProductsQueryVariables>(FindProductsDocument, baseOptions);
      }
export function useFindProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProductsQuery, FindProductsQueryVariables>) {
          return Apollo.useLazyQuery<FindProductsQuery, FindProductsQueryVariables>(FindProductsDocument, baseOptions);
        }
export type FindProductsQueryHookResult = ReturnType<typeof useFindProductsQuery>;
export type FindProductsLazyQueryHookResult = ReturnType<typeof useFindProductsLazyQuery>;
export type FindProductsQueryResult = Apollo.QueryResult<FindProductsQuery, FindProductsQueryVariables>;
export const GetProductDocument = gql`
    query getProduct($id: GraphbackObjectID!) {
  getProduct(id: $id) {
    ...ProductExpandedFields
  }
}
    ${ProductExpandedFieldsFragmentDoc}`;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions?: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const FindVolunteerActionProductsDocument = gql`
    query findVolunteerActionProducts($filter: VolunteerActionProductFilter, $page: PageRequest, $orderBy: OrderByInput) {
  findVolunteerActionProducts(filter: $filter, page: $page, orderBy: $orderBy) {
    items {
      ...VolunteerActionProductExpandedFields
    }
    offset
    limit
    count
  }
}
    ${VolunteerActionProductExpandedFieldsFragmentDoc}`;

/**
 * __useFindVolunteerActionProductsQuery__
 *
 * To run a query within a React component, call `useFindVolunteerActionProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindVolunteerActionProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindVolunteerActionProductsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFindVolunteerActionProductsQuery(baseOptions?: Apollo.QueryHookOptions<FindVolunteerActionProductsQuery, FindVolunteerActionProductsQueryVariables>) {
        return Apollo.useQuery<FindVolunteerActionProductsQuery, FindVolunteerActionProductsQueryVariables>(FindVolunteerActionProductsDocument, baseOptions);
      }
export function useFindVolunteerActionProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindVolunteerActionProductsQuery, FindVolunteerActionProductsQueryVariables>) {
          return Apollo.useLazyQuery<FindVolunteerActionProductsQuery, FindVolunteerActionProductsQueryVariables>(FindVolunteerActionProductsDocument, baseOptions);
        }
export type FindVolunteerActionProductsQueryHookResult = ReturnType<typeof useFindVolunteerActionProductsQuery>;
export type FindVolunteerActionProductsLazyQueryHookResult = ReturnType<typeof useFindVolunteerActionProductsLazyQuery>;
export type FindVolunteerActionProductsQueryResult = Apollo.QueryResult<FindVolunteerActionProductsQuery, FindVolunteerActionProductsQueryVariables>;
export const GetVolunteerActionProductDocument = gql`
    query getVolunteerActionProduct($id: GraphbackObjectID!) {
  getVolunteerActionProduct(id: $id) {
    ...VolunteerActionProductExpandedFields
  }
}
    ${VolunteerActionProductExpandedFieldsFragmentDoc}`;

/**
 * __useGetVolunteerActionProductQuery__
 *
 * To run a query within a React component, call `useGetVolunteerActionProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVolunteerActionProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVolunteerActionProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVolunteerActionProductQuery(baseOptions?: Apollo.QueryHookOptions<GetVolunteerActionProductQuery, GetVolunteerActionProductQueryVariables>) {
        return Apollo.useQuery<GetVolunteerActionProductQuery, GetVolunteerActionProductQueryVariables>(GetVolunteerActionProductDocument, baseOptions);
      }
export function useGetVolunteerActionProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVolunteerActionProductQuery, GetVolunteerActionProductQueryVariables>) {
          return Apollo.useLazyQuery<GetVolunteerActionProductQuery, GetVolunteerActionProductQueryVariables>(GetVolunteerActionProductDocument, baseOptions);
        }
export type GetVolunteerActionProductQueryHookResult = ReturnType<typeof useGetVolunteerActionProductQuery>;
export type GetVolunteerActionProductLazyQueryHookResult = ReturnType<typeof useGetVolunteerActionProductLazyQuery>;
export type GetVolunteerActionProductQueryResult = Apollo.QueryResult<GetVolunteerActionProductQuery, GetVolunteerActionProductQueryVariables>;
export const FindVolunteerActionsDocument = gql`
    query findVolunteerActions($filter: VolunteerActionFilter, $page: PageRequest, $orderBy: OrderByInput) {
  findVolunteerActions(filter: $filter, page: $page, orderBy: $orderBy) {
    items {
      ...VolunteerActionExpandedFields
    }
    offset
    limit
    count
  }
}
    ${VolunteerActionExpandedFieldsFragmentDoc}`;

/**
 * __useFindVolunteerActionsQuery__
 *
 * To run a query within a React component, call `useFindVolunteerActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindVolunteerActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindVolunteerActionsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFindVolunteerActionsQuery(baseOptions?: Apollo.QueryHookOptions<FindVolunteerActionsQuery, FindVolunteerActionsQueryVariables>) {
        return Apollo.useQuery<FindVolunteerActionsQuery, FindVolunteerActionsQueryVariables>(FindVolunteerActionsDocument, baseOptions);
      }
export function useFindVolunteerActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindVolunteerActionsQuery, FindVolunteerActionsQueryVariables>) {
          return Apollo.useLazyQuery<FindVolunteerActionsQuery, FindVolunteerActionsQueryVariables>(FindVolunteerActionsDocument, baseOptions);
        }
export type FindVolunteerActionsQueryHookResult = ReturnType<typeof useFindVolunteerActionsQuery>;
export type FindVolunteerActionsLazyQueryHookResult = ReturnType<typeof useFindVolunteerActionsLazyQuery>;
export type FindVolunteerActionsQueryResult = Apollo.QueryResult<FindVolunteerActionsQuery, FindVolunteerActionsQueryVariables>;
export const GetVolunteerActionDocument = gql`
    query getVolunteerAction($id: GraphbackObjectID!) {
  getVolunteerAction(id: $id) {
    ...VolunteerActionExpandedFields
  }
}
    ${VolunteerActionExpandedFieldsFragmentDoc}`;

/**
 * __useGetVolunteerActionQuery__
 *
 * To run a query within a React component, call `useGetVolunteerActionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVolunteerActionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVolunteerActionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVolunteerActionQuery(baseOptions?: Apollo.QueryHookOptions<GetVolunteerActionQuery, GetVolunteerActionQueryVariables>) {
        return Apollo.useQuery<GetVolunteerActionQuery, GetVolunteerActionQueryVariables>(GetVolunteerActionDocument, baseOptions);
      }
export function useGetVolunteerActionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVolunteerActionQuery, GetVolunteerActionQueryVariables>) {
          return Apollo.useLazyQuery<GetVolunteerActionQuery, GetVolunteerActionQueryVariables>(GetVolunteerActionDocument, baseOptions);
        }
export type GetVolunteerActionQueryHookResult = ReturnType<typeof useGetVolunteerActionQuery>;
export type GetVolunteerActionLazyQueryHookResult = ReturnType<typeof useGetVolunteerActionLazyQuery>;
export type GetVolunteerActionQueryResult = Apollo.QueryResult<GetVolunteerActionQuery, GetVolunteerActionQueryVariables>;
export const FindVolunteersDocument = gql`
    query findVolunteers($filter: VolunteerFilter, $page: PageRequest, $orderBy: OrderByInput) {
  findVolunteers(filter: $filter, page: $page, orderBy: $orderBy) {
    items {
      ...VolunteerExpandedFields
    }
    offset
    limit
    count
  }
}
    ${VolunteerExpandedFieldsFragmentDoc}`;

/**
 * __useFindVolunteersQuery__
 *
 * To run a query within a React component, call `useFindVolunteersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindVolunteersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindVolunteersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFindVolunteersQuery(baseOptions?: Apollo.QueryHookOptions<FindVolunteersQuery, FindVolunteersQueryVariables>) {
        return Apollo.useQuery<FindVolunteersQuery, FindVolunteersQueryVariables>(FindVolunteersDocument, baseOptions);
      }
export function useFindVolunteersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindVolunteersQuery, FindVolunteersQueryVariables>) {
          return Apollo.useLazyQuery<FindVolunteersQuery, FindVolunteersQueryVariables>(FindVolunteersDocument, baseOptions);
        }
export type FindVolunteersQueryHookResult = ReturnType<typeof useFindVolunteersQuery>;
export type FindVolunteersLazyQueryHookResult = ReturnType<typeof useFindVolunteersLazyQuery>;
export type FindVolunteersQueryResult = Apollo.QueryResult<FindVolunteersQuery, FindVolunteersQueryVariables>;
export const GetVolunteerDocument = gql`
    query getVolunteer($id: GraphbackObjectID!) {
  getVolunteer(id: $id) {
    ...VolunteerExpandedFields
  }
}
    ${VolunteerExpandedFieldsFragmentDoc}`;

/**
 * __useGetVolunteerQuery__
 *
 * To run a query within a React component, call `useGetVolunteerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVolunteerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVolunteerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVolunteerQuery(baseOptions?: Apollo.QueryHookOptions<GetVolunteerQuery, GetVolunteerQueryVariables>) {
        return Apollo.useQuery<GetVolunteerQuery, GetVolunteerQueryVariables>(GetVolunteerDocument, baseOptions);
      }
export function useGetVolunteerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVolunteerQuery, GetVolunteerQueryVariables>) {
          return Apollo.useLazyQuery<GetVolunteerQuery, GetVolunteerQueryVariables>(GetVolunteerDocument, baseOptions);
        }
export type GetVolunteerQueryHookResult = ReturnType<typeof useGetVolunteerQuery>;
export type GetVolunteerLazyQueryHookResult = ReturnType<typeof useGetVolunteerLazyQuery>;
export type GetVolunteerQueryResult = Apollo.QueryResult<GetVolunteerQuery, GetVolunteerQueryVariables>;
export const FindRecipientsDocument = gql`
    query findRecipients($filter: RecipientFilter, $page: PageRequest, $orderBy: OrderByInput) {
  findRecipients(filter: $filter, page: $page, orderBy: $orderBy) {
    items {
      ...RecipientExpandedFields
    }
    offset
    limit
    count
  }
}
    ${RecipientExpandedFieldsFragmentDoc}`;

/**
 * __useFindRecipientsQuery__
 *
 * To run a query within a React component, call `useFindRecipientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRecipientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRecipientsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFindRecipientsQuery(baseOptions?: Apollo.QueryHookOptions<FindRecipientsQuery, FindRecipientsQueryVariables>) {
        return Apollo.useQuery<FindRecipientsQuery, FindRecipientsQueryVariables>(FindRecipientsDocument, baseOptions);
      }
export function useFindRecipientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRecipientsQuery, FindRecipientsQueryVariables>) {
          return Apollo.useLazyQuery<FindRecipientsQuery, FindRecipientsQueryVariables>(FindRecipientsDocument, baseOptions);
        }
export type FindRecipientsQueryHookResult = ReturnType<typeof useFindRecipientsQuery>;
export type FindRecipientsLazyQueryHookResult = ReturnType<typeof useFindRecipientsLazyQuery>;
export type FindRecipientsQueryResult = Apollo.QueryResult<FindRecipientsQuery, FindRecipientsQueryVariables>;
export const GetRecipientDocument = gql`
    query getRecipient($id: GraphbackObjectID!) {
  getRecipient(id: $id) {
    ...RecipientExpandedFields
  }
}
    ${RecipientExpandedFieldsFragmentDoc}`;

/**
 * __useGetRecipientQuery__
 *
 * To run a query within a React component, call `useGetRecipientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRecipientQuery(baseOptions?: Apollo.QueryHookOptions<GetRecipientQuery, GetRecipientQueryVariables>) {
        return Apollo.useQuery<GetRecipientQuery, GetRecipientQueryVariables>(GetRecipientDocument, baseOptions);
      }
export function useGetRecipientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipientQuery, GetRecipientQueryVariables>) {
          return Apollo.useLazyQuery<GetRecipientQuery, GetRecipientQueryVariables>(GetRecipientDocument, baseOptions);
        }
export type GetRecipientQueryHookResult = ReturnType<typeof useGetRecipientQuery>;
export type GetRecipientLazyQueryHookResult = ReturnType<typeof useGetRecipientLazyQuery>;
export type GetRecipientQueryResult = Apollo.QueryResult<GetRecipientQuery, GetRecipientQueryVariables>;
export const FindDailyActionPlansDocument = gql`
    query findDailyActionPlans($filter: DailyActionPlanFilter, $page: PageRequest, $orderBy: OrderByInput) {
  findDailyActionPlans(filter: $filter, page: $page, orderBy: $orderBy) {
    items {
      ...DailyActionPlanExpandedFields
    }
    offset
    limit
    count
  }
}
    ${DailyActionPlanExpandedFieldsFragmentDoc}`;

/**
 * __useFindDailyActionPlansQuery__
 *
 * To run a query within a React component, call `useFindDailyActionPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDailyActionPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDailyActionPlansQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFindDailyActionPlansQuery(baseOptions?: Apollo.QueryHookOptions<FindDailyActionPlansQuery, FindDailyActionPlansQueryVariables>) {
        return Apollo.useQuery<FindDailyActionPlansQuery, FindDailyActionPlansQueryVariables>(FindDailyActionPlansDocument, baseOptions);
      }
export function useFindDailyActionPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindDailyActionPlansQuery, FindDailyActionPlansQueryVariables>) {
          return Apollo.useLazyQuery<FindDailyActionPlansQuery, FindDailyActionPlansQueryVariables>(FindDailyActionPlansDocument, baseOptions);
        }
export type FindDailyActionPlansQueryHookResult = ReturnType<typeof useFindDailyActionPlansQuery>;
export type FindDailyActionPlansLazyQueryHookResult = ReturnType<typeof useFindDailyActionPlansLazyQuery>;
export type FindDailyActionPlansQueryResult = Apollo.QueryResult<FindDailyActionPlansQuery, FindDailyActionPlansQueryVariables>;
export const GetDailyActionPlanDocument = gql`
    query getDailyActionPlan($id: GraphbackObjectID!) {
  getDailyActionPlan(id: $id) {
    ...DailyActionPlanExpandedFields
  }
}
    ${DailyActionPlanExpandedFieldsFragmentDoc}`;

/**
 * __useGetDailyActionPlanQuery__
 *
 * To run a query within a React component, call `useGetDailyActionPlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDailyActionPlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDailyActionPlanQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDailyActionPlanQuery(baseOptions?: Apollo.QueryHookOptions<GetDailyActionPlanQuery, GetDailyActionPlanQueryVariables>) {
        return Apollo.useQuery<GetDailyActionPlanQuery, GetDailyActionPlanQueryVariables>(GetDailyActionPlanDocument, baseOptions);
      }
export function useGetDailyActionPlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDailyActionPlanQuery, GetDailyActionPlanQueryVariables>) {
          return Apollo.useLazyQuery<GetDailyActionPlanQuery, GetDailyActionPlanQueryVariables>(GetDailyActionPlanDocument, baseOptions);
        }
export type GetDailyActionPlanQueryHookResult = ReturnType<typeof useGetDailyActionPlanQuery>;
export type GetDailyActionPlanLazyQueryHookResult = ReturnType<typeof useGetDailyActionPlanLazyQuery>;
export type GetDailyActionPlanQueryResult = Apollo.QueryResult<GetDailyActionPlanQuery, GetDailyActionPlanQueryVariables>;
export const CreateDistributionCentreDocument = gql`
    mutation createDistributionCentre($input: CreateDistributionCentreInput!) {
  createDistributionCentre(input: $input) {
    ...DistributionCentreFields
  }
}
    ${DistributionCentreFieldsFragmentDoc}`;
export type CreateDistributionCentreMutationFn = Apollo.MutationFunction<CreateDistributionCentreMutation, CreateDistributionCentreMutationVariables>;

/**
 * __useCreateDistributionCentreMutation__
 *
 * To run a mutation, you first call `useCreateDistributionCentreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDistributionCentreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDistributionCentreMutation, { data, loading, error }] = useCreateDistributionCentreMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDistributionCentreMutation(baseOptions?: Apollo.MutationHookOptions<CreateDistributionCentreMutation, CreateDistributionCentreMutationVariables>) {
        return Apollo.useMutation<CreateDistributionCentreMutation, CreateDistributionCentreMutationVariables>(CreateDistributionCentreDocument, baseOptions);
      }
export type CreateDistributionCentreMutationHookResult = ReturnType<typeof useCreateDistributionCentreMutation>;
export type CreateDistributionCentreMutationResult = Apollo.MutationResult<CreateDistributionCentreMutation>;
export type CreateDistributionCentreMutationOptions = Apollo.BaseMutationOptions<CreateDistributionCentreMutation, CreateDistributionCentreMutationVariables>;
export const UpdateDistributionCentreDocument = gql`
    mutation updateDistributionCentre($input: MutateDistributionCentreInput!) {
  updateDistributionCentre(input: $input) {
    ...DistributionCentreFields
  }
}
    ${DistributionCentreFieldsFragmentDoc}`;
export type UpdateDistributionCentreMutationFn = Apollo.MutationFunction<UpdateDistributionCentreMutation, UpdateDistributionCentreMutationVariables>;

/**
 * __useUpdateDistributionCentreMutation__
 *
 * To run a mutation, you first call `useUpdateDistributionCentreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDistributionCentreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDistributionCentreMutation, { data, loading, error }] = useUpdateDistributionCentreMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDistributionCentreMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDistributionCentreMutation, UpdateDistributionCentreMutationVariables>) {
        return Apollo.useMutation<UpdateDistributionCentreMutation, UpdateDistributionCentreMutationVariables>(UpdateDistributionCentreDocument, baseOptions);
      }
export type UpdateDistributionCentreMutationHookResult = ReturnType<typeof useUpdateDistributionCentreMutation>;
export type UpdateDistributionCentreMutationResult = Apollo.MutationResult<UpdateDistributionCentreMutation>;
export type UpdateDistributionCentreMutationOptions = Apollo.BaseMutationOptions<UpdateDistributionCentreMutation, UpdateDistributionCentreMutationVariables>;
export const CreateProductDocument = gql`
    mutation createProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, baseOptions);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation updateProduct($input: MutateProductInput!) {
  updateProduct(input: $input) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, baseOptions);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const CreateVolunteerActionProductDocument = gql`
    mutation createVolunteerActionProduct($input: CreateVolunteerActionProductInput!) {
  createVolunteerActionProduct(input: $input) {
    ...VolunteerActionProductFields
  }
}
    ${VolunteerActionProductFieldsFragmentDoc}`;
export type CreateVolunteerActionProductMutationFn = Apollo.MutationFunction<CreateVolunteerActionProductMutation, CreateVolunteerActionProductMutationVariables>;

/**
 * __useCreateVolunteerActionProductMutation__
 *
 * To run a mutation, you first call `useCreateVolunteerActionProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVolunteerActionProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVolunteerActionProductMutation, { data, loading, error }] = useCreateVolunteerActionProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVolunteerActionProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateVolunteerActionProductMutation, CreateVolunteerActionProductMutationVariables>) {
        return Apollo.useMutation<CreateVolunteerActionProductMutation, CreateVolunteerActionProductMutationVariables>(CreateVolunteerActionProductDocument, baseOptions);
      }
export type CreateVolunteerActionProductMutationHookResult = ReturnType<typeof useCreateVolunteerActionProductMutation>;
export type CreateVolunteerActionProductMutationResult = Apollo.MutationResult<CreateVolunteerActionProductMutation>;
export type CreateVolunteerActionProductMutationOptions = Apollo.BaseMutationOptions<CreateVolunteerActionProductMutation, CreateVolunteerActionProductMutationVariables>;
export const CreateVolunteerActionDocument = gql`
    mutation createVolunteerAction($input: CreateVolunteerActionInput!) {
  createVolunteerAction(input: $input) {
    ...VolunteerActionFields
  }
}
    ${VolunteerActionFieldsFragmentDoc}`;
export type CreateVolunteerActionMutationFn = Apollo.MutationFunction<CreateVolunteerActionMutation, CreateVolunteerActionMutationVariables>;

/**
 * __useCreateVolunteerActionMutation__
 *
 * To run a mutation, you first call `useCreateVolunteerActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVolunteerActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVolunteerActionMutation, { data, loading, error }] = useCreateVolunteerActionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVolunteerActionMutation(baseOptions?: Apollo.MutationHookOptions<CreateVolunteerActionMutation, CreateVolunteerActionMutationVariables>) {
        return Apollo.useMutation<CreateVolunteerActionMutation, CreateVolunteerActionMutationVariables>(CreateVolunteerActionDocument, baseOptions);
      }
export type CreateVolunteerActionMutationHookResult = ReturnType<typeof useCreateVolunteerActionMutation>;
export type CreateVolunteerActionMutationResult = Apollo.MutationResult<CreateVolunteerActionMutation>;
export type CreateVolunteerActionMutationOptions = Apollo.BaseMutationOptions<CreateVolunteerActionMutation, CreateVolunteerActionMutationVariables>;
export const UpdateVolunteerActionDocument = gql`
    mutation updateVolunteerAction($input: MutateVolunteerActionInput!) {
  updateVolunteerAction(input: $input) {
    ...VolunteerActionFields
  }
}
    ${VolunteerActionFieldsFragmentDoc}`;
export type UpdateVolunteerActionMutationFn = Apollo.MutationFunction<UpdateVolunteerActionMutation, UpdateVolunteerActionMutationVariables>;

/**
 * __useUpdateVolunteerActionMutation__
 *
 * To run a mutation, you first call `useUpdateVolunteerActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVolunteerActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVolunteerActionMutation, { data, loading, error }] = useUpdateVolunteerActionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVolunteerActionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVolunteerActionMutation, UpdateVolunteerActionMutationVariables>) {
        return Apollo.useMutation<UpdateVolunteerActionMutation, UpdateVolunteerActionMutationVariables>(UpdateVolunteerActionDocument, baseOptions);
      }
export type UpdateVolunteerActionMutationHookResult = ReturnType<typeof useUpdateVolunteerActionMutation>;
export type UpdateVolunteerActionMutationResult = Apollo.MutationResult<UpdateVolunteerActionMutation>;
export type UpdateVolunteerActionMutationOptions = Apollo.BaseMutationOptions<UpdateVolunteerActionMutation, UpdateVolunteerActionMutationVariables>;
export const CreateVolunteerDocument = gql`
    mutation createVolunteer($input: CreateVolunteerInput!) {
  createVolunteer(input: $input) {
    ...VolunteerFields
  }
}
    ${VolunteerFieldsFragmentDoc}`;
export type CreateVolunteerMutationFn = Apollo.MutationFunction<CreateVolunteerMutation, CreateVolunteerMutationVariables>;

/**
 * __useCreateVolunteerMutation__
 *
 * To run a mutation, you first call `useCreateVolunteerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVolunteerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVolunteerMutation, { data, loading, error }] = useCreateVolunteerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVolunteerMutation(baseOptions?: Apollo.MutationHookOptions<CreateVolunteerMutation, CreateVolunteerMutationVariables>) {
        return Apollo.useMutation<CreateVolunteerMutation, CreateVolunteerMutationVariables>(CreateVolunteerDocument, baseOptions);
      }
export type CreateVolunteerMutationHookResult = ReturnType<typeof useCreateVolunteerMutation>;
export type CreateVolunteerMutationResult = Apollo.MutationResult<CreateVolunteerMutation>;
export type CreateVolunteerMutationOptions = Apollo.BaseMutationOptions<CreateVolunteerMutation, CreateVolunteerMutationVariables>;
export const UpdateVolunteerDocument = gql`
    mutation updateVolunteer($input: MutateVolunteerInput!) {
  updateVolunteer(input: $input) {
    ...VolunteerFields
  }
}
    ${VolunteerFieldsFragmentDoc}`;
export type UpdateVolunteerMutationFn = Apollo.MutationFunction<UpdateVolunteerMutation, UpdateVolunteerMutationVariables>;

/**
 * __useUpdateVolunteerMutation__
 *
 * To run a mutation, you first call `useUpdateVolunteerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVolunteerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVolunteerMutation, { data, loading, error }] = useUpdateVolunteerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVolunteerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVolunteerMutation, UpdateVolunteerMutationVariables>) {
        return Apollo.useMutation<UpdateVolunteerMutation, UpdateVolunteerMutationVariables>(UpdateVolunteerDocument, baseOptions);
      }
export type UpdateVolunteerMutationHookResult = ReturnType<typeof useUpdateVolunteerMutation>;
export type UpdateVolunteerMutationResult = Apollo.MutationResult<UpdateVolunteerMutation>;
export type UpdateVolunteerMutationOptions = Apollo.BaseMutationOptions<UpdateVolunteerMutation, UpdateVolunteerMutationVariables>;
export const CreateRecipientDocument = gql`
    mutation createRecipient($input: CreateRecipientInput!) {
  createRecipient(input: $input) {
    ...RecipientFields
  }
}
    ${RecipientFieldsFragmentDoc}`;
export type CreateRecipientMutationFn = Apollo.MutationFunction<CreateRecipientMutation, CreateRecipientMutationVariables>;

/**
 * __useCreateRecipientMutation__
 *
 * To run a mutation, you first call `useCreateRecipientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecipientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecipientMutation, { data, loading, error }] = useCreateRecipientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRecipientMutation(baseOptions?: Apollo.MutationHookOptions<CreateRecipientMutation, CreateRecipientMutationVariables>) {
        return Apollo.useMutation<CreateRecipientMutation, CreateRecipientMutationVariables>(CreateRecipientDocument, baseOptions);
      }
export type CreateRecipientMutationHookResult = ReturnType<typeof useCreateRecipientMutation>;
export type CreateRecipientMutationResult = Apollo.MutationResult<CreateRecipientMutation>;
export type CreateRecipientMutationOptions = Apollo.BaseMutationOptions<CreateRecipientMutation, CreateRecipientMutationVariables>;
export const UpdateRecipientDocument = gql`
    mutation updateRecipient($input: MutateRecipientInput!) {
  updateRecipient(input: $input) {
    ...RecipientFields
  }
}
    ${RecipientFieldsFragmentDoc}`;
export type UpdateRecipientMutationFn = Apollo.MutationFunction<UpdateRecipientMutation, UpdateRecipientMutationVariables>;

/**
 * __useUpdateRecipientMutation__
 *
 * To run a mutation, you first call `useUpdateRecipientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecipientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecipientMutation, { data, loading, error }] = useUpdateRecipientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRecipientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecipientMutation, UpdateRecipientMutationVariables>) {
        return Apollo.useMutation<UpdateRecipientMutation, UpdateRecipientMutationVariables>(UpdateRecipientDocument, baseOptions);
      }
export type UpdateRecipientMutationHookResult = ReturnType<typeof useUpdateRecipientMutation>;
export type UpdateRecipientMutationResult = Apollo.MutationResult<UpdateRecipientMutation>;
export type UpdateRecipientMutationOptions = Apollo.BaseMutationOptions<UpdateRecipientMutation, UpdateRecipientMutationVariables>;
export const CreateDailyActionPlanDocument = gql`
    mutation createDailyActionPlan($input: CreateDailyActionPlanInput!) {
  createDailyActionPlan(input: $input) {
    ...DailyActionPlanFields
  }
}
    ${DailyActionPlanFieldsFragmentDoc}`;
export type CreateDailyActionPlanMutationFn = Apollo.MutationFunction<CreateDailyActionPlanMutation, CreateDailyActionPlanMutationVariables>;

/**
 * __useCreateDailyActionPlanMutation__
 *
 * To run a mutation, you first call `useCreateDailyActionPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDailyActionPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDailyActionPlanMutation, { data, loading, error }] = useCreateDailyActionPlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDailyActionPlanMutation(baseOptions?: Apollo.MutationHookOptions<CreateDailyActionPlanMutation, CreateDailyActionPlanMutationVariables>) {
        return Apollo.useMutation<CreateDailyActionPlanMutation, CreateDailyActionPlanMutationVariables>(CreateDailyActionPlanDocument, baseOptions);
      }
export type CreateDailyActionPlanMutationHookResult = ReturnType<typeof useCreateDailyActionPlanMutation>;
export type CreateDailyActionPlanMutationResult = Apollo.MutationResult<CreateDailyActionPlanMutation>;
export type CreateDailyActionPlanMutationOptions = Apollo.BaseMutationOptions<CreateDailyActionPlanMutation, CreateDailyActionPlanMutationVariables>;
export const UpdateDailyActionPlanDocument = gql`
    mutation updateDailyActionPlan($input: MutateDailyActionPlanInput!) {
  updateDailyActionPlan(input: $input) {
    ...DailyActionPlanFields
  }
}
    ${DailyActionPlanFieldsFragmentDoc}`;
export type UpdateDailyActionPlanMutationFn = Apollo.MutationFunction<UpdateDailyActionPlanMutation, UpdateDailyActionPlanMutationVariables>;

/**
 * __useUpdateDailyActionPlanMutation__
 *
 * To run a mutation, you first call `useUpdateDailyActionPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDailyActionPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDailyActionPlanMutation, { data, loading, error }] = useUpdateDailyActionPlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDailyActionPlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDailyActionPlanMutation, UpdateDailyActionPlanMutationVariables>) {
        return Apollo.useMutation<UpdateDailyActionPlanMutation, UpdateDailyActionPlanMutationVariables>(UpdateDailyActionPlanDocument, baseOptions);
      }
export type UpdateDailyActionPlanMutationHookResult = ReturnType<typeof useUpdateDailyActionPlanMutation>;
export type UpdateDailyActionPlanMutationResult = Apollo.MutationResult<UpdateDailyActionPlanMutation>;
export type UpdateDailyActionPlanMutationOptions = Apollo.BaseMutationOptions<UpdateDailyActionPlanMutation, UpdateDailyActionPlanMutationVariables>;
export const FindActiveVolunteerDocument = gql`
    query findActiveVolunteer($username: String!) {
  findVolunteers(filter: {username: {eq: $username}}, page: {limit: 1}) {
    items {
      ...VolunteerFields
    }
  }
}
    ${VolunteerFieldsFragmentDoc}`;

/**
 * __useFindActiveVolunteerQuery__
 *
 * To run a query within a React component, call `useFindActiveVolunteerQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindActiveVolunteerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindActiveVolunteerQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFindActiveVolunteerQuery(baseOptions?: Apollo.QueryHookOptions<FindActiveVolunteerQuery, FindActiveVolunteerQueryVariables>) {
        return Apollo.useQuery<FindActiveVolunteerQuery, FindActiveVolunteerQueryVariables>(FindActiveVolunteerDocument, baseOptions);
      }
export function useFindActiveVolunteerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindActiveVolunteerQuery, FindActiveVolunteerQueryVariables>) {
          return Apollo.useLazyQuery<FindActiveVolunteerQuery, FindActiveVolunteerQueryVariables>(FindActiveVolunteerDocument, baseOptions);
        }
export type FindActiveVolunteerQueryHookResult = ReturnType<typeof useFindActiveVolunteerQuery>;
export type FindActiveVolunteerLazyQueryHookResult = ReturnType<typeof useFindActiveVolunteerLazyQuery>;
export type FindActiveVolunteerQueryResult = Apollo.QueryResult<FindActiveVolunteerQuery, FindActiveVolunteerQueryVariables>;
export const FindMyVolunteerActionsDocument = gql`
    query findMyVolunteerActions($volunteerId: GraphbackObjectID!, $status: String) {
  findVolunteerActions(filter: {volunteerId: {eq: $volunteerId}, status: {eq: $status}}) {
    items {
      ...VolunteerActionFields
    }
  }
}
    ${VolunteerActionFieldsFragmentDoc}`;

/**
 * __useFindMyVolunteerActionsQuery__
 *
 * To run a query within a React component, call `useFindMyVolunteerActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMyVolunteerActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMyVolunteerActionsQuery({
 *   variables: {
 *      volunteerId: // value for 'volunteerId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useFindMyVolunteerActionsQuery(baseOptions?: Apollo.QueryHookOptions<FindMyVolunteerActionsQuery, FindMyVolunteerActionsQueryVariables>) {
        return Apollo.useQuery<FindMyVolunteerActionsQuery, FindMyVolunteerActionsQueryVariables>(FindMyVolunteerActionsDocument, baseOptions);
      }
export function useFindMyVolunteerActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMyVolunteerActionsQuery, FindMyVolunteerActionsQueryVariables>) {
          return Apollo.useLazyQuery<FindMyVolunteerActionsQuery, FindMyVolunteerActionsQueryVariables>(FindMyVolunteerActionsDocument, baseOptions);
        }
export type FindMyVolunteerActionsQueryHookResult = ReturnType<typeof useFindMyVolunteerActionsQuery>;
export type FindMyVolunteerActionsLazyQueryHookResult = ReturnType<typeof useFindMyVolunteerActionsLazyQuery>;
export type FindMyVolunteerActionsQueryResult = Apollo.QueryResult<FindMyVolunteerActionsQuery, FindMyVolunteerActionsQueryVariables>;