/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * Collection List
 * OpenAPI spec version: 2.0.0
 */
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey
} from "react-query";
import type { List, GetListParams } from "./model";
import { fetcher, ErrorType } from "./mutator/fetcher";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

/**
 * Get list with collections.
 */
export const getList = (
  listId: string,
  params?: GetListParams,
  signal?: AbortSignal
) => {
  return fetcher<List>({
    url: `/list/${listId}`,
    method: "get",
    signal,
    params
  });
};

export const getGetListQueryKey = (listId: string, params?: GetListParams) => [
  `/list/${listId}`,
  ...(params ? [params] : [])
];

export type GetListQueryResult = NonNullable<
  Awaited<ReturnType<typeof getList>>
>;
export type GetListQueryError = ErrorType<void>;

export const useGetList = <
  TData = Awaited<ReturnType<typeof getList>>,
  TError = ErrorType<void>
>(
  listId: string,
  params?: GetListParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getList>>, TError, TData>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetListQueryKey(listId, params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getList>>> = ({
    signal
  }) => getList(listId, params, signal);

  const query = useQuery<Awaited<ReturnType<typeof getList>>, TError, TData>(
    queryKey,
    queryFn,
    { enabled: !!listId, ...queryOptions }
  );

  return {
    queryKey,
    ...query
  };
};

/**
 * Check existence of a collection on a list. To check multiple collections in one request, see the collection_ids query parameter on /list/{listId}.
 */
export const hasItem = (
  listId: string,
  itemId: string,
  signal?: AbortSignal
) => {
  return fetcher<void>({
    url: `/list/${listId}/${itemId}`,
    method: "head",
    signal
  });
};

export type HasItemMutationResult = NonNullable<
  Awaited<ReturnType<typeof hasItem>>
>;

export type HasItemMutationError = ErrorType<unknown>;

export const useHasItem = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof hasItem>>,
    TError,
    { listId: string; itemId: string },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof hasItem>>,
    { listId: string; itemId: string }
  > = (props) => {
    const { listId, itemId } = props ?? {};

    return hasItem(listId, itemId);
  };

  return useMutation<
    Awaited<ReturnType<typeof hasItem>>,
    TError,
    { listId: string; itemId: string },
    TContext
  >(mutationFn, mutationOptions);
};

/**
 * Add collection to the the list.
 */
export const addItem = (listId: string, itemId: string) => {
  return fetcher<void>({ url: `/list/${listId}/${itemId}`, method: "put" });
};

export type AddItemMutationResult = NonNullable<
  Awaited<ReturnType<typeof addItem>>
>;

export type AddItemMutationError = ErrorType<unknown>;

export const useAddItem = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof addItem>>,
    TError,
    { listId: string; itemId: string },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof addItem>>,
    { listId: string; itemId: string }
  > = (props) => {
    const { listId, itemId } = props ?? {};

    return addItem(listId, itemId);
  };

  return useMutation<
    Awaited<ReturnType<typeof addItem>>,
    TError,
    { listId: string; itemId: string },
    TContext
  >(mutationFn, mutationOptions);
};

/**
 * Delete collection from list.
 */
export const removeItem = (listId: string, itemId: string) => {
  return fetcher<void>({ url: `/list/${listId}/${itemId}`, method: "delete" });
};

export type RemoveItemMutationResult = NonNullable<
  Awaited<ReturnType<typeof removeItem>>
>;

export type RemoveItemMutationError = ErrorType<unknown>;

export const useRemoveItem = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof removeItem>>,
    TError,
    { listId: string; itemId: string },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof removeItem>>,
    { listId: string; itemId: string }
  > = (props) => {
    const { listId, itemId } = props ?? {};

    return removeItem(listId, itemId);
  };

  return useMutation<
    Awaited<ReturnType<typeof removeItem>>,
    TError,
    { listId: string; itemId: string },
    TContext
  >(mutationFn, mutationOptions);
};