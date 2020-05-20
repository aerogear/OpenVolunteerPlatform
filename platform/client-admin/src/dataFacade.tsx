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
  JSON: any;
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
};


/**
 * @model
 * @crud.update: false
 * @crud.delete: false
 */
export type DistributionCentre = Address & {
   __typename?: 'DistributionCentre';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['String']>;
  long?: Maybe<Scalars['String']>;
  stockInformation?: Maybe<Scalars['JSON']>;
  /** @oneToMany field: 'distributionCentre', key: 'distributionCentreId' */
  products?: Maybe<Array<Maybe<Product>>>;
  /** @oneToMany field: 'distributionCentre', key: 'distributionCentreId' */
  actions: Array<Maybe<VolunteerAction>>;
  version?: Maybe<Scalars['Int']>;
};

export type DistributionCentreInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['String']>;
  long?: Maybe<Scalars['String']>;
  stockInformation?: Maybe<Scalars['JSON']>;
  version?: Maybe<Scalars['Int']>;
};


export type Mutation = {
   __typename?: 'Mutation';
  createDistributionCentre: DistributionCentre;
  createProduct: Product;
  updateProduct: Product;
  createVolunteerActionProduct: VolunteerActionProduct;
  createVolunteer: Volunteer;
  updateVolunteer: Volunteer;
  createVolunteerAction: VolunteerAction;
  updateVolunteerAction: VolunteerAction;
  deleteVolunteerAction: VolunteerAction;
  createRecipient: Recipient;
  updateRecipient: Recipient;
};


export type MutationCreateDistributionCentreArgs = {
  input?: Maybe<DistributionCentreInput>;
};


export type MutationCreateProductArgs = {
  input?: Maybe<ProductInput>;
};


export type MutationUpdateProductArgs = {
  input?: Maybe<ProductInput>;
};


export type MutationCreateVolunteerActionProductArgs = {
  input?: Maybe<VolunteerActionProductInput>;
};


export type MutationCreateVolunteerArgs = {
  input?: Maybe<VolunteerInput>;
};


export type MutationUpdateVolunteerArgs = {
  input?: Maybe<VolunteerInput>;
};


export type MutationCreateVolunteerActionArgs = {
  input?: Maybe<VolunteerActionInput>;
};


export type MutationUpdateVolunteerActionArgs = {
  input?: Maybe<VolunteerActionInput>;
};


export type MutationDeleteVolunteerActionArgs = {
  input?: Maybe<VolunteerActionInput>;
};


export type MutationCreateRecipientArgs = {
  input?: Maybe<RecipientInput>;
};


export type MutationUpdateRecipientArgs = {
  input?: Maybe<RecipientInput>;
};

/**
 * @model
 * @crud.delete: false
 */
export type Product = {
   __typename?: 'Product';
  id: Scalars['ID'];
  label: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  /** @oneToMany field: 'product', key: 'productId' */
  volunteerActionProducts?: Maybe<Array<Maybe<VolunteerActionProduct>>>;
  /** @manyToOne field: 'products', key: 'distributionCentreId' */
  distributionCentre?: Maybe<DistributionCentre>;
  version?: Maybe<Scalars['Int']>;
};

export type ProductInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  distributionCentreId?: Maybe<Scalars['ID']>;
  version?: Maybe<Scalars['Int']>;
};

export type Query = {
   __typename?: 'Query';
  findAllDistributionCentres: Array<Maybe<DistributionCentre>>;
  findDistributionCentres: Array<Maybe<DistributionCentre>>;
  findAllProducts: Array<Maybe<Product>>;
  findProducts: Array<Maybe<Product>>;
  findAllVolunteerActionProducts: Array<Maybe<VolunteerActionProduct>>;
  findVolunteerActionProducts: Array<Maybe<VolunteerActionProduct>>;
  findAllVolunteers: Array<Maybe<Volunteer>>;
  findVolunteers: Array<Maybe<Volunteer>>;
  findAllVolunteerActions: Array<Maybe<VolunteerAction>>;
  findVolunteerActions: Array<Maybe<VolunteerAction>>;
  findAllRecipients: Array<Maybe<Recipient>>;
  findRecipients: Array<Maybe<Recipient>>;
};


export type QueryFindAllDistributionCentresArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindDistributionCentresArgs = {
  fields?: Maybe<DistributionCentreInput>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindAllProductsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindProductsArgs = {
  fields?: Maybe<ProductInput>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindAllVolunteerActionProductsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindVolunteerActionProductsArgs = {
  fields?: Maybe<VolunteerActionProductInput>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindAllVolunteersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindVolunteersArgs = {
  fields?: Maybe<VolunteerInput>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindAllVolunteerActionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindVolunteerActionsArgs = {
  fields?: Maybe<VolunteerActionInput>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindAllRecipientsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindRecipientsArgs = {
  fields?: Maybe<RecipientInput>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

/**
 * @model
 * @crud.delete: false
 */
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
  createdAt?: Maybe<Scalars['DateTime']>;
  /**
   * Comma separated list of preferrend products labels.
   * Easier to create volunteer actions when knowing what one really needs. 
   */
  prefferedProducts?: Maybe<Scalars['String']>;
  /** @oneToMany field: 'recipient', key: 'recipientId' */
  actions?: Maybe<Array<Maybe<VolunteerAction>>>;
  version?: Maybe<Scalars['Int']>;
};

export type RecipientInput = {
  id?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  prefferedProducts?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type Subscription = {
   __typename?: 'Subscription';
  newDistributionCentre: DistributionCentre;
  newProduct: Product;
  updatedProduct: Product;
  newVolunteer: Volunteer;
  updatedVolunteer: Volunteer;
  newVolunteerAction: VolunteerAction;
  updatedVolunteerAction: VolunteerAction;
  deletedVolunteerAction: VolunteerAction;
  newRecipient: Recipient;
  updatedRecipient: Recipient;
};


export type SubscriptionNewDistributionCentreArgs = {
  input?: Maybe<DistributionCentreInput>;
};


export type SubscriptionNewProductArgs = {
  input?: Maybe<ProductInput>;
};


export type SubscriptionUpdatedProductArgs = {
  input?: Maybe<ProductInput>;
};


export type SubscriptionNewVolunteerArgs = {
  input?: Maybe<VolunteerInput>;
};


export type SubscriptionUpdatedVolunteerArgs = {
  input?: Maybe<VolunteerInput>;
};


export type SubscriptionNewVolunteerActionArgs = {
  input?: Maybe<VolunteerActionInput>;
};


export type SubscriptionUpdatedVolunteerActionArgs = {
  input?: Maybe<VolunteerActionInput>;
};


export type SubscriptionDeletedVolunteerActionArgs = {
  input?: Maybe<VolunteerActionInput>;
};


export type SubscriptionNewRecipientArgs = {
  input?: Maybe<RecipientInput>;
};


export type SubscriptionUpdatedRecipientArgs = {
  input?: Maybe<RecipientInput>;
};

/**
 * @model
 * @crud.delete: false
 */
export type Volunteer = Address & {
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
  /**
   * This does not work for MongoDB - https://github.com/aerogear/graphback/issues/1241
   * @db.default: false
   */
  canDeliver?: Maybe<Scalars['Boolean']>;
  /** @oneToMany field: 'volunteer', key: 'volunteerId' */
  actions?: Maybe<Array<Maybe<VolunteerAction>>>;
  version?: Maybe<Scalars['Int']>;
};

/**
 * Represents action that is assigned to volunteer
 * @model
 */
export type VolunteerAction = {
   __typename?: 'VolunteerAction';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status?: Maybe<ActionStatus>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** @manyToOne field: 'actions', key: 'volunteerId' */
  volunteer?: Maybe<Volunteer>;
  /** @manyToOne field: 'actions', key: 'distributionCentreId' */
  distributionCentre?: Maybe<DistributionCentre>;
  /** @oneToMany field: 'volunteerAction', key: 'volunteerActionId' */
  products?: Maybe<Array<Maybe<VolunteerActionProduct>>>;
  /** @manyToOne field: 'actions', key: 'recipientId' */
  recipient?: Maybe<Recipient>;
  version?: Maybe<Scalars['Int']>;
};

export type VolunteerActionInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<ActionStatus>;
  createdAt?: Maybe<Scalars['DateTime']>;
  volunteerId?: Maybe<Scalars['ID']>;
  distributionCentreId?: Maybe<Scalars['ID']>;
  recipientId?: Maybe<Scalars['ID']>;
  version?: Maybe<Scalars['Int']>;
};

/**
 * Represents a join model between a volunteer action and product
 * 
 * @model
 * @crud.create: true
 * @crud.update: false
 * @crud.delete: false
 * @crud.subCreate: false
 * @crud.subUpdate: false
 * @crud.subDelete: false
 */
export type VolunteerActionProduct = {
   __typename?: 'VolunteerActionProduct';
  id: Scalars['ID'];
  /** @manyToOne field: 'volunteerActionProducts', key: 'productId' */
  product?: Maybe<Product>;
  /** @manyToOne field: 'products', key: 'volunteerActionId' */
  volunteerAction?: Maybe<VolunteerAction>;
  version?: Maybe<Scalars['Int']>;
};

export type VolunteerActionProductInput = {
  id?: Maybe<Scalars['ID']>;
  productId?: Maybe<Scalars['ID']>;
  volunteerActionId?: Maybe<Scalars['ID']>;
  version?: Maybe<Scalars['Int']>;
};

export type VolunteerInput = {
  id?: Maybe<Scalars['ID']>;
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
  version?: Maybe<Scalars['Int']>;
};

export type DistributionCentreFieldsFragment = (
  { __typename?: 'DistributionCentre' }
  & Pick<DistributionCentre, 'id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long' | 'stockInformation'>
);

export type DistributionCentreExpandedFieldsFragment = (
  { __typename?: 'DistributionCentre' }
  & Pick<DistributionCentre, 'id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long' | 'stockInformation'>
  & { products?: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'label' | 'description'>
  )>>>, actions: Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'createdAt'>
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
    & Pick<DistributionCentre, 'id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long' | 'stockInformation'>
  )> }
);

export type RecipientFieldsFragment = (
  { __typename?: 'Recipient' }
  & Pick<Recipient, 'id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'createdAt' | 'prefferedProducts'>
);

export type RecipientExpandedFieldsFragment = (
  { __typename?: 'Recipient' }
  & Pick<Recipient, 'id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'createdAt' | 'prefferedProducts'>
  & { actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'createdAt'>
  )>>> }
);

export type VolunteerFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'postcode' | 'dateOfBirth' | 'canDeliver'>
);

export type VolunteerActionFieldsFragment = (
  { __typename?: 'VolunteerAction' }
  & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'createdAt'>
);

export type VolunteerActionExpandedFieldsFragment = (
  { __typename?: 'VolunteerAction' }
  & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'createdAt'>
  & { volunteer?: Maybe<(
    { __typename?: 'Volunteer' }
    & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'postcode' | 'dateOfBirth' | 'canDeliver'>
  )>, distributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & Pick<DistributionCentre, 'id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long' | 'stockInformation'>
  )>, products?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & Pick<VolunteerActionProduct, 'id'>
  )>>>, recipient?: Maybe<(
    { __typename?: 'Recipient' }
    & Pick<Recipient, 'id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'createdAt' | 'prefferedProducts'>
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
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'createdAt'>
  )> }
);

export type VolunteerExpandedFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'postcode' | 'dateOfBirth' | 'canDeliver'>
  & { actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'createdAt'>
  )>>> }
);

export type CreateDistributionCentreMutationVariables = {
  input: DistributionCentreInput;
};


export type CreateDistributionCentreMutation = (
  { __typename?: 'Mutation' }
  & { createDistributionCentre: (
    { __typename?: 'DistributionCentre' }
    & DistributionCentreFieldsFragment
  ) }
);

export type CreateProductMutationVariables = {
  input: ProductInput;
};


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'Product' }
    & ProductFieldsFragment
  ) }
);

export type CreateRecipientMutationVariables = {
  input: RecipientInput;
};


export type CreateRecipientMutation = (
  { __typename?: 'Mutation' }
  & { createRecipient: (
    { __typename?: 'Recipient' }
    & RecipientFieldsFragment
  ) }
);

export type CreateVolunteerMutationVariables = {
  input: VolunteerInput;
};


export type CreateVolunteerMutation = (
  { __typename?: 'Mutation' }
  & { createVolunteer: (
    { __typename?: 'Volunteer' }
    & VolunteerFieldsFragment
  ) }
);

export type CreateVolunteerActionMutationVariables = {
  input: VolunteerActionInput;
};


export type CreateVolunteerActionMutation = (
  { __typename?: 'Mutation' }
  & { createVolunteerAction: (
    { __typename?: 'VolunteerAction' }
    & VolunteerActionFieldsFragment
  ) }
);

export type CreateVolunteerActionProductMutationVariables = {
  input: VolunteerActionProductInput;
};


export type CreateVolunteerActionProductMutation = (
  { __typename?: 'Mutation' }
  & { createVolunteerActionProduct: (
    { __typename?: 'VolunteerActionProduct' }
    & VolunteerActionProductFieldsFragment
  ) }
);

export type DeleteVolunteerActionMutationVariables = {
  input: VolunteerActionInput;
};


export type DeleteVolunteerActionMutation = (
  { __typename?: 'Mutation' }
  & { deleteVolunteerAction: (
    { __typename?: 'VolunteerAction' }
    & VolunteerActionFieldsFragment
  ) }
);

export type UpdateProductMutationVariables = {
  input: ProductInput;
};


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { updateProduct: (
    { __typename?: 'Product' }
    & ProductFieldsFragment
  ) }
);

export type UpdateRecipientMutationVariables = {
  input: RecipientInput;
};


export type UpdateRecipientMutation = (
  { __typename?: 'Mutation' }
  & { updateRecipient: (
    { __typename?: 'Recipient' }
    & RecipientFieldsFragment
  ) }
);

export type UpdateVolunteerMutationVariables = {
  input: VolunteerInput;
};


export type UpdateVolunteerMutation = (
  { __typename?: 'Mutation' }
  & { updateVolunteer: (
    { __typename?: 'Volunteer' }
    & VolunteerFieldsFragment
  ) }
);

export type UpdateVolunteerActionMutationVariables = {
  input: VolunteerActionInput;
};


export type UpdateVolunteerActionMutation = (
  { __typename?: 'Mutation' }
  & { updateVolunteerAction: (
    { __typename?: 'VolunteerAction' }
    & VolunteerActionFieldsFragment
  ) }
);

export type FindAllDistributionCentresQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindAllDistributionCentresQuery = (
  { __typename?: 'Query' }
  & { findAllDistributionCentres: Array<Maybe<(
    { __typename?: 'DistributionCentre' }
    & DistributionCentreExpandedFieldsFragment
  )>> }
);

export type FindAllProductsQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindAllProductsQuery = (
  { __typename?: 'Query' }
  & { findAllProducts: Array<Maybe<(
    { __typename?: 'Product' }
    & ProductExpandedFieldsFragment
  )>> }
);

export type FindAllRecipientsQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindAllRecipientsQuery = (
  { __typename?: 'Query' }
  & { findAllRecipients: Array<Maybe<(
    { __typename?: 'Recipient' }
    & RecipientExpandedFieldsFragment
  )>> }
);

export type FindAllVolunteerActionProductsQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindAllVolunteerActionProductsQuery = (
  { __typename?: 'Query' }
  & { findAllVolunteerActionProducts: Array<Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & VolunteerActionProductExpandedFieldsFragment
  )>> }
);

export type FindAllVolunteerActionsQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindAllVolunteerActionsQuery = (
  { __typename?: 'Query' }
  & { findAllVolunteerActions: Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & VolunteerActionExpandedFieldsFragment
  )>> }
);

export type FindAllVolunteersQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindAllVolunteersQuery = (
  { __typename?: 'Query' }
  & { findAllVolunteers: Array<Maybe<(
    { __typename?: 'Volunteer' }
    & VolunteerExpandedFieldsFragment
  )>> }
);

export type FindDistributionCentresQueryVariables = {
  fields: DistributionCentreInput;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindDistributionCentresQuery = (
  { __typename?: 'Query' }
  & { findDistributionCentres: Array<Maybe<(
    { __typename?: 'DistributionCentre' }
    & DistributionCentreExpandedFieldsFragment
  )>> }
);

export type FindIdAndNamesOfAllDistributionCentresQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindIdAndNamesOfAllDistributionCentresQuery = (
  { __typename?: 'Query' }
  & { findAllDistributionCentres: Array<Maybe<(
    { __typename?: 'DistributionCentre' }
    & Pick<DistributionCentre, 'id' | 'name'>
  )>> }
);

export type FindActiveVolunteerQueryVariables = {
  username: Scalars['String'];
};


export type FindActiveVolunteerQuery = (
  { __typename?: 'Query' }
  & { findVolunteers: Array<Maybe<(
    { __typename?: 'Volunteer' }
    & VolunteerFieldsFragment
  )>> }
);

export type FindProductsQueryVariables = {
  fields: ProductInput;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindProductsQuery = (
  { __typename?: 'Query' }
  & { findProducts: Array<Maybe<(
    { __typename?: 'Product' }
    & ProductExpandedFieldsFragment
  )>> }
);

export type FindRecipientsQueryVariables = {
  fields: RecipientInput;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindRecipientsQuery = (
  { __typename?: 'Query' }
  & { findRecipients: Array<Maybe<(
    { __typename?: 'Recipient' }
    & RecipientExpandedFieldsFragment
  )>> }
);

export type FindVolunteerActionQueryVariables = {
  id: Scalars['ID'];
};


export type FindVolunteerActionQuery = (
  { __typename?: 'Query' }
  & { findVolunteerActions: Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & VolunteerActionExpandedFieldsFragment
  )>> }
);

export type FindVolunteerActionDetailsQueryVariables = {
  id: Scalars['ID'];
};


export type FindVolunteerActionDetailsQuery = (
  { __typename?: 'Query' }
  & { findVolunteerActions: Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status'>
    & { distributionCentre?: Maybe<(
      { __typename?: 'DistributionCentre' }
      & DistributionCentreFieldsFragment
    )>, recipient?: Maybe<(
      { __typename?: 'Recipient' }
      & RecipientFieldsFragment
    )>, volunteer?: Maybe<(
      { __typename?: 'Volunteer' }
      & VolunteerFieldsFragment
    )>, products?: Maybe<Array<Maybe<(
      { __typename?: 'VolunteerActionProduct' }
      & Pick<VolunteerActionProduct, 'id'>
      & { product?: Maybe<(
        { __typename?: 'Product' }
        & ProductFieldsFragment
      )> }
    )>>> }
  )>> }
);

export type FindVolunteerActionProductsQueryVariables = {
  fields: VolunteerActionProductInput;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindVolunteerActionProductsQuery = (
  { __typename?: 'Query' }
  & { findVolunteerActionProducts: Array<Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & VolunteerActionProductExpandedFieldsFragment
  )>> }
);

export type FindVolunteerActionsQueryVariables = {
  fields: VolunteerActionInput;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindVolunteerActionsQuery = (
  { __typename?: 'Query' }
  & { findVolunteerActions: Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & VolunteerActionExpandedFieldsFragment
  )>> }
);

export type FindVolunteersQueryVariables = {
  fields: VolunteerInput;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindVolunteersQuery = (
  { __typename?: 'Query' }
  & { findVolunteers: Array<Maybe<(
    { __typename?: 'Volunteer' }
    & VolunteerExpandedFieldsFragment
  )>> }
);

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
  stockInformation
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
  stockInformation
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
    createdAt
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
    stockInformation
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
  createdAt
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
  createdAt
  prefferedProducts
  actions {
    id
    title
    description
    status
    createdAt
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
}
    `;
export const VolunteerActionFieldsFragmentDoc = gql`
    fragment VolunteerActionFields on VolunteerAction {
  id
  title
  description
  status
  createdAt
}
    `;
export const VolunteerActionExpandedFieldsFragmentDoc = gql`
    fragment VolunteerActionExpandedFields on VolunteerAction {
  id
  title
  description
  status
  createdAt
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
    stockInformation
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
    createdAt
    prefferedProducts
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
    createdAt
  }
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
  actions {
    id
    title
    description
    status
    createdAt
  }
}
    `;
export const CreateDistributionCentreDocument = gql`
    mutation createDistributionCentre($input: DistributionCentreInput!) {
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
export const CreateProductDocument = gql`
    mutation createProduct($input: ProductInput!) {
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
export const CreateRecipientDocument = gql`
    mutation createRecipient($input: RecipientInput!) {
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
export const CreateVolunteerDocument = gql`
    mutation createVolunteer($input: VolunteerInput!) {
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
export const CreateVolunteerActionDocument = gql`
    mutation createVolunteerAction($input: VolunteerActionInput!) {
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
export const CreateVolunteerActionProductDocument = gql`
    mutation createVolunteerActionProduct($input: VolunteerActionProductInput!) {
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
export const DeleteVolunteerActionDocument = gql`
    mutation deleteVolunteerAction($input: VolunteerActionInput!) {
  deleteVolunteerAction(input: $input) {
    ...VolunteerActionFields
  }
}
    ${VolunteerActionFieldsFragmentDoc}`;
export type DeleteVolunteerActionMutationFn = ApolloReactCommon.MutationFunction<DeleteVolunteerActionMutation, DeleteVolunteerActionMutationVariables>;

/**
 * __useDeleteVolunteerActionMutation__
 *
 * To run a mutation, you first call `useDeleteVolunteerActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVolunteerActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVolunteerActionMutation, { data, loading, error }] = useDeleteVolunteerActionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteVolunteerActionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteVolunteerActionMutation, DeleteVolunteerActionMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteVolunteerActionMutation, DeleteVolunteerActionMutationVariables>(DeleteVolunteerActionDocument, baseOptions);
      }
export type DeleteVolunteerActionMutationHookResult = ReturnType<typeof useDeleteVolunteerActionMutation>;
export type DeleteVolunteerActionMutationResult = ApolloReactCommon.MutationResult<DeleteVolunteerActionMutation>;
export type DeleteVolunteerActionMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteVolunteerActionMutation, DeleteVolunteerActionMutationVariables>;
export const UpdateProductDocument = gql`
    mutation updateProduct($input: ProductInput!) {
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
export const UpdateRecipientDocument = gql`
    mutation updateRecipient($input: RecipientInput!) {
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
export const UpdateVolunteerDocument = gql`
    mutation updateVolunteer($input: VolunteerInput!) {
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
export const UpdateVolunteerActionDocument = gql`
    mutation updateVolunteerAction($input: VolunteerActionInput!) {
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
export const FindAllDistributionCentresDocument = gql`
    query findAllDistributionCentres($limit: Int, $offset: Int) {
  findAllDistributionCentres(limit: $limit, offset: $offset) {
    ...DistributionCentreExpandedFields
  }
}
    ${DistributionCentreExpandedFieldsFragmentDoc}`;

/**
 * __useFindAllDistributionCentresQuery__
 *
 * To run a query within a React component, call `useFindAllDistributionCentresQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllDistributionCentresQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllDistributionCentresQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFindAllDistributionCentresQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindAllDistributionCentresQuery, FindAllDistributionCentresQueryVariables>) {
        return ApolloReactHooks.useQuery<FindAllDistributionCentresQuery, FindAllDistributionCentresQueryVariables>(FindAllDistributionCentresDocument, baseOptions);
      }
export function useFindAllDistributionCentresLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindAllDistributionCentresQuery, FindAllDistributionCentresQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindAllDistributionCentresQuery, FindAllDistributionCentresQueryVariables>(FindAllDistributionCentresDocument, baseOptions);
        }
export type FindAllDistributionCentresQueryHookResult = ReturnType<typeof useFindAllDistributionCentresQuery>;
export type FindAllDistributionCentresLazyQueryHookResult = ReturnType<typeof useFindAllDistributionCentresLazyQuery>;
export type FindAllDistributionCentresQueryResult = ApolloReactCommon.QueryResult<FindAllDistributionCentresQuery, FindAllDistributionCentresQueryVariables>;
export const FindAllProductsDocument = gql`
    query findAllProducts($limit: Int, $offset: Int) {
  findAllProducts(limit: $limit, offset: $offset) {
    ...ProductExpandedFields
  }
}
    ${ProductExpandedFieldsFragmentDoc}`;

/**
 * __useFindAllProductsQuery__
 *
 * To run a query within a React component, call `useFindAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFindAllProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindAllProductsQuery, FindAllProductsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindAllProductsQuery, FindAllProductsQueryVariables>(FindAllProductsDocument, baseOptions);
      }
export function useFindAllProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindAllProductsQuery, FindAllProductsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindAllProductsQuery, FindAllProductsQueryVariables>(FindAllProductsDocument, baseOptions);
        }
export type FindAllProductsQueryHookResult = ReturnType<typeof useFindAllProductsQuery>;
export type FindAllProductsLazyQueryHookResult = ReturnType<typeof useFindAllProductsLazyQuery>;
export type FindAllProductsQueryResult = ApolloReactCommon.QueryResult<FindAllProductsQuery, FindAllProductsQueryVariables>;
export const FindAllRecipientsDocument = gql`
    query findAllRecipients($limit: Int, $offset: Int) {
  findAllRecipients(limit: $limit, offset: $offset) {
    ...RecipientExpandedFields
  }
}
    ${RecipientExpandedFieldsFragmentDoc}`;

/**
 * __useFindAllRecipientsQuery__
 *
 * To run a query within a React component, call `useFindAllRecipientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllRecipientsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllRecipientsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFindAllRecipientsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindAllRecipientsQuery, FindAllRecipientsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindAllRecipientsQuery, FindAllRecipientsQueryVariables>(FindAllRecipientsDocument, baseOptions);
      }
export function useFindAllRecipientsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindAllRecipientsQuery, FindAllRecipientsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindAllRecipientsQuery, FindAllRecipientsQueryVariables>(FindAllRecipientsDocument, baseOptions);
        }
export type FindAllRecipientsQueryHookResult = ReturnType<typeof useFindAllRecipientsQuery>;
export type FindAllRecipientsLazyQueryHookResult = ReturnType<typeof useFindAllRecipientsLazyQuery>;
export type FindAllRecipientsQueryResult = ApolloReactCommon.QueryResult<FindAllRecipientsQuery, FindAllRecipientsQueryVariables>;
export const FindAllVolunteerActionProductsDocument = gql`
    query findAllVolunteerActionProducts($limit: Int, $offset: Int) {
  findAllVolunteerActionProducts(limit: $limit, offset: $offset) {
    ...VolunteerActionProductExpandedFields
  }
}
    ${VolunteerActionProductExpandedFieldsFragmentDoc}`;

/**
 * __useFindAllVolunteerActionProductsQuery__
 *
 * To run a query within a React component, call `useFindAllVolunteerActionProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllVolunteerActionProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllVolunteerActionProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFindAllVolunteerActionProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindAllVolunteerActionProductsQuery, FindAllVolunteerActionProductsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindAllVolunteerActionProductsQuery, FindAllVolunteerActionProductsQueryVariables>(FindAllVolunteerActionProductsDocument, baseOptions);
      }
export function useFindAllVolunteerActionProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindAllVolunteerActionProductsQuery, FindAllVolunteerActionProductsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindAllVolunteerActionProductsQuery, FindAllVolunteerActionProductsQueryVariables>(FindAllVolunteerActionProductsDocument, baseOptions);
        }
export type FindAllVolunteerActionProductsQueryHookResult = ReturnType<typeof useFindAllVolunteerActionProductsQuery>;
export type FindAllVolunteerActionProductsLazyQueryHookResult = ReturnType<typeof useFindAllVolunteerActionProductsLazyQuery>;
export type FindAllVolunteerActionProductsQueryResult = ApolloReactCommon.QueryResult<FindAllVolunteerActionProductsQuery, FindAllVolunteerActionProductsQueryVariables>;
export const FindAllVolunteerActionsDocument = gql`
    query findAllVolunteerActions($limit: Int, $offset: Int) {
  findAllVolunteerActions(limit: $limit, offset: $offset) {
    ...VolunteerActionExpandedFields
  }
}
    ${VolunteerActionExpandedFieldsFragmentDoc}`;

/**
 * __useFindAllVolunteerActionsQuery__
 *
 * To run a query within a React component, call `useFindAllVolunteerActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllVolunteerActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllVolunteerActionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFindAllVolunteerActionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindAllVolunteerActionsQuery, FindAllVolunteerActionsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindAllVolunteerActionsQuery, FindAllVolunteerActionsQueryVariables>(FindAllVolunteerActionsDocument, baseOptions);
      }
export function useFindAllVolunteerActionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindAllVolunteerActionsQuery, FindAllVolunteerActionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindAllVolunteerActionsQuery, FindAllVolunteerActionsQueryVariables>(FindAllVolunteerActionsDocument, baseOptions);
        }
export type FindAllVolunteerActionsQueryHookResult = ReturnType<typeof useFindAllVolunteerActionsQuery>;
export type FindAllVolunteerActionsLazyQueryHookResult = ReturnType<typeof useFindAllVolunteerActionsLazyQuery>;
export type FindAllVolunteerActionsQueryResult = ApolloReactCommon.QueryResult<FindAllVolunteerActionsQuery, FindAllVolunteerActionsQueryVariables>;
export const FindAllVolunteersDocument = gql`
    query findAllVolunteers($limit: Int, $offset: Int) {
  findAllVolunteers(limit: $limit, offset: $offset) {
    ...VolunteerExpandedFields
  }
}
    ${VolunteerExpandedFieldsFragmentDoc}`;

/**
 * __useFindAllVolunteersQuery__
 *
 * To run a query within a React component, call `useFindAllVolunteersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllVolunteersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllVolunteersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFindAllVolunteersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindAllVolunteersQuery, FindAllVolunteersQueryVariables>) {
        return ApolloReactHooks.useQuery<FindAllVolunteersQuery, FindAllVolunteersQueryVariables>(FindAllVolunteersDocument, baseOptions);
      }
export function useFindAllVolunteersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindAllVolunteersQuery, FindAllVolunteersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindAllVolunteersQuery, FindAllVolunteersQueryVariables>(FindAllVolunteersDocument, baseOptions);
        }
export type FindAllVolunteersQueryHookResult = ReturnType<typeof useFindAllVolunteersQuery>;
export type FindAllVolunteersLazyQueryHookResult = ReturnType<typeof useFindAllVolunteersLazyQuery>;
export type FindAllVolunteersQueryResult = ApolloReactCommon.QueryResult<FindAllVolunteersQuery, FindAllVolunteersQueryVariables>;
export const FindDistributionCentresDocument = gql`
    query findDistributionCentres($fields: DistributionCentreInput!, $limit: Int, $offset: Int) {
  findDistributionCentres(fields: $fields, limit: $limit, offset: $offset) {
    ...DistributionCentreExpandedFields
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
 *      fields: // value for 'fields'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
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
export const FindIdAndNamesOfAllDistributionCentresDocument = gql`
    query findIdAndNamesOfAllDistributionCentres($limit: Int, $offset: Int) {
  findAllDistributionCentres(limit: $limit, offset: $offset) {
    id
    name
  }
}
    `;

/**
 * __useFindIdAndNamesOfAllDistributionCentresQuery__
 *
 * To run a query within a React component, call `useFindIdAndNamesOfAllDistributionCentresQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindIdAndNamesOfAllDistributionCentresQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindIdAndNamesOfAllDistributionCentresQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFindIdAndNamesOfAllDistributionCentresQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindIdAndNamesOfAllDistributionCentresQuery, FindIdAndNamesOfAllDistributionCentresQueryVariables>) {
        return ApolloReactHooks.useQuery<FindIdAndNamesOfAllDistributionCentresQuery, FindIdAndNamesOfAllDistributionCentresQueryVariables>(FindIdAndNamesOfAllDistributionCentresDocument, baseOptions);
      }
export function useFindIdAndNamesOfAllDistributionCentresLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindIdAndNamesOfAllDistributionCentresQuery, FindIdAndNamesOfAllDistributionCentresQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindIdAndNamesOfAllDistributionCentresQuery, FindIdAndNamesOfAllDistributionCentresQueryVariables>(FindIdAndNamesOfAllDistributionCentresDocument, baseOptions);
        }
export type FindIdAndNamesOfAllDistributionCentresQueryHookResult = ReturnType<typeof useFindIdAndNamesOfAllDistributionCentresQuery>;
export type FindIdAndNamesOfAllDistributionCentresLazyQueryHookResult = ReturnType<typeof useFindIdAndNamesOfAllDistributionCentresLazyQuery>;
export type FindIdAndNamesOfAllDistributionCentresQueryResult = ApolloReactCommon.QueryResult<FindIdAndNamesOfAllDistributionCentresQuery, FindIdAndNamesOfAllDistributionCentresQueryVariables>;
export const FindActiveVolunteerDocument = gql`
    query findActiveVolunteer($username: String!) {
  findVolunteers(fields: {username: $username}, limit: 1) {
    ...VolunteerFields
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
export const FindProductsDocument = gql`
    query findProducts($fields: ProductInput!, $limit: Int, $offset: Int) {
  findProducts(fields: $fields, limit: $limit, offset: $offset) {
    ...ProductExpandedFields
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
 *      fields: // value for 'fields'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
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
export const FindRecipientsDocument = gql`
    query findRecipients($fields: RecipientInput!, $limit: Int, $offset: Int) {
  findRecipients(fields: $fields, limit: $limit, offset: $offset) {
    ...RecipientExpandedFields
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
 *      fields: // value for 'fields'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
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
export const FindVolunteerActionDocument = gql`
    query findVolunteerAction($id: ID!) {
  findVolunteerActions(fields: {id: $id}) {
    ...VolunteerActionExpandedFields
  }
}
    ${VolunteerActionExpandedFieldsFragmentDoc}`;

/**
 * __useFindVolunteerActionQuery__
 *
 * To run a query within a React component, call `useFindVolunteerActionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindVolunteerActionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindVolunteerActionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindVolunteerActionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindVolunteerActionQuery, FindVolunteerActionQueryVariables>) {
        return ApolloReactHooks.useQuery<FindVolunteerActionQuery, FindVolunteerActionQueryVariables>(FindVolunteerActionDocument, baseOptions);
      }
export function useFindVolunteerActionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindVolunteerActionQuery, FindVolunteerActionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindVolunteerActionQuery, FindVolunteerActionQueryVariables>(FindVolunteerActionDocument, baseOptions);
        }
export type FindVolunteerActionQueryHookResult = ReturnType<typeof useFindVolunteerActionQuery>;
export type FindVolunteerActionLazyQueryHookResult = ReturnType<typeof useFindVolunteerActionLazyQuery>;
export type FindVolunteerActionQueryResult = ApolloReactCommon.QueryResult<FindVolunteerActionQuery, FindVolunteerActionQueryVariables>;
export const FindVolunteerActionDetailsDocument = gql`
    query findVolunteerActionDetails($id: ID!) {
  findVolunteerActions(fields: {id: $id}, limit: 1) {
    id
    title
    description
    status
    distributionCentre {
      ...DistributionCentreFields
    }
    recipient {
      ...RecipientFields
    }
    volunteer {
      ...VolunteerFields
    }
    products {
      id
      product {
        ...ProductFields
      }
    }
  }
}
    ${DistributionCentreFieldsFragmentDoc}
${RecipientFieldsFragmentDoc}
${VolunteerFieldsFragmentDoc}
${ProductFieldsFragmentDoc}`;

/**
 * __useFindVolunteerActionDetailsQuery__
 *
 * To run a query within a React component, call `useFindVolunteerActionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindVolunteerActionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindVolunteerActionDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindVolunteerActionDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindVolunteerActionDetailsQuery, FindVolunteerActionDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindVolunteerActionDetailsQuery, FindVolunteerActionDetailsQueryVariables>(FindVolunteerActionDetailsDocument, baseOptions);
      }
export function useFindVolunteerActionDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindVolunteerActionDetailsQuery, FindVolunteerActionDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindVolunteerActionDetailsQuery, FindVolunteerActionDetailsQueryVariables>(FindVolunteerActionDetailsDocument, baseOptions);
        }
export type FindVolunteerActionDetailsQueryHookResult = ReturnType<typeof useFindVolunteerActionDetailsQuery>;
export type FindVolunteerActionDetailsLazyQueryHookResult = ReturnType<typeof useFindVolunteerActionDetailsLazyQuery>;
export type FindVolunteerActionDetailsQueryResult = ApolloReactCommon.QueryResult<FindVolunteerActionDetailsQuery, FindVolunteerActionDetailsQueryVariables>;
export const FindVolunteerActionProductsDocument = gql`
    query findVolunteerActionProducts($fields: VolunteerActionProductInput!, $limit: Int, $offset: Int) {
  findVolunteerActionProducts(fields: $fields, limit: $limit, offset: $offset) {
    ...VolunteerActionProductExpandedFields
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
 *      fields: // value for 'fields'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
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
export const FindVolunteerActionsDocument = gql`
    query findVolunteerActions($fields: VolunteerActionInput!, $limit: Int, $offset: Int) {
  findVolunteerActions(fields: $fields, limit: $limit, offset: $offset) {
    ...VolunteerActionExpandedFields
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
 *      fields: // value for 'fields'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
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
export const FindVolunteersDocument = gql`
    query findVolunteers($fields: VolunteerInput!, $limit: Int, $offset: Int) {
  findVolunteers(fields: $fields, limit: $limit, offset: $offset) {
    ...VolunteerExpandedFields
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
 *      fields: // value for 'fields'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
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