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
};

export enum ActionStatus {
  Assigned = 'ASSIGNED',
  Inprogress = 'INPROGRESS',
  Completed = 'COMPLETED'
}

export enum ActionType {
  PhoneCall = 'PHONE_CALL',
  Delivery = 'DELIVERY'
}

/**  @model  */
export type DistributionCentre = {
   __typename?: 'DistributionCentre';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['String']>;
  long?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type DistributionCentreInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['String']>;
  long?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createDistributionCentre: DistributionCentre;
  updateDistributionCentre: DistributionCentre;
  deleteDistributionCentre: DistributionCentre;
  createVolunteer: Volunteer;
  updateVolunteer: Volunteer;
  deleteVolunteer: Volunteer;
  createVolounteerAction: VolounteerAction;
  updateVolounteerAction: VolounteerAction;
  deleteVolounteerAction: VolounteerAction;
  createReciever: Reciever;
  updateReciever: Reciever;
  deleteReciever: Reciever;
};


export type MutationCreateDistributionCentreArgs = {
  input?: Maybe<DistributionCentreInput>;
};


export type MutationUpdateDistributionCentreArgs = {
  input?: Maybe<DistributionCentreInput>;
};


export type MutationDeleteDistributionCentreArgs = {
  input?: Maybe<DistributionCentreInput>;
};


export type MutationCreateVolunteerArgs = {
  input?: Maybe<VolunteerInput>;
};


export type MutationUpdateVolunteerArgs = {
  input?: Maybe<VolunteerInput>;
};


export type MutationDeleteVolunteerArgs = {
  input?: Maybe<VolunteerInput>;
};


export type MutationCreateVolounteerActionArgs = {
  input?: Maybe<VolounteerActionInput>;
};


export type MutationUpdateVolounteerActionArgs = {
  input?: Maybe<VolounteerActionInput>;
};


export type MutationDeleteVolounteerActionArgs = {
  input?: Maybe<VolounteerActionInput>;
};


export type MutationCreateRecieverArgs = {
  input?: Maybe<RecieverInput>;
};


export type MutationUpdateRecieverArgs = {
  input?: Maybe<RecieverInput>;
};


export type MutationDeleteRecieverArgs = {
  input?: Maybe<RecieverInput>;
};

export type Query = {
   __typename?: 'Query';
  findAllDistributionCentres: Array<Maybe<DistributionCentre>>;
  findDistributionCentres: Array<Maybe<DistributionCentre>>;
  findAllVolunteers: Array<Maybe<Volunteer>>;
  findVolunteers: Array<Maybe<Volunteer>>;
  findAllVolounteerActions: Array<Maybe<VolounteerAction>>;
  findVolounteerActions: Array<Maybe<VolounteerAction>>;
  findAllRecievers: Array<Maybe<Reciever>>;
  findRecievers: Array<Maybe<Reciever>>;
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


export type QueryFindAllVolounteerActionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindVolounteerActionsArgs = {
  fields?: Maybe<VolounteerActionInput>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindAllRecieversArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindRecieversArgs = {
  fields?: Maybe<RecieverInput>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

/**  @model  */
export type Reciever = {
   __typename?: 'Reciever';
  id: Scalars['ID'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  prefferedProducts?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** @oneToMany field: 'reciever', key: 'recieverId' */
  actions?: Maybe<Array<Maybe<VolounteerAction>>>;
  version?: Maybe<Scalars['Int']>;
};

export type RecieverInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  prefferedProducts?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type Subscription = {
   __typename?: 'Subscription';
  newDistributionCentre: DistributionCentre;
  updatedDistributionCentre: DistributionCentre;
  deletedDistributionCentre: DistributionCentre;
  newVolunteer: Volunteer;
  updatedVolunteer: Volunteer;
  deletedVolunteer: Volunteer;
  newVolounteerAction: VolounteerAction;
  updatedVolounteerAction: VolounteerAction;
  deletedVolounteerAction: VolounteerAction;
  newReciever: Reciever;
  updatedReciever: Reciever;
  deletedReciever: Reciever;
};


export type SubscriptionNewDistributionCentreArgs = {
  input?: Maybe<DistributionCentreInput>;
};


export type SubscriptionUpdatedDistributionCentreArgs = {
  input?: Maybe<DistributionCentreInput>;
};


export type SubscriptionDeletedDistributionCentreArgs = {
  input?: Maybe<DistributionCentreInput>;
};


export type SubscriptionNewVolunteerArgs = {
  input?: Maybe<VolunteerInput>;
};


export type SubscriptionUpdatedVolunteerArgs = {
  input?: Maybe<VolunteerInput>;
};


export type SubscriptionDeletedVolunteerArgs = {
  input?: Maybe<VolunteerInput>;
};


export type SubscriptionNewVolounteerActionArgs = {
  input?: Maybe<VolounteerActionInput>;
};


export type SubscriptionUpdatedVolounteerActionArgs = {
  input?: Maybe<VolounteerActionInput>;
};


export type SubscriptionDeletedVolounteerActionArgs = {
  input?: Maybe<VolounteerActionInput>;
};


export type SubscriptionNewRecieverArgs = {
  input?: Maybe<RecieverInput>;
};


export type SubscriptionUpdatedRecieverArgs = {
  input?: Maybe<RecieverInput>;
};


export type SubscriptionDeletedRecieverArgs = {
  input?: Maybe<RecieverInput>;
};

/**
 * Represents action that is assigned to volounteer
 * @model 
 */
export type VolounteerAction = {
   __typename?: 'VolounteerAction';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  products: Array<Scalars['String']>;
  status?: Maybe<ActionStatus>;
  actionType?: Maybe<ActionType>;
  /** @manyToOne field: 'actions', key: 'volounteerId' */
  volounteer?: Maybe<Volunteer>;
  /** @manyToOne field: 'actions', key: 'recieverId' */
  reciever?: Maybe<Reciever>;
  version?: Maybe<Scalars['Int']>;
};

export type VolounteerActionInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  products?: Maybe<Scalars['String']>;
  status?: Maybe<ActionStatus>;
  actionType?: Maybe<ActionType>;
  volounteerId?: Maybe<Scalars['ID']>;
  recieverId?: Maybe<Scalars['ID']>;
  version?: Maybe<Scalars['Int']>;
};

/**  @model  */
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
  dateOfBirth: Scalars['String'];
  canPhoneCall: Scalars['Boolean'];
  canDeliver: Scalars['Boolean'];
  /** @oneToMany field: 'volounteer', key: 'volounteerId' */
  actions?: Maybe<Array<Maybe<VolounteerAction>>>;
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
  dateOfBirth?: Maybe<Scalars['String']>;
  canPhoneCall?: Maybe<Scalars['Boolean']>;
  canDeliver?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
};

export type DistributionCentreFieldsFragment = (
  { __typename?: 'DistributionCentre' }
  & Pick<DistributionCentre, 'id' | 'name' | 'address' | 'lat' | 'long'>
);

export type DistributionCentreExpandedFieldsFragment = (
  { __typename?: 'DistributionCentre' }
  & Pick<DistributionCentre, 'id' | 'name' | 'address' | 'lat' | 'long'>
);

export type RecieverFieldsFragment = (
  { __typename?: 'Reciever' }
  & Pick<Reciever, 'id' | 'name' | 'phone' | 'address' | 'prefferedProducts'>
);

export type RecieverExpandedFieldsFragment = (
  { __typename?: 'Reciever' }
  & Pick<Reciever, 'id' | 'name' | 'phone' | 'address' | 'prefferedProducts'>
  & { actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolounteerAction' }
    & Pick<VolounteerAction, 'id' | 'title' | 'description' | 'products' | 'status' | 'actionType'>
  )>>> }
);

export type VolounteerActionFieldsFragment = (
  { __typename?: 'VolounteerAction' }
  & Pick<VolounteerAction, 'id' | 'title' | 'description' | 'products' | 'status' | 'actionType'>
);

export type VolounteerActionExpandedFieldsFragment = (
  { __typename?: 'VolounteerAction' }
  & Pick<VolounteerAction, 'id' | 'title' | 'description' | 'products' | 'status' | 'actionType'>
);

export type VolunteerFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'dateOfBirth' | 'canPhoneCall' | 'canDeliver'>
);

export type VolunteerExpandedFieldsFragment = (
  { __typename?: 'Volunteer' }
  & Pick<Volunteer, 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'address1' | 'address2' | 'city' | 'dateOfBirth' | 'canPhoneCall' | 'canDeliver'>
  & { actions?: Maybe<Array<Maybe<(
    { __typename?: 'VolounteerAction' }
    & Pick<VolounteerAction, 'id' | 'title' | 'description' | 'products' | 'status' | 'actionType'>
  )>>> }
);

export type UpdateDistributionCentreMutationVariables = {
  input: DistributionCentreInput;
};


export type UpdateDistributionCentreMutation = (
  { __typename?: 'Mutation' }
  & { updateDistributionCentre: (
    { __typename?: 'DistributionCentre' }
    & DistributionCentreFieldsFragment
  ) }
);

export type UpdateRecieverMutationVariables = {
  input: RecieverInput;
};


export type UpdateRecieverMutation = (
  { __typename?: 'Mutation' }
  & { updateReciever: (
    { __typename?: 'Reciever' }
    & RecieverFieldsFragment
  ) }
);

export type UpdateVolounteerActionMutationVariables = {
  input: VolounteerActionInput;
};


export type UpdateVolounteerActionMutation = (
  { __typename?: 'Mutation' }
  & { updateVolounteerAction: (
    { __typename?: 'VolounteerAction' }
    & VolounteerActionFieldsFragment
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

export type FindRecieversQueryVariables = {
  fields: RecieverInput;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindRecieversQuery = (
  { __typename?: 'Query' }
  & { findRecievers: Array<Maybe<(
    { __typename?: 'Reciever' }
    & RecieverExpandedFieldsFragment
  )>> }
);

export type FindVolounteerActionsQueryVariables = {
  fields: VolounteerActionInput;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type FindVolounteerActionsQuery = (
  { __typename?: 'Query' }
  & { findVolounteerActions: Array<Maybe<(
    { __typename?: 'VolounteerAction' }
    & VolounteerActionExpandedFieldsFragment
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
  lat
  long
}
    `;
export const DistributionCentreExpandedFieldsFragmentDoc = gql`
    fragment DistributionCentreExpandedFields on DistributionCentre {
  id
  name
  address
  lat
  long
}
    `;
export const RecieverFieldsFragmentDoc = gql`
    fragment RecieverFields on Reciever {
  id
  name
  phone
  address
  prefferedProducts
}
    `;
export const RecieverExpandedFieldsFragmentDoc = gql`
    fragment RecieverExpandedFields on Reciever {
  id
  name
  phone
  address
  prefferedProducts
  actions {
    id
    title
    description
    products
    status
    actionType
  }
}
    `;
export const VolounteerActionFieldsFragmentDoc = gql`
    fragment VolounteerActionFields on VolounteerAction {
  id
  title
  description
  products
  status
  actionType
}
    `;
export const VolounteerActionExpandedFieldsFragmentDoc = gql`
    fragment VolounteerActionExpandedFields on VolounteerAction {
  id
  title
  description
  products
  status
  actionType
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
  }
}
    `;
export const UpdateDistributionCentreDocument = gql`
    mutation updateDistributionCentre($input: DistributionCentreInput!) {
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
export const UpdateRecieverDocument = gql`
    mutation updateReciever($input: RecieverInput!) {
  updateReciever(input: $input) {
    ...RecieverFields
  }
}
    ${RecieverFieldsFragmentDoc}`;
export type UpdateRecieverMutationFn = ApolloReactCommon.MutationFunction<UpdateRecieverMutation, UpdateRecieverMutationVariables>;

/**
 * __useUpdateRecieverMutation__
 *
 * To run a mutation, you first call `useUpdateRecieverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecieverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecieverMutation, { data, loading, error }] = useUpdateRecieverMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRecieverMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRecieverMutation, UpdateRecieverMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateRecieverMutation, UpdateRecieverMutationVariables>(UpdateRecieverDocument, baseOptions);
      }
export type UpdateRecieverMutationHookResult = ReturnType<typeof useUpdateRecieverMutation>;
export type UpdateRecieverMutationResult = ApolloReactCommon.MutationResult<UpdateRecieverMutation>;
export type UpdateRecieverMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateRecieverMutation, UpdateRecieverMutationVariables>;
export const UpdateVolounteerActionDocument = gql`
    mutation updateVolounteerAction($input: VolounteerActionInput!) {
  updateVolounteerAction(input: $input) {
    ...VolounteerActionFields
  }
}
    ${VolounteerActionFieldsFragmentDoc}`;
export type UpdateVolounteerActionMutationFn = ApolloReactCommon.MutationFunction<UpdateVolounteerActionMutation, UpdateVolounteerActionMutationVariables>;

/**
 * __useUpdateVolounteerActionMutation__
 *
 * To run a mutation, you first call `useUpdateVolounteerActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVolounteerActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVolounteerActionMutation, { data, loading, error }] = useUpdateVolounteerActionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVolounteerActionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateVolounteerActionMutation, UpdateVolounteerActionMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateVolounteerActionMutation, UpdateVolounteerActionMutationVariables>(UpdateVolounteerActionDocument, baseOptions);
      }
export type UpdateVolounteerActionMutationHookResult = ReturnType<typeof useUpdateVolounteerActionMutation>;
export type UpdateVolounteerActionMutationResult = ApolloReactCommon.MutationResult<UpdateVolounteerActionMutation>;
export type UpdateVolounteerActionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateVolounteerActionMutation, UpdateVolounteerActionMutationVariables>;
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
export const FindRecieversDocument = gql`
    query findRecievers($fields: RecieverInput!, $limit: Int, $offset: Int) {
  findRecievers(fields: $fields, limit: $limit, offset: $offset) {
    ...RecieverExpandedFields
  }
}
    ${RecieverExpandedFieldsFragmentDoc}`;

/**
 * __useFindRecieversQuery__
 *
 * To run a query within a React component, call `useFindRecieversQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRecieversQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRecieversQuery({
 *   variables: {
 *      fields: // value for 'fields'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFindRecieversQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindRecieversQuery, FindRecieversQueryVariables>) {
        return ApolloReactHooks.useQuery<FindRecieversQuery, FindRecieversQueryVariables>(FindRecieversDocument, baseOptions);
      }
export function useFindRecieversLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindRecieversQuery, FindRecieversQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindRecieversQuery, FindRecieversQueryVariables>(FindRecieversDocument, baseOptions);
        }
export type FindRecieversQueryHookResult = ReturnType<typeof useFindRecieversQuery>;
export type FindRecieversLazyQueryHookResult = ReturnType<typeof useFindRecieversLazyQuery>;
export type FindRecieversQueryResult = ApolloReactCommon.QueryResult<FindRecieversQuery, FindRecieversQueryVariables>;
export const FindVolounteerActionsDocument = gql`
    query findVolounteerActions($fields: VolounteerActionInput!, $limit: Int, $offset: Int) {
  findVolounteerActions(fields: $fields, limit: $limit, offset: $offset) {
    ...VolounteerActionExpandedFields
  }
}
    ${VolounteerActionExpandedFieldsFragmentDoc}`;

/**
 * __useFindVolounteerActionsQuery__
 *
 * To run a query within a React component, call `useFindVolounteerActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindVolounteerActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindVolounteerActionsQuery({
 *   variables: {
 *      fields: // value for 'fields'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFindVolounteerActionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindVolounteerActionsQuery, FindVolounteerActionsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindVolounteerActionsQuery, FindVolounteerActionsQueryVariables>(FindVolounteerActionsDocument, baseOptions);
      }
export function useFindVolounteerActionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindVolounteerActionsQuery, FindVolounteerActionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindVolounteerActionsQuery, FindVolounteerActionsQueryVariables>(FindVolounteerActionsDocument, baseOptions);
        }
export type FindVolounteerActionsQueryHookResult = ReturnType<typeof useFindVolounteerActionsQuery>;
export type FindVolounteerActionsLazyQueryHookResult = ReturnType<typeof useFindVolounteerActionsLazyQuery>;
export type FindVolounteerActionsQueryResult = ApolloReactCommon.QueryResult<FindVolounteerActionsQuery, FindVolounteerActionsQueryVariables>;
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