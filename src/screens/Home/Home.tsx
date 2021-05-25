import React, { useCallback, useState } from "react"
import Layout from "../../components/organisms/Layout/Layout"
import SearchBar from "../../components/atoms/SearchBar/SearchBar"
import { TotalCount } from "./components/TotalCount"
import {
  IssueCard,
  Issue as IssueCardType,
} from "../../components/molecules/IssueCard"
import { IssueState, useGetRepository } from "../../graphql"
import { useHistory } from "react-router-dom"
import { GetRepositoryQueryVariables } from "../../generated/graphql"
import styled from "styled-components"
const CardWrapper = styled.div`
  display: flex;
`
interface Issue {}
type Props = {
  totalCount: number
  issues: Issue[]
}

const cardMockData: IssueCardType = {
  id: "1",
  createdAt: new Date(),
  title: "Sample Issue",
  description:
    "This is just for testing purpose, This is just for testing purpose,This is just for testing purpose,This is just for testing purpose, This is just for testing purpose",
  createdBy: "Jiten",
  repository: "Sample Test",
  commentCount: 15,
}

const data_ = {
  owner: "facebook",
  name: "react",
  first: 10,
  states: IssueState.Open,
}
export default function Home({ totalCount = 0 }: Props) {
  const [queries, setQueries] = useState<GetRepositoryQueryVariables[]>([
    { ...data_ },
  ])
  const [page, setPage] = useState(0)
  const { loading, data, error } = useGetRepository(queries[page])
  if (error) console.log(error)
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

  const nextPage = useCallback(() => {
    const hasNextPage = data?.repository?.issues.pageInfo.hasNextPage
    if (hasNextPage) {
      setPage(page + 1)
      fetchMore_(data?.repository?.issues.pageInfo.endCursor ?? "")
    }
  }, [data])

  const prevPage = useCallback(() => {
    if (page > 0) setPage(page - 1)
  }, [data])

  return (
    <Layout>
      <SearchBar />
      <TotalCount
        value={
          (totalCount || data?.repository?.issues.totalCount) ?? totalCount
        }
        label={"Total number of found issues"}
      />
      <button onClick={() => prevPage()}>Before</button>
      <button onClick={() => nextPage()}>Next</button>
      <CardWrapper>
        {!loading &&
          data &&
          data.repository?.issues?.edges?.map((m) => (
            <IssueCard
              key={m?.node?.title}
              issue={{ ...cardMockData, title: m?.node?.title ?? "" }}
              onShowMore={() => {
                history.push(`/issue/${m?.node?.id}`)
              }}
            />
          ))}
      </CardWrapper>
    </Layout>
  )
}
