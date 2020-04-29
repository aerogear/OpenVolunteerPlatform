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

export enum ActionType {
  PhoneCall = 'PHONE_CALL',
  Delivery = 'DELIVERY'
}


/**
 * @model
 * @crud.update: false
 * @crud.delete: false
 */
export type DistributionCentre = {
   __typename?: 'DistributionCentre';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
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
  address?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
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

export type Query = {
   __typename?: 'Query';
  findAllDistributionCentres: Array<Maybe<DistributionCentre>>;
  findDistributionCentres: Array<Maybe<DistributionCentre>>;
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
export type Recipient = {
   __typename?: 'Recipient';
  id: Scalars['ID'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  prefferedProducts?: Maybe<Scalars['String']>;
  /** @oneToMany field: 'recipient', key: 'recipientId' */
  actions?: Maybe<Array<Maybe<VolunteerAction>>>;
  version?: Maybe<Scalars['Int']>;
};

export type RecipientInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  prefferedProducts?: Maybe<Scalars['String']>;
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

/**
 * @model
 * @crud.delete: false
 */
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
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  canPhoneCall: Scalars['Boolean'];
  canDeliver: Scalars['Boolean'];
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
  products: Scalars['String'];
  status?: Maybe<ActionStatus>;
  actionType?: Maybe<ActionType>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** @manyToOne field: 'actions', key: 'volunteerId' */
  volunteer?: Maybe<Volunteer>;
  /**
   * Workaround for https://github.com/aerogear/graphback/issues/1167
   * @manyToOne field: 'actions', key: 'recipientId'
   */
  recipient?: Maybe<Recipient>;
  /** @manyToOne field: 'actions', key: 'distributionCentreId' */
  distributionCentre?: Maybe<DistributionCentre>;
  version?: Maybe<Scalars['Int']>;
};

export type VolunteerActionInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  products?: Maybe<Scalars['String']>;
  status?: Maybe<ActionStatus>;
  actionType?: Maybe<ActionType>;
  createdAt?: Maybe<Scalars['DateTime']>;
  recipientId?: Maybe<Scalars['ID']>;
  volunteerId?: Maybe<Scalars['ID']>;
  distributionCentreId?: Maybe<Scalars['ID']>;
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
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  canPhoneCall?: Maybe<Scalars['Boolean']>;
  canDeliver?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
};

export type DistributionCentreFieldsFragment = (
  { __typename?: 'DistributionCentre' }
  & Pick<DistributionCentre, 'id' | 'name' | 'address' | 'address2' | 'city' | 'lat' | 'long' | 'stockInformation'>
);

export type DistributionCentreExpandedFieldsFragment = (
  { __typename?: 'DistributionCentre' }
  & Pick<DistributionCentre, 'id' | 'name' | 'address' | 'address2' | 'city' | 'lat' | 'long' | 'stockInformation'>
);

export type RecipientFieldsFragment = (
  { __typename?: 'Recipient' }
  & Pick<Recipient, 'id' | 'name' | 'phone' | 'address' | 'createdAt' | 'prefferedProducts'>
);

export type RecipientExpandedFieldsFragment = (
  { __typename?: 'Recipient' }
  & Pick<Recipient, 'id' | 'name' | 'phone' | 'address' | 'createdAt' | 'prefferedProducts'>
  & { actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'products' | 'status' | 'actionType' | 'createdAt'>
  )>>> }
);

export type VolunteerFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'dateOfBirth' | 'canPhoneCall' | 'canDeliver'>
);

export type VolunteerActionFieldsFragment = (
  { __typename?: 'VolunteerAction' }
  & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'products' | 'status' | 'actionType' | 'createdAt'>
);

export type VolunteerActionExpandedFieldsFragment = (
  { __typename?: 'VolunteerAction' }
  & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'products' | 'status' | 'actionType' | 'createdAt'>
  & { recipient?: Maybe<(
    { __typename?: 'Recipient' }
    & Pick<Recipient, 'id' | 'name' | 'phone' | 'address' | 'createdAt' | 'prefferedProducts'>
  )>, volunteer?: Maybe<(
    { __typename?: 'Volunteer' }
    & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'dateOfBirth' | 'canPhoneCall' | 'canDeliver'>
  )>, distributionCentre?: Maybe<(
    { __typename?: 'DistributionCentre' }
    & Pick<DistributionCentre, 'id' | 'name' | 'address' | 'address2' | 'city' | 'lat' | 'long' | 'stockInformation'>
  )> }
);

export type VolunteerExpandedFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'dateOfBirth' | 'canPhoneCall' | 'canDeliver'>
  & { actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolunteerAction' }
    & Pick<VolunteerAction, 'id' | 'title' | 'description' | 'products' | 'status' | 'actionType' | 'createdAt'>
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
  address
  address2
  city
  lat
  long
  stockInformation
}
    `;
export const DistributionCentreExpandedFieldsFragmentDoc = gql`
    fragment DistributionCentreExpandedFields on DistributionCentre {
  id
  name
  address
  address2
  city
  lat
  long
  stockInformation
}
    `;
export const RecipientFieldsFragmentDoc = gql`
    fragment RecipientFields on Recipient {
  id
  name
  phone
  address
  createdAt
  prefferedProducts
}
    `;
export const RecipientExpandedFieldsFragmentDoc = gql`
    fragment RecipientExpandedFields on Recipient {
  id
  name
  phone
  address
  createdAt
  prefferedProducts
  actions {
    id
    title
    description
    products
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
  products
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
  products
  status
  actionType
  createdAt
  recipient {
    id
    name
    phone
    address
    createdAt
    prefferedProducts
  }
  volunteer {
    id
    firstName
    lastName
    email
    username
    address1
    address2
    city
    dateOfBirth
    canPhoneCall
    canDeliver
  }
  distributionCentre {
    id
    name
    address
    address2
    city
    lat
    long
    stockInformation
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
  dateOfBirth
  canPhoneCall
  canDeliver
  actions {
    id
    title
    description
    products
    status
    actionType
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