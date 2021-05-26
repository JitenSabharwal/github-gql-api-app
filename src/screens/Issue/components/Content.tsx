import React from "react"
import styled from "styled-components"
import { IssueState } from "../../../generated/graphql"

const Root = styled.div``
const InfoWrapper = styled.div`
  margin-bottom: 24px;
`
const InfoItem = styled.div`
  margin-bottom: 8px;
`
const Label = styled.span`
  color: #777272;
  font-size: 13px;
  line-height: 24px;
`
const Description = styled.div`
  margin-bottom: 24px;
`

export interface ContentData {
  title: string
  body: string
  state: IssueState
  createdAt: Date
  updatedAt: Date
  author: string
}
type Props = {
  data: ContentData
}
export default function Content({ data }: Props) {
  return (
    <Root>
      <Label>Description: </Label>
      <Description>{data.body}</Description>
      <InfoWrapper>
        <InfoItem>
          <Label>State: </Label>
          <span>{data.state}</span>
        </InfoItem>
        <InfoItem>
          <Label>Updated at: </Label>
          <span>{data.updatedAt.toDateString()}</span>
        </InfoItem>
        <InfoItem>
          <Label>Created at: </Label>
          <span>{data.createdAt.toDateString()}</span>
        </InfoItem>
      </InfoWrapper>
    </Root>
  )
}
