import React, { useCallback, useMemo, useState } from "react"
import Layout from "../../components/organisms/Layout/Layout"
import SearchBar from "../../components/atoms/SearchBar/SearchBar"
import { TotalCount } from "./components/TotalCount"
import {
  IssueCard,
  Issue as IssueCardType,
} from "../../components/molecules/IssueCard"
import { useGetRepository, useSearchIssue } from "../../graphql"
import { useHistory } from "react-router-dom"
import {
  GetRepositoryQueryVariables,
  IssueState,
} from "../../generated/graphql"
import styled from "styled-components"
import { Loader } from "../../components/atoms/Loader"
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`
const LoaderWrapper = styled.div`
  margin-top: 10%;
`
interface Issue {}
type Props = {
  totalCount: number
  issues: Issue[]
}

const data_ = {
  owner: "facebook",
  name: "react",
  first: 10,
  states: IssueState.Open,
}
export default function Home({ totalCount = 0 }: Props) {
  const [page, setPage] = useState(0)
  const [queries, setQueries] = useState<GetRepositoryQueryVariables[]>([data_])
  const [search, setSearchText] = useState({
    state: IssueState.Open,
    repo: "facebook/react",
    text: "",
  })
  const { loading, mappedData } = useGetRepository(queries[page])
  const { loading: searchLoading, mappedData: searchResult } =
    useSearchIssue(search)
  const history = useHistory()
  const fetchMore_ = (after?: string | undefined) => {
    const data__: GetRepositoryQueryVariables = { ...data_ }
    if (after) {
      data__.after = after
      if (!queries[page + 1]) {
        setQueries([
          ...queries,
          {
            ...data__,
          },
        ])
      }
    }
  }
  const nextPage = () => {
    const hasNextPage = mappedData?.repository?.issues.pageInfo.hasNextPage
    if (hasNextPage) {
      setPage(page + 1)
      fetchMore_(mappedData?.repository?.issues.pageInfo.endCursor ?? "")
    }
  }

  const prevPage = () => {
    if (page > 0) setPage(page - 1)
  }
  const result = search.text ? searchResult?.issues : mappedData?.issues
  const issueCount = search.text
    ? searchResult?.totalCount
    : mappedData?.totalCount
  return (
    <Layout>
      <SearchBar
        onSubmit={(state: IssueState, text: string) =>
          setSearchText({
            ...search,
            text,
            state,
          })
        }
      />
      {loading || searchLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <>
          <TotalCount
            value={issueCount ?? totalCount}
            label={"Total number of found issues"}
          />
          {search.text ? (
            ""
          ) : (
            <>
              <button onClick={() => prevPage()} disabled={page === 0}>
                Before
              </button>
              <button
                onClick={() => nextPage()}
                disabled={!mappedData?.repository?.issues.pageInfo.hasNextPage}
              >
                Next
              </button>
            </>
          )}

          <CardWrapper>
            {!loading &&
              result &&
              result
                .filter((m) => m)
                .map((m: IssueCardType) => (
                  <IssueCard
                    key={m?.title}
                    issue={m}
                    onShowMore={(id) => {
                      history.push(`/issue/${m.repository}/${id}`)
                    }}
                  />
                ))}
          </CardWrapper>
        </>
      )}
    </Layout>
  )
}
