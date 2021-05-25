import {
  QueryResult,
  ApolloError,
  LazyQueryResult,
  QueryHookOptions,
} from "@apollo/client"
import { useCallback, useMemo } from "react"

type Mapper<TData, TMappedData = TData> = (data: TData) => TMappedData

type SafeQueryResultLoadingStates<TData, TMappedData> =
  | { loading: true; error: undefined; data: undefined; mappedData: undefined }
  | { loading: false; error: undefined; data: TData; mappedData: TMappedData }
  | {
      loading: false
      error: ApolloError
      data: undefined
      mappedData: undefined
    }

type SafeQueryResult<TData = any, TVariables = any, TMappedData = TData> =
  SafeQueryResultLoadingStates<TData, TMappedData> & {
    isFetching: boolean
  } & QueryResult<TData, TVariables>

enum NetworkStatus {
  loading = 1,
  setVariables = 2,
  fetchMore = 3,
  refetch = 4,
  poll = 6,
  ready = 7,
  error = 8,
}
function isFetching(result: QueryResult | LazyQueryResult<any, any>) {
  return Boolean(
    result.networkStatus === NetworkStatus.refetch ||
      result.networkStatus === NetworkStatus.fetchMore
  )
}
function useSafeM<TData, TVariables, TMappedData = TData>(
  queryResult: QueryResult<TData, TVariables>,
  mapper: Mapper<TData | undefined, TMappedData | undefined>
) {
  const mappedData = useMemo(
    () => mapper(queryResult.data),
    [mapper, queryResult.data]
  )
  // TODO: shouldnt QR be stable object?
  return Object.assign(queryResult, {
    ...queryResult,
    mappedData,
    // for queries you want to participate, enable `notifyOnNetworkStatusChange`
    isFetching: isFetching(queryResult),
  }) as SafeQueryResult<TData, TVariables, TMappedData>
}

export function useSafeQuery<TData, TVariables, TMappedData = TData>(
  func: (
    baseOptions: QueryHookOptions<TData, TVariables>
  ) => QueryResult<TData, TVariables>,
  baseOptions: QueryHookOptions<TData, TVariables> & {
    memoMapper: Mapper<TData | undefined, TMappedData | undefined>
  }
) {
  return useSafeM(func(baseOptions), baseOptions.memoMapper)
}
