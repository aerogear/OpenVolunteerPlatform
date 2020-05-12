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
  createVolunteer: Volunteer;
  updateVolunteer: Volunteer;
  createVolunteerAction: VolunteerAction;
  updateVolunteerAction: VolunteerAction;
  deleteVolunteerAction: VolunteerAction;
  createRecipient: Recipient;
  updateRecipient: Recipient;
  createProduct: Product;
  updateProduct: Product;
};


export type MutationCreateDistributionCentreArgs = {
  input?: Maybe<DistributionCentreInput>;
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


export type MutationCreateProductArgs = {
  input?: Maybe<ProductInput>;
};


export type MutationUpdateProductArgs = {
  input?: Maybe<ProductInput>;
};

/**
 * Represents a join model between a recipient and product
 * @model
 * @crud.update: false
 * @crud.delete: false
 * @crud.create: false
 * @crud.subCreate: false
 * @crud.subUpdate: false
 * @crud.subDelete: false
 */
export type PrefferedProduct = {
   __typename?: 'PrefferedProduct';
  id: Scalars['ID'];
  /** @manyToOne field: 'prefferedProducts', key: 'recipientId' */
  recipient?: Maybe<Recipient>;
  /** @manyToOne field: 'preferredProducts', key: 'productId' */
  product?: Maybe<Product>;
  version?: Maybe<Scalars['Int']>;
};

export type PrefferedProductInput = {
  id?: Maybe<Scalars['ID']>;
  recipientId?: Maybe<Scalars['ID']>;
  productId?: Maybe<Scalars['ID']>;
  version?: Maybe<Scalars['Int']>;
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
  preferredProducts?: Maybe<Array<Maybe<PrefferedProduct>>>;
  /** @oneToMany field: 'product', key: 'productId' */
  volunteerActionProducts?: Maybe<Array<Maybe<VolunteerActionProduct>>>;
  version?: Maybe<Scalars['Int']>;
};

export type ProductInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type Query = {
   __typename?: 'Query';
  findAllDistributionCentres: Array<Maybe<DistributionCentre>>;
  findDistributionCentres: Array<Maybe<DistributionCentre>>;
  findAllVolunteers: Array<Maybe<Volunteer>>;
  findVolunteers: Array<Maybe<Volunteer>>;
  findAllVolunteerActions: Array<Maybe<VolunteerAction>>;
  findVolunteerActions: Array<Maybe<VolunteerAction>>;
  findAllVolunteerActionProducts: Array<Maybe<VolunteerActionProduct>>;
  findVolunteerActionProducts: Array<Maybe<VolunteerActionProduct>>;
  findAllRecipients: Array<Maybe<Recipient>>;
  findRecipients: Array<Maybe<Recipient>>;
  findAllPrefferedProducts: Array<Maybe<PrefferedProduct>>;
  findPrefferedProducts: Array<Maybe<PrefferedProduct>>;
  findAllProducts: Array<Maybe<Product>>;
  findProducts: Array<Maybe<Product>>;
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


export type QueryFindAllVolunteerActionProductsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindVolunteerActionProductsArgs = {
  fields?: Maybe<VolunteerActionProductInput>;
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


export type QueryFindAllPrefferedProductsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindPrefferedProductsArgs = {
  fields?: Maybe<PrefferedProductInput>;
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
  /** @oneToMany field: 'recipient', key: 'recipientId' */
  prefferedProducts?: Maybe<Array<Maybe<PrefferedProduct>>>;
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
  version?: Maybe<Scalars['Int']>;
};

export type Subscription = {
   __typename?: 'Subscription';
  newDistributionCentre: DistributionCentre;
  newVolunteer: Volunteer;
  updatedVolunteer: Volunteer;
  newVolunteerAction: VolunteerAction;
  updatedVolunteerAction: VolunteerAction;
  deletedVolunteerAction: VolunteerAction;
  newRecipient: Recipient;
  updatedRecipient: Recipient;
  newProduct: Product;
  updatedProduct: Product;
};


export type SubscriptionNewDistributionCentreArgs = {
  input?: Maybe<DistributionCentreInput>;
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


export type SubscriptionNewProductArgs = {
  input?: Maybe<ProductInput>;
};


export type SubscriptionUpdatedProductArgs = {
  input?: Maybe<ProductInput>;
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
  canPhoneCall?: Maybe<Scalars['Boolean']>;
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
  actionType?: Maybe<Scalars['String']>;
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
  actionType?: Maybe<Scalars['String']>;
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
 * @crud.update: false
 * @crud.delete: false
 * @crud.create: false
 * @crud.subCreate: false
 * @crud.subUpdate: false
 * @crud.subDelete: false
 */
export type VolunteerActionProduct = {
   __typename?: 'VolunteerActionProduct';
  id: Scalars['ID'];
  /** @manyToOne field: 'products', key: 'volunteerActionId' */
  volunteerAction?: Maybe<VolunteerAction>;
  /** @manyToOne field: 'volunteerActionProducts', key: 'productId' */
  product?: Maybe<Product>;
  version?: Maybe<Scalars['Int']>;
};

export type VolunteerActionProductInput = {
  id?: Maybe<Scalars['ID']>;
  volunteerActionId?: Maybe<Scalars['ID']>;
  productId?: Maybe<Scalars['ID']>;
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
  canPhoneCall?: Maybe<Scalars['Boolean']>;
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
  & { actions: Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'actionType' | 'createdAt'>
  )>> }
);

export type PrefferedProductFieldsFragment = (
  { __typename?: 'PrefferedProduct' }
  & Pick<PrefferedProduct, 'id'>
);

export type PrefferedProductExpandedFieldsFragment = (
  { __typename?: 'PrefferedProduct' }
  & Pick<PrefferedProduct, 'id'>
  & { recipient?: Maybe<(
    { __typename?: 'Recipient' }
    & Pick<Recipient, 'id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'createdAt'>
  )>, product?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'label' | 'description'>
  )> }
);

export type ProductFieldsFragment = (
  { __typename?: 'Product' }
  & Pick<Product, 'id' | 'label' | 'description'>
);

export type ProductExpandedFieldsFragment = (
  { __typename?: 'Product' }
  & Pick<Product, 'id' | 'label' | 'description'>
  & { preferredProducts?: Maybe<Array<Maybe<(
    { __typename?: 'PrefferedProduct' }
    & Pick<PrefferedProduct, 'id'>
  )>>>, volunteerActionProducts?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & Pick<VolunteerActionProduct, 'id'>
  )>>> }
);

export type RecipientFieldsFragment = (
  { __typename?: 'Recipient' }
  & Pick<Recipient, 'id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'createdAt'>
);

export type RecipientExpandedFieldsFragment = (
  { __typename?: 'Recipient' }
  & Pick<Recipient, 'id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'createdAt'>
  & { prefferedProducts?: Maybe<Array<Maybe<(
    { __typename?: 'PrefferedProduct' }
    & Pick<PrefferedProduct, 'id'>
  )>>>, actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'actionType' | 'createdAt'>
  )>>> }
);

export type VolunteerFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'postcode' | 'dateOfBirth' | 'canPhoneCall' | 'canDeliver'>
);

export type VolunteerActionFieldsFragment = (
  { __typename?: 'VolunteerAction' }
  & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'actionType' | 'createdAt'>
);

export type VolunteerActionExpandedFieldsFragment = (
  { __typename?: 'VolunteerAction' }
  & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'actionType' | 'createdAt'>
  & { volunteer?: Maybe<(
    { __typename?: 'Volunteer' }
    & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'postcode' | 'dateOfBirth' | 'canPhoneCall' | 'canDeliver'>
  )>, distributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & Pick<DistributionCentre, 'id' | 'name' | 'address1' | 'address2' | 'city' | 'postcode' | 'lat' | 'long' | 'stockInformation'>
  )>, products?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerActionProduct' }
    & Pick<VolunteerActionProduct, 'id'>
  )>>>, recipient?: Maybe<(
    { __typename?: 'Recipient' }
    & Pick<Recipient, 'id' | 'firstName' | 'lastName' | 'phone' | 'address1' | 'address2' | 'postcode' | 'city' | 'createdAt'>
  )> }
);

export type VolunteerActionProductFieldsFragment = (
  { __typename?: 'VolunteerActionProduct' }
  & Pick<VolunteerActionProduct, 'id'>
);

export type VolunteerActionProductExpandedFieldsFragment = (
  { __typename?: 'VolunteerActionProduct' }
  & Pick<VolunteerActionProduct, 'id'>
  & { volunteerAction?: Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'actionType' | 'createdAt'>
  )>, product?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'label' | 'description'>
  )> }
);

export type VolunteerExpandedFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'postcode' | 'dateOfBirth' | 'canPhoneCall' | 'canDeliver'>
  & { actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'status' | 'actionType' | 'createdAt'>
  )>>> }
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

export type FindMyVolunteerActionsQueryVariables = {
  volunteerId: Scalars['ID'];
  status?: Maybe<ActionStatus>;
};


export type FindMyVolunteerActionsQuery = (
  { __typename?: 'Query' }
  & { findVolunteerActions: Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & VolunteerActionFieldsFragment
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
  actions {
    id
    title
    description
    status
    actionType
    createdAt
  }
}
    `;
export const PrefferedProductFieldsFragmentDoc = gql`
    fragment PrefferedProductFields on PrefferedProduct {
  id
}
    `;
export const PrefferedProductExpandedFieldsFragmentDoc = gql`
    fragment PrefferedProductExpandedFields on PrefferedProduct {
  id
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
  }
  product {
    id
    label
    description
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
  preferredProducts {
    id
  }
  volunteerActionProducts {
    id
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
  prefferedProducts {
    id
  }
  actions {
    id
    title
    description
    status
    actionType
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
  canPhoneCall
  canDeliver
}
    `;
export const VolunteerActionFieldsFragmentDoc = gql`
    fragment VolunteerActionFields on VolunteerAction {
  id
  title
  description
  status
  actionType
  createdAt
}
    `;
export const VolunteerActionExpandedFieldsFragmentDoc = gql`
    fragment VolunteerActionExpandedFields on VolunteerAction {
  id
  title
  description
  status
  actionType
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
    canPhoneCall
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
  volunteerAction {
    id
    title
    description
    status
    actionType
    createdAt
  }
  product {
    id
    label
    description
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
  canPhoneCall
  canDeliver
  actions {
    id
    title
    description
    status
    actionType
    createdAt
  }
}
    `;
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
export const FindMyVolunteerActionsDocument = gql`
    query findMyVolunteerActions($volunteerId: ID!, $status: ActionStatus) {
  findVolunteerActions(fields: {volunteerId: $volunteerId, status: $status}) {
    ...VolunteerActionFields
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