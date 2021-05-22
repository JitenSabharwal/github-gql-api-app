import React from "react"
import Layout from "../../components/organisms/Layout/Layout"
import SearchBar from "../../components/atoms/SearchBar/SearchBar"
import { TotalCount } from "./components/TotalCount"
import {
  IssueCard,
  Issue as IssueCardType,
} from "../../components/molecules/IssueCard"

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
export default function Home({ totalCount = 0 }: Props) {
  return (
    <Layout>
      <SearchBar />
      <TotalCount value={totalCount} label={"Total number of found issues"} />
      <IssueCard issue={cardMockData} onShowMore={console.log} />
    </Layout>
  )
}
