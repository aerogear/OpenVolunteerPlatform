import { DocumentNode } from "graphql";
import ApolloClient, { OperationVariables } from "apollo-client";
import { getOperationFieldName, CacheOperation, generateClientId, isClientGeneratedId } from "offix-cache";
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloQueueEntryOperation, ApolloQueueEntry } from 'offix-client';
import { FetchResult } from 'apollo-link';

// export type OptimisticOptions = Omit<MutationHelperOptions, keyof MutationOptions |"updateQuery" | "context">;

export interface OptimisticOptions {
  mutation: DocumentNode;
  operationType: CacheOperation;
  returnType: string;
  idField?: string;
  variables?: OperationVariables;
}

/**
 * Create optimistic response.
 * For example:
 *
  optimisticResponse: {
      __typename: "Mutation",
      updateComment: {
        id: commentId,
        __typename: "Comment",
        content: commentContent
      }
    }
 *
 * For more info and examples see:
 * https://www.apollographql.com/docs/react/features/optimistic-ui.html
 *
 * @param mutation operation that is being performed (update)
 * @param returnType type that is going to be returned
 * @param variables actual data passed to function
 * @param idField name of id field (default:id)
 * @param operationType the type of operation being returned
 */
export const createOptimisticResponse = (options: OptimisticOptions) => {
  const operation = getOperationFieldName(options.mutation);
  // TODO things get really bad if returnType is not provided
  const {
    returnType,
    variables,
    idField = "id",
    operationType
  } = options;

  const optimisticResponse: any = {
    __typename: "Mutation"
  };

  optimisticResponse[operation] = {
    __typename: returnType,
    ...variables?.input,
    optimisticResponse: true
  };

  if (operationType === CacheOperation.ADD) {
    optimisticResponse[operation][idField] = generateClientId();
  }

  return optimisticResponse;
};

export function replaceClientGeneratedIDsInQueue(queue: ApolloQueueEntry[], operation: ApolloQueueEntryOperation, result: FetchResult) {
  if (!operation.op) {
    return;
  }
  const op = operation.op;
  const operationName = op.context.operationName as string;
  const optimisticResponse = op.optimisticResponse as {[key: string]: any};
  const idField = op.context.idField || "id";

  if (!result || !optimisticResponse || !optimisticResponse[operationName]) {
    return;
  }

  let clientId = optimisticResponse[operationName][idField];

  if (!clientId) {
    return;
  }
  // Ensure we dealing with string
  clientId = clientId.toString();
  if (isClientGeneratedId(optimisticResponse[operationName][idField])) {
    queue.forEach((entry: any) => {
      if (entry.operation.op.variables && entry.operation.op.variables.input[idField] === clientId) {
       entry.operation.op.variables.input[idField] = result.data && result.data[operationName][idField];
      }
    });
  }
};

export function removeOptimisticResponse(apolloClient: ApolloClient<NormalizedCacheObject>, { op, qid }: ApolloQueueEntryOperation) {
  apolloClient.store.markMutationComplete({
    mutationId: qid,
    optimisticResponse: op.optimisticResponse
  });
  apolloClient.queryManager.broadcastQueries();
};
