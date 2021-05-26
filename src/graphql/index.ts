import { useCallback } from "react"
import {
  useGetRepositoryQuery,
  GetRepositoryQueryVariables,
  GetRepositoryQuery,
  SearchIssueQueryVariables,
  useSearchIssueQuery,
  SearchIssueQuery,
  useGetIssueQuery,
  GetIssueQuery,
  IssueState,
  IssueCommentConnection,
} from "../generated/graphql"
import { useSafeQuery } from "./queryTypes"
import { Issue as IssueCardType } from "../components/molecules/IssueCard"
import { useParams } from "react-router-dom"

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
      (d: GetRepositoryQuery | undefined): MapGetRepo | undefined =>
        d?.repository ? mapInitalLoad(d) : undefined,
      []
    ),
  })
}

export type MapGetRepo = {
  repository: GetRepositoryQuery["repository"]
  issues: IssueCardType[]
  totalCount: number
}

function mapInitalLoad(d: GetRepositoryQuery): MapGetRepo {
  const issues = (d.repository?.issues.edges ?? []).map((n): IssueCardType => {
    const issue = n?.node
    return {
      id: issue?.number ?? 0,
      createdAt: new Date(),
      title: issue?.title ?? "",
      description: issue?.body ?? "",
      createdBy: issue?.author?.login ?? "",
      repository: d.repository?.nameWithOwner ?? "",
      commentCount: issue?.comments.totalCount ?? 0,
    }
  })
  return {
    repository: d.repository,
    totalCount: d.repository?.issues.totalCount ?? 0,
    issues,
  }
}

export function useSearchIssue({
  repo,
  state,
  text,
}: {
  repo: string
  state: IssueState
  text: string
}) {
  const variables: SearchIssueQueryVariables = {
    query: `repo:${repo} is:${state} in:title,body ${text}`,
  }
  return useSafeQuery(useSearchIssueQuery, {
    variables,
    memoMapper: useCallback(
      (d: SearchIssueQuery | undefined) =>
        d?.search.issueCount ? mapSearchResult(d, repo) : undefined,
      []
    ),
  })
}

function mapSearchResult(d: SearchIssueQuery, repo: string) {
  const issues_ = (d.search?.edges ?? []).map((x) => {
    if (x?.node?.__typename === "Issue")
      return {
        id: x.node?.number ?? 0,
        createdAt: new Date(),
        title: x.node?.title ?? "",
        description: x.node?.body ?? "",
        createdBy: x.node?.author?.login ?? "",
        repository: repo,
        commentCount: x.node?.comments.totalCount ?? 0,
      }
    return false
  })
  const issues = issues_.filter((i) => i) as IssueCardType[]
  return {
    issues,
    totalCount: issues?.length,
  }
}
interface MatchProps {
  id: string
  owner: string
  name: string
}

export const useGetIssue = () => {
  const { id, owner, name } = useParams<MatchProps>()
  return useSafeQuery(useGetIssueQuery, {
    variables: { issueNumber: +id, owner, name },
    memoMapper: useCallback(
      (d: GetIssueQuery | undefined) =>
        d?.repository?.issue ? mapIssue(d) : undefined,
      []
    ),
  })
}
type Comment = {
  body: string
  createdBy: string
  createdAt: Date
}
export type IssueContent = {
  nameWithOwner: string
  issue: {
    createdAt: string
    updatedAt: string
    title: string
    body: string
    author: string
    state: IssueState
    comments: Comment[]
  }
}
function mapIssue(d: GetIssueQuery): IssueContent {
  const { repository } = d
  return {
    nameWithOwner: repository?.nameWithOwner ?? "",
    issue: {
      createdAt: repository?.issue?.createdAt,
      updatedAt: repository?.issue?.updatedAt,
      title: repository?.issue?.title ?? "",
      body: repository?.issue?.body ?? "",
      author: repository?.issue?.author?.login ?? "",
      state: repository?.issue?.state ?? IssueState.Open,
      comments:
        repository?.issue?.comments.edges?.map((c) => {
          return {
            createdBy: c?.node?.author?.login ?? "",
            createdAt: new Date(c?.node?.updatedAt),
            body: c?.node?.bodyText ?? "",
          }
        }) ?? [],
    },
  }
}
