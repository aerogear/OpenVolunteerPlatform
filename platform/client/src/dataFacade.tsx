/* tslint:disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
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
  id?: Maybe<Scalars['ID']>;
  owner?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  numberOfCasesCreated?: Maybe<Scalars['Int']>;
  numberOfVolunteersAssigned?: Maybe<Scalars['Int']>;
  numberOfRecipients?: Maybe<Scalars['Int']>;
};

export type CreateDistributionCentreInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
};

export type CreateProductInput = {
  id?: Maybe<Scalars['ID']>;
  label: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  distributionCentreId?: Maybe<Scalars['ID']>;
};

export type CreateRecipientInput = {
  id?: Maybe<Scalars['ID']>;
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
  id?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status?: Maybe<ActionStatus>;
  assignedAt?: Maybe<Scalars['DateTime']>;
  completedAt?: Maybe<Scalars['DateTime']>;
  _createdAt?: Maybe<Scalars['DateTime']>;
  volunteerId?: Maybe<Scalars['ID']>;
  distributionCentreId?: Maybe<Scalars['ID']>;
  recipientId?: Maybe<Scalars['ID']>;
};

export type CreateVolunteerActionProductInput = {
  id?: Maybe<Scalars['ID']>;
  productId?: Maybe<Scalars['ID']>;
  volunteerActionId?: Maybe<Scalars['ID']>;
};

export type CreateVolunteerInput = {
  id?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  canDeliver?: Maybe<Scalars['Boolean']>;
  actionsCompleted?: Maybe<Scalars['Int']>;
  actionsActive?: Maybe<Scalars['Int']>;
  active?: Maybe<Scalars['Boolean']>;
};

/**  @model  */
export type DailyActionPlan = {
   __typename?: 'DailyActionPlan';
  id: Scalars['ID'];
  owner?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  numberOfCasesCreated?: Maybe<Scalars['Int']>;
  numberOfVolunteersAssigned?: Maybe<Scalars['Int']>;
  numberOfRecipients?: Maybe<Scalars['Int']>;
};

export type DailyActionPlanFilter = {
  id?: Maybe<IdInput>;
  owner?: Maybe<StringInput>;
  date?: Maybe<DateTimeInput>;
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


export type DateTimeInput = {
  ne?: Maybe<Scalars['DateTime']>;
  eq?: Maybe<Scalars['DateTime']>;
  le?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  ge?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  between?: Maybe<Array<Scalars['DateTime']>>;
};

/** @model(delete: false) */
export type DistributionCentre = Address & {
   __typename?: 'DistributionCentre';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
  /** @oneToMany(field: 'distributionCentre', key: 'distributionCentreId') */
  products?: Maybe<Array<Maybe<Product>>>;
  /** @oneToMany(field: 'distributionCentre', key: 'distributionCentreId') */
  actions: Array<Maybe<VolunteerAction>>;
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
  id?: Maybe<IdInput>;
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

export type IdInput = {
  ne?: Maybe<Scalars['ID']>;
  eq?: Maybe<Scalars['ID']>;
  le?: Maybe<Scalars['ID']>;
  lt?: Maybe<Scalars['ID']>;
  ge?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
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
  id: Scalars['ID'];
  owner?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  numberOfCasesCreated?: Maybe<Scalars['Int']>;
  numberOfVolunteersAssigned?: Maybe<Scalars['Int']>;
  numberOfRecipients?: Maybe<Scalars['Int']>;
};

export type MutateDistributionCentreInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
};

export type MutateProductInput = {
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  distributionCentreId?: Maybe<Scalars['ID']>;
};

export type MutateRecipientInput = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<ActionStatus>;
  assignedAt?: Maybe<Scalars['DateTime']>;
  completedAt?: Maybe<Scalars['DateTime']>;
  _createdAt?: Maybe<Scalars['DateTime']>;
  volunteerId?: Maybe<Scalars['ID']>;
  distributionCentreId?: Maybe<Scalars['ID']>;
  recipientId?: Maybe<Scalars['ID']>;
};

export type MutateVolunteerInput = {
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  canDeliver?: Maybe<Scalars['Boolean']>;
  actionsCompleted?: Maybe<Scalars['Int']>;
  actionsActive?: Maybe<Scalars['Int']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  /** Automatically create actions for the day of the month specified */
  assignVolunteers?: Maybe<DailyActionPlan>;
  createDailyActionPlan?: Maybe<DailyActionPlan>;
  updateDailyActionPlan?: Maybe<DailyActionPlan>;
  createDistributionCentre?: Maybe<DistributionCentre>;
  updateDistributionCentre?: Maybe<DistributionCentre>;
  createProduct?: Maybe<Product>;
  updateProduct?: Maybe<Product>;
  createVolunteerActionProduct?: Maybe<VolunteerActionProduct>;
  createVolunteer?: Maybe<Volunteer>;
  updateVolunteer?: Maybe<Volunteer>;
  createVolunteerAction?: Maybe<VolunteerAction>;
  updateVolunteerAction?: Maybe<VolunteerAction>;
  createRecipient?: Maybe<Recipient>;
  updateRecipient?: Maybe<Recipient>;
};


export type MutationCreateDailyActionPlanArgs = {
  input: CreateDailyActionPlanInput;
};


export type MutationUpdateDailyActionPlanArgs = {
  input: MutateDailyActionPlanInput;
};


export type MutationCreateDistributionCentreArgs = {
  input: CreateDistributionCentreInput;
};


export type MutationUpdateDistributionCentreArgs = {
  input: MutateDistributionCentreInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationUpdateProductArgs = {
  input: MutateProductInput;
};


export type MutationCreateVolunteerActionProductArgs = {
  input: CreateVolunteerActionProductInput;
};


export type MutationCreateVolunteerArgs = {
  input: CreateVolunteerInput;
};


export type MutationUpdateVolunteerArgs = {
  input: MutateVolunteerInput;
};


export type MutationCreateVolunteerActionArgs = {
  input: CreateVolunteerActionInput;
};


export type MutationUpdateVolunteerActionArgs = {
  input: MutateVolunteerActionInput;
};


export type MutationCreateRecipientArgs = {
  input: CreateRecipientInput;
};


export type MutationUpdateRecipientArgs = {
  input: MutateRecipientInput;
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
  id: Scalars['ID'];
  label: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  /** @oneToMany(field: 'product', key: 'productId') */
  volunteerActionProducts?: Maybe<Array<Maybe<VolunteerActionProduct>>>;
  /** @manyToOne(field: 'products', key: 'distributionCentreId') */
  distributionCentre?: Maybe<DistributionCentre>;
};


/** @model(delete: false) */
export type ProductVolunteerActionProductsArgs = {
  filter?: Maybe<VolunteerActionProductFilter>;
};

export type ProductFilter = {
  id?: Maybe<IdInput>;
  label?: Maybe<StringInput>;
  description?: Maybe<StringInput>;
  distributionCentreId?: Maybe<IdInput>;
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
  getDailyActionPlan?: Maybe<DailyActionPlan>;
  findDailyActionPlans: DailyActionPlanResultList;
  getDistributionCentre?: Maybe<DistributionCentre>;
  findDistributionCentres: DistributionCentreResultList;
  getProduct?: Maybe<Product>;
  findProducts: ProductResultList;
  getVolunteerActionProduct?: Maybe<VolunteerActionProduct>;
  findVolunteerActionProducts: VolunteerActionProductResultList;
  getVolunteer?: Maybe<Volunteer>;
  findVolunteers: VolunteerResultList;
  getVolunteerAction?: Maybe<VolunteerAction>;
  findVolunteerActions: VolunteerActionResultList;
  getRecipient?: Maybe<Recipient>;
  findRecipients: RecipientResultList;
};


export type QueryGetDailyActionPlanArgs = {
  id: Scalars['ID'];
};


export type QueryFindDailyActionPlansArgs = {
  filter?: Maybe<DailyActionPlanFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetDistributionCentreArgs = {
  id: Scalars['ID'];
};


export type QueryFindDistributionCentresArgs = {
  filter?: Maybe<DistributionCentreFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetProductArgs = {
  id: Scalars['ID'];
};


export type QueryFindProductsArgs = {
  filter?: Maybe<ProductFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetVolunteerActionProductArgs = {
  id: Scalars['ID'];
};


export type QueryFindVolunteerActionProductsArgs = {
  filter?: Maybe<VolunteerActionProductFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetVolunteerArgs = {
  id: Scalars['ID'];
};


export type QueryFindVolunteersArgs = {
  filter?: Maybe<VolunteerFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetVolunteerActionArgs = {
  id: Scalars['ID'];
};


export type QueryFindVolunteerActionsArgs = {
  filter?: Maybe<VolunteerActionFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetRecipientArgs = {
  id: Scalars['ID'];
};


export type QueryFindRecipientsArgs = {
  filter?: Maybe<RecipientFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};

/** @model(delete: false) */
export type Recipient = Address & {
   __typename?: 'Recipient';
  id: Scalars['ID'];
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
  /** @oneToMany(field: 'recipient', key: 'recipientId') */
  actions?: Maybe<Array<Maybe<VolunteerAction>>>;
};


/** @model(delete: false) */
export type RecipientActionsArgs = {
  filter?: Maybe<VolunteerActionFilter>;
};

export type RecipientFilter = {
  id?: Maybe<IdInput>;
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
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  canDeliver?: Maybe<Scalars['Boolean']>;
  actionsCompleted?: Maybe<Scalars['Int']>;
  actionsActive?: Maybe<Scalars['Int']>;
  active?: Maybe<Scalars['Boolean']>;
  /** @oneToMany(field: 'volunteer', key: 'volunteerId') */
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
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status?: Maybe<ActionStatus>;
  assignedAt?: Maybe<Scalars['DateTime']>;
  completedAt?: Maybe<Scalars['DateTime']>;
  _createdAt?: Maybe<Scalars['DateTime']>;
  /** @manyToOne(field: 'actions', key: 'volunteerId') */
  volunteer?: Maybe<Volunteer>;
  /** @manyToOne(field: 'actions', key: 'distributionCentreId') */
  distributionCentre?: Maybe<DistributionCentre>;
  /** @oneToMany(field: 'volunteerAction', key: 'volunteerActionId') */
  products?: Maybe<Array<Maybe<VolunteerActionProduct>>>;
  /** @manyToOne(field: 'actions', key: 'recipientId') */
  recipient?: Maybe<Recipient>;
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
  id?: Maybe<IdInput>;
  title?: Maybe<StringInput>;
  description?: Maybe<StringInput>;
  status?: Maybe<StringInput>;
  assignedAt?: Maybe<DateTimeInput>;
  completedAt?: Maybe<DateTimeInput>;
  _createdAt?: Maybe<DateTimeInput>;
  volunteerId?: Maybe<IdInput>;
  distributionCentreId?: Maybe<IdInput>;
  recipientId?: Maybe<IdInput>;
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
  id: Scalars['ID'];
  /** @manyToOne(field: 'volunteerActionProducts', key: 'productId') */
  product?: Maybe<Product>;
  /** @manyToOne(field: 'products', key: 'volunteerActionId') */
  volunteerAction?: Maybe<VolunteerAction>;
};

export type VolunteerActionProductFilter = {
  id?: Maybe<IdInput>;
  productId?: Maybe<IdInput>;
  volunteerActionId?: Maybe<IdInput>;
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
  id?: Maybe<IdInput>;
  firstName?: Maybe<StringInput>;
  lastName?: Maybe<StringInput>;
  email?: Maybe<StringInput>;
  username?: Maybe<StringInput>;
  address1?: Maybe<StringInput>;
  address2?: Maybe<StringInput>;
  city?: Maybe<StringInput>;
  postcode?: Maybe<IntInput>;
  dateOfBirth?: Maybe<DateTimeInput>;
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

export type DailyActionPlanFieldsFragment = (
  { __typename?: 'DailyActionPlan' }
  & Pick<DailyActionPlan, 'id' | 'owner' | 'date' | 'numberOfCasesCreated' | 'numberOfVolunteersAssigned' | 'numberOfRecipients'>
);

export type DailyActionPlanExpandedFieldsFragment = (
  { __typename?: 'DailyActionPlan' }
  & Pick<DailyActionPlan, 'id' | 'owner' | 'date' | 'numberOfCasesCreated' | 'numberOfVolunteersAssigned' | 'numberOfRecipients'>
);

export type DistributionCentreFieldsFragment = (
  { __typename?: 'DistributionCentre' }
  & Pick<DistributionCentre, 'id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long'>
);

export type DistributionCentreExpandedFieldsFragment = (
  { __typename?: 'DistributionCentre' }
  & Pick<DistributionCentre, 'id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long'>
  & { products?: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'label' | 'description'>
  )>>>, actions: Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'assignedAt' | 'completedAt' | '_createdAt'>
  )>> }
);

export type ProductFieldsFragment = (
  { __typename?: 'Product' }
  & Pick<Product, 'id' | 'label' | 'description'>
);

export type ProductExpandedFieldsFragment = (
  { __typename?: 'Product' }
  & Pick<Product, 'id' | 'label' | 'description'>
  & { volunteerActionProducts?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & Pick<VolunteerActionProduct, 'id'>
  )>>>, distributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & Pick<DistributionCentre, 'id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long'>
  )> }
);

export type VolunteerActionProductFieldsFragment = (
  { __typename?: 'VolunteerActionProduct' }
  & Pick<VolunteerActionProduct, 'id'>
);

export type VolunteerActionProductExpandedFieldsFragment = (
  { __typename?: 'VolunteerActionProduct' }
  & Pick<VolunteerActionProduct, 'id'>
  & { product?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'label' | 'description'>
  )>, volunteerAction?: Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'assignedAt' | 'completedAt' | '_createdAt'>
  )> }
);

export type VolunteerActionFieldsFragment = (
  { __typename?: 'VolunteerAction' }
  & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'assignedAt' | 'completedAt' | '_createdAt'>
);

export type VolunteerActionExpandedFieldsFragment = (
  { __typename?: 'VolunteerAction' }
  & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'assignedAt' | 'completedAt' | '_createdAt'>
  & { volunteer?: Maybe<(
    { __typename?: 'Volunteer' }
    & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'postcode' | 'dateOfBirth' | 'canDeliver' | 'actionsCompleted' | 'actionsActive' | 'active'>
  )>, distributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & Pick<DistributionCentre, 'id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long'>
  )>, products?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & Pick<VolunteerActionProduct, 'id'>
  )>>>, recipient?: Maybe<(
    { __typename?: 'Recipient' }
    & Pick<Recipient, 'id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'lat' | 'long' | 'actionsCompleted' | 'deliveryDays' | 'prefferedProducts'>
  )> }
);

export type VolunteerFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'postcode' | 'dateOfBirth' | 'canDeliver' | 'actionsCompleted' | 'actionsActive' | 'active'>
);

export type VolunteerExpandedFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'postcode' | 'dateOfBirth' | 'canDeliver' | 'actionsCompleted' | 'actionsActive' | 'active'>
  & { actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'assignedAt' | 'completedAt' | '_createdAt'>
  )>>> }
);

export type RecipientFieldsFragment = (
  { __typename?: 'Recipient' }
  & Pick<Recipient, 'id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'lat' | 'long' | 'actionsCompleted' | 'deliveryDays' | 'prefferedProducts'>
);

export type RecipientExpandedFieldsFragment = (
  { __typename?: 'Recipient' }
  & Pick<Recipient, 'id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'lat' | 'long' | 'actionsCompleted' | 'deliveryDays' | 'prefferedProducts'>
  & { actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'assignedAt' | 'completedAt' | '_createdAt'>
  )>>> }
);

export type FindDailyActionPlansQueryVariables = {
  filter?: Maybe<DailyActionPlanFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


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

export type GetDailyActionPlanQueryVariables = {
  id: Scalars['ID'];
};


export type GetDailyActionPlanQuery = (
  { __typename?: 'Query' }
  & { getDailyActionPlan?: Maybe<(
    { __typename?: 'DailyActionPlan' }
    & DailyActionPlanExpandedFieldsFragment
  )> }
);

export type FindDistributionCentresQueryVariables = {
  filter?: Maybe<DistributionCentreFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


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

export type GetDistributionCentreQueryVariables = {
  id: Scalars['ID'];
};


export type GetDistributionCentreQuery = (
  { __typename?: 'Query' }
  & { getDistributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & DistributionCentreExpandedFieldsFragment
  )> }
);

export type FindProductsQueryVariables = {
  filter?: Maybe<ProductFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


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

export type GetProductQueryVariables = {
  id: Scalars['ID'];
};


export type GetProductQuery = (
  { __typename?: 'Query' }
  & { getProduct?: Maybe<(
    { __typename?: 'Product' }
    & ProductExpandedFieldsFragment
  )> }
);

export type FindVolunteerActionProductsQueryVariables = {
  filter?: Maybe<VolunteerActionProductFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


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

export type GetVolunteerActionProductQueryVariables = {
  id: Scalars['ID'];
};


export type GetVolunteerActionProductQuery = (
  { __typename?: 'Query' }
  & { getVolunteerActionProduct?: Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & VolunteerActionProductExpandedFieldsFragment
  )> }
);

export type FindVolunteerActionsQueryVariables = {
  filter?: Maybe<VolunteerActionFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


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

export type GetVolunteerActionQueryVariables = {
  id: Scalars['ID'];
};


export type GetVolunteerActionQuery = (
  { __typename?: 'Query' }
  & { getVolunteerAction?: Maybe<(
    { __typename?: 'VolunteerAction' }
    & VolunteerActionExpandedFieldsFragment
  )> }
);

export type FindVolunteersQueryVariables = {
  filter?: Maybe<VolunteerFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


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

export type GetVolunteerQueryVariables = {
  id: Scalars['ID'];
};


export type GetVolunteerQuery = (
  { __typename?: 'Query' }
  & { getVolunteer?: Maybe<(
    { __typename?: 'Volunteer' }
    & VolunteerExpandedFieldsFragment
  )> }
);

export type FindRecipientsQueryVariables = {
  filter?: Maybe<RecipientFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


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

export type GetRecipientQueryVariables = {
  id: Scalars['ID'];
};


export type GetRecipientQuery = (
  { __typename?: 'Query' }
  & { getRecipient?: Maybe<(
    { __typename?: 'Recipient' }
    & RecipientExpandedFieldsFragment
  )> }
);

export type CreateDailyActionPlanMutationVariables = {
  input: CreateDailyActionPlanInput;
};


export type CreateDailyActionPlanMutation = (
  { __typename?: 'Mutation' }
  & { createDailyActionPlan?: Maybe<(
    { __typename?: 'DailyActionPlan' }
    & DailyActionPlanFieldsFragment
  )> }
);

export type UpdateDailyActionPlanMutationVariables = {
  input: MutateDailyActionPlanInput;
};


export type UpdateDailyActionPlanMutation = (
  { __typename?: 'Mutation' }
  & { updateDailyActionPlan?: Maybe<(
    { __typename?: 'DailyActionPlan' }
    & DailyActionPlanFieldsFragment
  )> }
);

export type CreateDistributionCentreMutationVariables = {
  input: CreateDistributionCentreInput;
};


export type CreateDistributionCentreMutation = (
  { __typename?: 'Mutation' }
  & { createDistributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & DistributionCentreFieldsFragment
  )> }
);

export type UpdateDistributionCentreMutationVariables = {
  input: MutateDistributionCentreInput;
};


export type UpdateDistributionCentreMutation = (
  { __typename?: 'Mutation' }
  & { updateDistributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & DistributionCentreFieldsFragment
  )> }
);

export type CreateProductMutationVariables = {
  input: CreateProductInput;
};


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct?: Maybe<(
    { __typename?: 'Product' }
    & ProductFieldsFragment
  )> }
);

export type UpdateProductMutationVariables = {
  input: MutateProductInput;
};


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { updateProduct?: Maybe<(
    { __typename?: 'Product' }
    & ProductFieldsFragment
  )> }
);

export type CreateVolunteerActionProductMutationVariables = {
  input: CreateVolunteerActionProductInput;
};


export type CreateVolunteerActionProductMutation = (
  { __typename?: 'Mutation' }
  & { createVolunteerActionProduct?: Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & VolunteerActionProductFieldsFragment
  )> }
);

export type CreateVolunteerActionMutationVariables = {
  input: CreateVolunteerActionInput;
};


export type CreateVolunteerActionMutation = (
  { __typename?: 'Mutation' }
  & { createVolunteerAction?: Maybe<(
    { __typename?: 'VolunteerAction' }
    & VolunteerActionFieldsFragment
  )> }
);

export type UpdateVolunteerActionMutationVariables = {
  input: MutateVolunteerActionInput;
};


export type UpdateVolunteerActionMutation = (
  { __typename?: 'Mutation' }
  & { updateVolunteerAction?: Maybe<(
    { __typename?: 'VolunteerAction' }
    & VolunteerActionFieldsFragment
  )> }
);

export type CreateVolunteerMutationVariables = {
  input: CreateVolunteerInput;
};


export type CreateVolunteerMutation = (
  { __typename?: 'Mutation' }
  & { createVolunteer?: Maybe<(
    { __typename?: 'Volunteer' }
    & VolunteerFieldsFragment
  )> }
);

export type UpdateVolunteerMutationVariables = {
  input: MutateVolunteerInput;
};


export type UpdateVolunteerMutation = (
  { __typename?: 'Mutation' }
  & { updateVolunteer?: Maybe<(
    { __typename?: 'Volunteer' }
    & VolunteerFieldsFragment
  )> }
);

export type CreateRecipientMutationVariables = {
  input: CreateRecipientInput;
};


export type CreateRecipientMutation = (
  { __typename?: 'Mutation' }
  & { createRecipient?: Maybe<(
    { __typename?: 'Recipient' }
    & RecipientFieldsFragment
  )> }
);

export type UpdateRecipientMutationVariables = {
  input: MutateRecipientInput;
};


export type UpdateRecipientMutation = (
  { __typename?: 'Mutation' }
  & { updateRecipient?: Maybe<(
    { __typename?: 'Recipient' }
    & RecipientFieldsFragment
  )> }
);

export type FindActiveVolunteerQueryVariables = {
  username: Scalars['String'];
};


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

export type FindMyVolunteerActionsQueryVariables = {
  volunteerId: Scalars['ID'];
  status?: Maybe<Scalars['String']>;
};


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

export const DailyActionPlanFieldsFragmentDoc = gql`
    fragment DailyActionPlanFields on DailyActionPlan {
  id
  owner
  date
  numberOfCasesCreated
  numberOfVolunteersAssigned
  numberOfRecipients
}
    `;
export const DailyActionPlanExpandedFieldsFragmentDoc = gql`
    fragment DailyActionPlanExpandedFields on DailyActionPlan {
  id
  owner
  date
  numberOfCasesCreated
  numberOfVolunteersAssigned
  numberOfRecipients
}
    `;
export const DistributionCentreFieldsFragmentDoc = gql`
    fragment DistributionCentreFields on DistributionCentre {
  id
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
  id
  name
  address1
  address2
  city
  postcode
  lat
  long
  products {
    id
    label
    description
  }
  actions {
    id
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
  id
  label
  description
}
    `;
export const ProductExpandedFieldsFragmentDoc = gql`
    fragment ProductExpandedFields on Product {
  id
  label
  description
  volunteerActionProducts {
    id
  }
  distributionCentre {
    id
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
  id
}
    `;
export const VolunteerActionProductExpandedFieldsFragmentDoc = gql`
    fragment VolunteerActionProductExpandedFields on VolunteerActionProduct {
  id
  product {
    id
    label
    description
  }
  volunteerAction {
    id
    title
    description
    status
    assignedAt
    completedAt
    _createdAt
  }
}
    `;
export const VolunteerActionFieldsFragmentDoc = gql`
    fragment VolunteerActionFields on VolunteerAction {
  id
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
  id
  title
  description
  status
  assignedAt
  completedAt
  _createdAt
  volunteer {
    id
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
  distributionCentre {
    id
    name
    address1
    address2
    city
    postcode
    lat
    long
  }
  products {
    id
  }
  recipient {
    id
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
}
    `;
export const VolunteerFieldsFragmentDoc = gql`
    fragment VolunteerFields on Volunteer {
  id
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
  id
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
    id
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
  id
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
  id
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
    id
    title
    description
    status
    assignedAt
    completedAt
    _createdAt
  }
}
    `;
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
export function useFindDailyActionPlansQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindDailyActionPlansQuery, FindDailyActionPlansQueryVariables>) {
        return ApolloReactHooks.useQuery<FindDailyActionPlansQuery, FindDailyActionPlansQueryVariables>(FindDailyActionPlansDocument, baseOptions);
      }
export function useFindDailyActionPlansLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindDailyActionPlansQuery, FindDailyActionPlansQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindDailyActionPlansQuery, FindDailyActionPlansQueryVariables>(FindDailyActionPlansDocument, baseOptions);
        }
export type FindDailyActionPlansQueryHookResult = ReturnType<typeof useFindDailyActionPlansQuery>;
export type FindDailyActionPlansLazyQueryHookResult = ReturnType<typeof useFindDailyActionPlansLazyQuery>;
export type FindDailyActionPlansQueryResult = ApolloReactCommon.QueryResult<FindDailyActionPlansQuery, FindDailyActionPlansQueryVariables>;
export const GetDailyActionPlanDocument = gql`
    query getDailyActionPlan($id: ID!) {
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
export function useGetDailyActionPlanQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDailyActionPlanQuery, GetDailyActionPlanQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDailyActionPlanQuery, GetDailyActionPlanQueryVariables>(GetDailyActionPlanDocument, baseOptions);
      }
export function useGetDailyActionPlanLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDailyActionPlanQuery, GetDailyActionPlanQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDailyActionPlanQuery, GetDailyActionPlanQueryVariables>(GetDailyActionPlanDocument, baseOptions);
        }
export type GetDailyActionPlanQueryHookResult = ReturnType<typeof useGetDailyActionPlanQuery>;
export type GetDailyActionPlanLazyQueryHookResult = ReturnType<typeof useGetDailyActionPlanLazyQuery>;
export type GetDailyActionPlanQueryResult = ApolloReactCommon.QueryResult<GetDailyActionPlanQuery, GetDailyActionPlanQueryVariables>;
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
export function useFindDistributionCentresQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindDistributionCentresQuery, FindDistributionCentresQueryVariables>) {
        return ApolloReactHooks.useQuery<FindDistributionCentresQuery, FindDistributionCentresQueryVariables>(FindDistributionCentresDocument, baseOptions);
      }
export function useFindDistributionCentresLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindDistributionCentresQuery, FindDistributionCentresQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindDistributionCentresQuery, FindDistributionCentresQueryVariables>(FindDistributionCentresDocument, baseOptions);
        }
export type FindDistributionCentresQueryHookResult = ReturnType<typeof useFindDistributionCentresQuery>;
export type FindDistributionCentresLazyQueryHookResult = ReturnType<typeof useFindDistributionCentresLazyQuery>;
export type FindDistributionCentresQueryResult = ApolloReactCommon.QueryResult<FindDistributionCentresQuery, FindDistributionCentresQueryVariables>;
export const GetDistributionCentreDocument = gql`
    query getDistributionCentre($id: ID!) {
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
export function useGetDistributionCentreQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDistributionCentreQuery, GetDistributionCentreQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDistributionCentreQuery, GetDistributionCentreQueryVariables>(GetDistributionCentreDocument, baseOptions);
      }
export function useGetDistributionCentreLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDistributionCentreQuery, GetDistributionCentreQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDistributionCentreQuery, GetDistributionCentreQueryVariables>(GetDistributionCentreDocument, baseOptions);
        }
export type GetDistributionCentreQueryHookResult = ReturnType<typeof useGetDistributionCentreQuery>;
export type GetDistributionCentreLazyQueryHookResult = ReturnType<typeof useGetDistributionCentreLazyQuery>;
export type GetDistributionCentreQueryResult = ApolloReactCommon.QueryResult<GetDistributionCentreQuery, GetDistributionCentreQueryVariables>;
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
export function useFindProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindProductsQuery, FindProductsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindProductsQuery, FindProductsQueryVariables>(FindProductsDocument, baseOptions);
      }
export function useFindProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindProductsQuery, FindProductsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindProductsQuery, FindProductsQueryVariables>(FindProductsDocument, baseOptions);
        }
export type FindProductsQueryHookResult = ReturnType<typeof useFindProductsQuery>;
export type FindProductsLazyQueryHookResult = ReturnType<typeof useFindProductsLazyQuery>;
export type FindProductsQueryResult = ApolloReactCommon.QueryResult<FindProductsQuery, FindProductsQueryVariables>;
export const GetProductDocument = gql`
    query getProduct($id: ID!) {
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
export function useGetProductQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
      }
export function useGetProductLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = ApolloReactCommon.QueryResult<GetProductQuery, GetProductQueryVariables>;
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
export function useFindVolunteerActionProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindVolunteerActionProductsQuery, FindVolunteerActionProductsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindVolunteerActionProductsQuery, FindVolunteerActionProductsQueryVariables>(FindVolunteerActionProductsDocument, baseOptions);
      }
export function useFindVolunteerActionProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindVolunteerActionProductsQuery, FindVolunteerActionProductsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindVolunteerActionProductsQuery, FindVolunteerActionProductsQueryVariables>(FindVolunteerActionProductsDocument, baseOptions);
        }
export type FindVolunteerActionProductsQueryHookResult = ReturnType<typeof useFindVolunteerActionProductsQuery>;
export type FindVolunteerActionProductsLazyQueryHookResult = ReturnType<typeof useFindVolunteerActionProductsLazyQuery>;
export type FindVolunteerActionProductsQueryResult = ApolloReactCommon.QueryResult<FindVolunteerActionProductsQuery, FindVolunteerActionProductsQueryVariables>;
export const GetVolunteerActionProductDocument = gql`
    query getVolunteerActionProduct($id: ID!) {
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
export function useGetVolunteerActionProductQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetVolunteerActionProductQuery, GetVolunteerActionProductQueryVariables>) {
        return ApolloReactHooks.useQuery<GetVolunteerActionProductQuery, GetVolunteerActionProductQueryVariables>(GetVolunteerActionProductDocument, baseOptions);
      }
export function useGetVolunteerActionProductLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetVolunteerActionProductQuery, GetVolunteerActionProductQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetVolunteerActionProductQuery, GetVolunteerActionProductQueryVariables>(GetVolunteerActionProductDocument, baseOptions);
        }
export type GetVolunteerActionProductQueryHookResult = ReturnType<typeof useGetVolunteerActionProductQuery>;
export type GetVolunteerActionProductLazyQueryHookResult = ReturnType<typeof useGetVolunteerActionProductLazyQuery>;
export type GetVolunteerActionProductQueryResult = ApolloReactCommon.QueryResult<GetVolunteerActionProductQuery, GetVolunteerActionProductQueryVariables>;
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
export function useFindVolunteerActionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindVolunteerActionsQuery, FindVolunteerActionsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindVolunteerActionsQuery, FindVolunteerActionsQueryVariables>(FindVolunteerActionsDocument, baseOptions);
      }
export function useFindVolunteerActionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindVolunteerActionsQuery, FindVolunteerActionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindVolunteerActionsQuery, FindVolunteerActionsQueryVariables>(FindVolunteerActionsDocument, baseOptions);
        }
export type FindVolunteerActionsQueryHookResult = ReturnType<typeof useFindVolunteerActionsQuery>;
export type FindVolunteerActionsLazyQueryHookResult = ReturnType<typeof useFindVolunteerActionsLazyQuery>;
export type FindVolunteerActionsQueryResult = ApolloReactCommon.QueryResult<FindVolunteerActionsQuery, FindVolunteerActionsQueryVariables>;
export const GetVolunteerActionDocument = gql`
    query getVolunteerAction($id: ID!) {
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
export function useGetVolunteerActionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetVolunteerActionQuery, GetVolunteerActionQueryVariables>) {
        return ApolloReactHooks.useQuery<GetVolunteerActionQuery, GetVolunteerActionQueryVariables>(GetVolunteerActionDocument, baseOptions);
      }
export function useGetVolunteerActionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetVolunteerActionQuery, GetVolunteerActionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetVolunteerActionQuery, GetVolunteerActionQueryVariables>(GetVolunteerActionDocument, baseOptions);
        }
export type GetVolunteerActionQueryHookResult = ReturnType<typeof useGetVolunteerActionQuery>;
export type GetVolunteerActionLazyQueryHookResult = ReturnType<typeof useGetVolunteerActionLazyQuery>;
export type GetVolunteerActionQueryResult = ApolloReactCommon.QueryResult<GetVolunteerActionQuery, GetVolunteerActionQueryVariables>;
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
export function useFindVolunteersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindVolunteersQuery, FindVolunteersQueryVariables>) {
        return ApolloReactHooks.useQuery<FindVolunteersQuery, FindVolunteersQueryVariables>(FindVolunteersDocument, baseOptions);
      }
export function useFindVolunteersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindVolunteersQuery, FindVolunteersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindVolunteersQuery, FindVolunteersQueryVariables>(FindVolunteersDocument, baseOptions);
        }
export type FindVolunteersQueryHookResult = ReturnType<typeof useFindVolunteersQuery>;
export type FindVolunteersLazyQueryHookResult = ReturnType<typeof useFindVolunteersLazyQuery>;
export type FindVolunteersQueryResult = ApolloReactCommon.QueryResult<FindVolunteersQuery, FindVolunteersQueryVariables>;
export const GetVolunteerDocument = gql`
    query getVolunteer($id: ID!) {
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
export function useGetVolunteerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetVolunteerQuery, GetVolunteerQueryVariables>) {
        return ApolloReactHooks.useQuery<GetVolunteerQuery, GetVolunteerQueryVariables>(GetVolunteerDocument, baseOptions);
      }
export function useGetVolunteerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetVolunteerQuery, GetVolunteerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetVolunteerQuery, GetVolunteerQueryVariables>(GetVolunteerDocument, baseOptions);
        }
export type GetVolunteerQueryHookResult = ReturnType<typeof useGetVolunteerQuery>;
export type GetVolunteerLazyQueryHookResult = ReturnType<typeof useGetVolunteerLazyQuery>;
export type GetVolunteerQueryResult = ApolloReactCommon.QueryResult<GetVolunteerQuery, GetVolunteerQueryVariables>;
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
export function useFindRecipientsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindRecipientsQuery, FindRecipientsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindRecipientsQuery, FindRecipientsQueryVariables>(FindRecipientsDocument, baseOptions);
      }
export function useFindRecipientsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindRecipientsQuery, FindRecipientsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindRecipientsQuery, FindRecipientsQueryVariables>(FindRecipientsDocument, baseOptions);
        }
export type FindRecipientsQueryHookResult = ReturnType<typeof useFindRecipientsQuery>;
export type FindRecipientsLazyQueryHookResult = ReturnType<typeof useFindRecipientsLazyQuery>;
export type FindRecipientsQueryResult = ApolloReactCommon.QueryResult<FindRecipientsQuery, FindRecipientsQueryVariables>;
export const GetRecipientDocument = gql`
    query getRecipient($id: ID!) {
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
export function useGetRecipientQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRecipientQuery, GetRecipientQueryVariables>) {
        return ApolloReactHooks.useQuery<GetRecipientQuery, GetRecipientQueryVariables>(GetRecipientDocument, baseOptions);
      }
export function useGetRecipientLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRecipientQuery, GetRecipientQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetRecipientQuery, GetRecipientQueryVariables>(GetRecipientDocument, baseOptions);
        }
export type GetRecipientQueryHookResult = ReturnType<typeof useGetRecipientQuery>;
export type GetRecipientLazyQueryHookResult = ReturnType<typeof useGetRecipientLazyQuery>;
export type GetRecipientQueryResult = ApolloReactCommon.QueryResult<GetRecipientQuery, GetRecipientQueryVariables>;
export const CreateDailyActionPlanDocument = gql`
    mutation createDailyActionPlan($input: CreateDailyActionPlanInput!) {
  createDailyActionPlan(input: $input) {
    ...DailyActionPlanFields
  }
}
    ${DailyActionPlanFieldsFragmentDoc}`;
export type CreateDailyActionPlanMutationFn = ApolloReactCommon.MutationFunction<CreateDailyActionPlanMutation, CreateDailyActionPlanMutationVariables>;

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
export function useCreateDailyActionPlanMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDailyActionPlanMutation, CreateDailyActionPlanMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateDailyActionPlanMutation, CreateDailyActionPlanMutationVariables>(CreateDailyActionPlanDocument, baseOptions);
      }
export type CreateDailyActionPlanMutationHookResult = ReturnType<typeof useCreateDailyActionPlanMutation>;
export type CreateDailyActionPlanMutationResult = ApolloReactCommon.MutationResult<CreateDailyActionPlanMutation>;
export type CreateDailyActionPlanMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDailyActionPlanMutation, CreateDailyActionPlanMutationVariables>;
export const UpdateDailyActionPlanDocument = gql`
    mutation updateDailyActionPlan($input: MutateDailyActionPlanInput!) {
  updateDailyActionPlan(input: $input) {
    ...DailyActionPlanFields
  }
}
    ${DailyActionPlanFieldsFragmentDoc}`;
export type UpdateDailyActionPlanMutationFn = ApolloReactCommon.MutationFunction<UpdateDailyActionPlanMutation, UpdateDailyActionPlanMutationVariables>;

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
export function useUpdateDailyActionPlanMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateDailyActionPlanMutation, UpdateDailyActionPlanMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateDailyActionPlanMutation, UpdateDailyActionPlanMutationVariables>(UpdateDailyActionPlanDocument, baseOptions);
      }
export type UpdateDailyActionPlanMutationHookResult = ReturnType<typeof useUpdateDailyActionPlanMutation>;
export type UpdateDailyActionPlanMutationResult = ApolloReactCommon.MutationResult<UpdateDailyActionPlanMutation>;
export type UpdateDailyActionPlanMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateDailyActionPlanMutation, UpdateDailyActionPlanMutationVariables>;
export const CreateDistributionCentreDocument = gql`
    mutation createDistributionCentre($input: CreateDistributionCentreInput!) {
  createDistributionCentre(input: $input) {
    ...DistributionCentreFields
  }
}
    ${DistributionCentreFieldsFragmentDoc}`;
export type CreateDistributionCentreMutationFn = ApolloReactCommon.MutationFunction<CreateDistributionCentreMutation, CreateDistributionCentreMutationVariables>;

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
export function useCreateDistributionCentreMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDistributionCentreMutation, CreateDistributionCentreMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateDistributionCentreMutation, CreateDistributionCentreMutationVariables>(CreateDistributionCentreDocument, baseOptions);
      }
export type CreateDistributionCentreMutationHookResult = ReturnType<typeof useCreateDistributionCentreMutation>;
export type CreateDistributionCentreMutationResult = ApolloReactCommon.MutationResult<CreateDistributionCentreMutation>;
export type CreateDistributionCentreMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDistributionCentreMutation, CreateDistributionCentreMutationVariables>;
export const UpdateDistributionCentreDocument = gql`
    mutation updateDistributionCentre($input: MutateDistributionCentreInput!) {
  updateDistributionCentre(input: $input) {
    ...DistributionCentreFields
  }
}
    ${DistributionCentreFieldsFragmentDoc}`;
export type UpdateDistributionCentreMutationFn = ApolloReactCommon.MutationFunction<UpdateDistributionCentreMutation, UpdateDistributionCentreMutationVariables>;

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
export function useUpdateDistributionCentreMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateDistributionCentreMutation, UpdateDistributionCentreMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateDistributionCentreMutation, UpdateDistributionCentreMutationVariables>(UpdateDistributionCentreDocument, baseOptions);
      }
export type UpdateDistributionCentreMutationHookResult = ReturnType<typeof useUpdateDistributionCentreMutation>;
export type UpdateDistributionCentreMutationResult = ApolloReactCommon.MutationResult<UpdateDistributionCentreMutation>;
export type UpdateDistributionCentreMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateDistributionCentreMutation, UpdateDistributionCentreMutationVariables>;
export const CreateProductDocument = gql`
    mutation createProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type CreateProductMutationFn = ApolloReactCommon.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

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
export function useCreateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, baseOptions);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = ApolloReactCommon.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation updateProduct($input: MutateProductInput!) {
  updateProduct(input: $input) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type UpdateProductMutationFn = ApolloReactCommon.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

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
export function useUpdateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, baseOptions);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = ApolloReactCommon.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const CreateVolunteerActionProductDocument = gql`
    mutation createVolunteerActionProduct($input: CreateVolunteerActionProductInput!) {
  createVolunteerActionProduct(input: $input) {
    ...VolunteerActionProductFields
  }
}
    ${VolunteerActionProductFieldsFragmentDoc}`;
export type CreateVolunteerActionProductMutationFn = ApolloReactCommon.MutationFunction<CreateVolunteerActionProductMutation, CreateVolunteerActionProductMutationVariables>;

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
export function useCreateVolunteerActionProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateVolunteerActionProductMutation, CreateVolunteerActionProductMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateVolunteerActionProductMutation, CreateVolunteerActionProductMutationVariables>(CreateVolunteerActionProductDocument, baseOptions);
      }
export type CreateVolunteerActionProductMutationHookResult = ReturnType<typeof useCreateVolunteerActionProductMutation>;
export type CreateVolunteerActionProductMutationResult = ApolloReactCommon.MutationResult<CreateVolunteerActionProductMutation>;
export type CreateVolunteerActionProductMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateVolunteerActionProductMutation, CreateVolunteerActionProductMutationVariables>;
export const CreateVolunteerActionDocument = gql`
    mutation createVolunteerAction($input: CreateVolunteerActionInput!) {
  createVolunteerAction(input: $input) {
    ...VolunteerActionFields
  }
}
    ${VolunteerActionFieldsFragmentDoc}`;
export type CreateVolunteerActionMutationFn = ApolloReactCommon.MutationFunction<CreateVolunteerActionMutation, CreateVolunteerActionMutationVariables>;

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
export function useCreateVolunteerActionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateVolunteerActionMutation, CreateVolunteerActionMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateVolunteerActionMutation, CreateVolunteerActionMutationVariables>(CreateVolunteerActionDocument, baseOptions);
      }
export type CreateVolunteerActionMutationHookResult = ReturnType<typeof useCreateVolunteerActionMutation>;
export type CreateVolunteerActionMutationResult = ApolloReactCommon.MutationResult<CreateVolunteerActionMutation>;
export type CreateVolunteerActionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateVolunteerActionMutation, CreateVolunteerActionMutationVariables>;
export const UpdateVolunteerActionDocument = gql`
    mutation updateVolunteerAction($input: MutateVolunteerActionInput!) {
  updateVolunteerAction(input: $input) {
    ...VolunteerActionFields
  }
}
    ${VolunteerActionFieldsFragmentDoc}`;
export type UpdateVolunteerActionMutationFn = ApolloReactCommon.MutationFunction<UpdateVolunteerActionMutation, UpdateVolunteerActionMutationVariables>;

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
export function useUpdateVolunteerActionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateVolunteerActionMutation, UpdateVolunteerActionMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateVolunteerActionMutation, UpdateVolunteerActionMutationVariables>(UpdateVolunteerActionDocument, baseOptions);
      }
export type UpdateVolunteerActionMutationHookResult = ReturnType<typeof useUpdateVolunteerActionMutation>;
export type UpdateVolunteerActionMutationResult = ApolloReactCommon.MutationResult<UpdateVolunteerActionMutation>;
export type UpdateVolunteerActionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateVolunteerActionMutation, UpdateVolunteerActionMutationVariables>;
export const CreateVolunteerDocument = gql`
    mutation createVolunteer($input: CreateVolunteerInput!) {
  createVolunteer(input: $input) {
    ...VolunteerFields
  }
}
    ${VolunteerFieldsFragmentDoc}`;
export type CreateVolunteerMutationFn = ApolloReactCommon.MutationFunction<CreateVolunteerMutation, CreateVolunteerMutationVariables>;

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
export function useCreateVolunteerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateVolunteerMutation, CreateVolunteerMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateVolunteerMutation, CreateVolunteerMutationVariables>(CreateVolunteerDocument, baseOptions);
      }
export type CreateVolunteerMutationHookResult = ReturnType<typeof useCreateVolunteerMutation>;
export type CreateVolunteerMutationResult = ApolloReactCommon.MutationResult<CreateVolunteerMutation>;
export type CreateVolunteerMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateVolunteerMutation, CreateVolunteerMutationVariables>;
export const UpdateVolunteerDocument = gql`
    mutation updateVolunteer($input: MutateVolunteerInput!) {
  updateVolunteer(input: $input) {
    ...VolunteerFields
  }
}
    ${VolunteerFieldsFragmentDoc}`;
export type UpdateVolunteerMutationFn = ApolloReactCommon.MutationFunction<UpdateVolunteerMutation, UpdateVolunteerMutationVariables>;

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
export function useUpdateVolunteerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateVolunteerMutation, UpdateVolunteerMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateVolunteerMutation, UpdateVolunteerMutationVariables>(UpdateVolunteerDocument, baseOptions);
      }
export type UpdateVolunteerMutationHookResult = ReturnType<typeof useUpdateVolunteerMutation>;
export type UpdateVolunteerMutationResult = ApolloReactCommon.MutationResult<UpdateVolunteerMutation>;
export type UpdateVolunteerMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateVolunteerMutation, UpdateVolunteerMutationVariables>;
export const CreateRecipientDocument = gql`
    mutation createRecipient($input: CreateRecipientInput!) {
  createRecipient(input: $input) {
    ...RecipientFields
  }
}
    ${RecipientFieldsFragmentDoc}`;
export type CreateRecipientMutationFn = ApolloReactCommon.MutationFunction<CreateRecipientMutation, CreateRecipientMutationVariables>;

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
export function useCreateRecipientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRecipientMutation, CreateRecipientMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateRecipientMutation, CreateRecipientMutationVariables>(CreateRecipientDocument, baseOptions);
      }
export type CreateRecipientMutationHookResult = ReturnType<typeof useCreateRecipientMutation>;
export type CreateRecipientMutationResult = ApolloReactCommon.MutationResult<CreateRecipientMutation>;
export type CreateRecipientMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRecipientMutation, CreateRecipientMutationVariables>;
export const UpdateRecipientDocument = gql`
    mutation updateRecipient($input: MutateRecipientInput!) {
  updateRecipient(input: $input) {
    ...RecipientFields
  }
}
    ${RecipientFieldsFragmentDoc}`;
export type UpdateRecipientMutationFn = ApolloReactCommon.MutationFunction<UpdateRecipientMutation, UpdateRecipientMutationVariables>;

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
export function useUpdateRecipientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRecipientMutation, UpdateRecipientMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateRecipientMutation, UpdateRecipientMutationVariables>(UpdateRecipientDocument, baseOptions);
      }
export type UpdateRecipientMutationHookResult = ReturnType<typeof useUpdateRecipientMutation>;
export type UpdateRecipientMutationResult = ApolloReactCommon.MutationResult<UpdateRecipientMutation>;
export type UpdateRecipientMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateRecipientMutation, UpdateRecipientMutationVariables>;
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
export function useFindActiveVolunteerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindActiveVolunteerQuery, FindActiveVolunteerQueryVariables>) {
        return ApolloReactHooks.useQuery<FindActiveVolunteerQuery, FindActiveVolunteerQueryVariables>(FindActiveVolunteerDocument, baseOptions);
      }
export function useFindActiveVolunteerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindActiveVolunteerQuery, FindActiveVolunteerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindActiveVolunteerQuery, FindActiveVolunteerQueryVariables>(FindActiveVolunteerDocument, baseOptions);
        }
export type FindActiveVolunteerQueryHookResult = ReturnType<typeof useFindActiveVolunteerQuery>;
export type FindActiveVolunteerLazyQueryHookResult = ReturnType<typeof useFindActiveVolunteerLazyQuery>;
export type FindActiveVolunteerQueryResult = ApolloReactCommon.QueryResult<FindActiveVolunteerQuery, FindActiveVolunteerQueryVariables>;
export const FindMyVolunteerActionsDocument = gql`
    query findMyVolunteerActions($volunteerId: ID!, $status: String) {
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
export function useFindMyVolunteerActionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindMyVolunteerActionsQuery, FindMyVolunteerActionsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindMyVolunteerActionsQuery, FindMyVolunteerActionsQueryVariables>(FindMyVolunteerActionsDocument, baseOptions);
      }
export function useFindMyVolunteerActionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindMyVolunteerActionsQuery, FindMyVolunteerActionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindMyVolunteerActionsQuery, FindMyVolunteerActionsQueryVariables>(FindMyVolunteerActionsDocument, baseOptions);
        }
export type FindMyVolunteerActionsQueryHookResult = ReturnType<typeof useFindMyVolunteerActionsQuery>;
export type FindMyVolunteerActionsLazyQueryHookResult = ReturnType<typeof useFindMyVolunteerActionsLazyQuery>;
export type FindMyVolunteerActionsQueryResult = ApolloReactCommon.QueryResult<FindMyVolunteerActionsQuery, FindMyVolunteerActionsQueryVariables>;