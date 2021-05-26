import React from "react"
import { SearchBar } from "../../components/atoms/SearchBar"
import Layout from "../../components/organisms/Layout/Layout"
import { GetIssueQueryResult } from "../../generated/graphql"
import styled from "styled-components"
import Comments from "../../components/organisms/Comments/Comments"
import ContentInfo from "./components/Content"
import { useGetIssue } from "../../graphql"
import { useHistory } from "react-router"
import { Loader } from "../../components/atoms/Loader"
const Title = styled.section`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
  line-height: 42px;
`
const Content = styled.section`
  margin-top: 24px;
  display: flex;
`
const ConentData = styled.div`
  display: flex;
  flex-grow: 4;
`
const CommentWrapper = styled.div`
  flex-grow: 8;
`

type Props = {
  issue: GetIssueQueryResult
}
export default function Issue() {
  const { loading, mappedData } = useGetIssue()
  const history = useHistory()
  return (
    <Layout
      onBackClick={() => {
        window.open("/", "_self")
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Title>{mappedData?.issue?.title}</Title>
          <Content>
            <ConentData>
              {mappedData && (
                <ContentInfo
                  data={{
                    createdAt: new Date(mappedData?.issue?.createdAt),
                    updatedAt: new Date(mappedData?.issue?.updatedAt),
                    title: mappedData?.issue?.title,
                    body: mappedData?.issue?.body,
                    author: mappedData?.issue?.author,
                    state: mappedData?.issue?.state,
                  }}
                />
              )}
            </ConentData>
            <CommentWrapper>
              {mappedData && <Comments data={mappedData?.issue?.comments} />}
            </CommentWrapper>
          </Content>
        </>
      )}
    </Layout>
  )
}
