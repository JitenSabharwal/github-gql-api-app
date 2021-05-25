import { useCallback } from "react"
import {
  useGetRepositoryQuery,
  GetRepositoryQueryVariables,
  GetRepositoryQuery,
} from "../generated/graphql"
import { useSafeQuery } from "./queryTypes"

export enum IssueState {
  Open = "OPEN",
  Closed = "CLOSED",
}

export const useGetRepository = ({
  owner,
  name,
  first,
  last,
  states,
  after,
  before,
}: GetRepositoryQueryVariables) => {
  const variables: GetRepositoryQueryVariables = {
    owner,
    name,
    states,
  }
  if (first) variables.first = first
  else if (last) variables.last = last
  if (after) variables.after = after
  if (before) variables.before = before
  return useSafeQuery(useGetRepositoryQuery, {
    variables,
    memoMapper: useCallback(
      (d: GetRepositoryQuery | undefined) =>
        d?.repository ? mapInitalLoad(d) : undefined,
      []
    ),
  })
}
function mapInitalLoad(d: GetRepositoryQuery) {
  return d
}
