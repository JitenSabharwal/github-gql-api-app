import React from "react"
import styled from "styled-components"
import {
  Card,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
} from "reactstrap"

export interface Issue {
  id: number
  createdAt: Date
  title: string
  description: string
  createdBy: string
  repository: string
  commentCount: number
}

type Props = {
  issue: Issue
  onShowMore: (id: number) => void
}

const Root = styled.div`
  display: flex;
  max-width: 300px;
  max-height: 500px;
  margin-top: 24px;
`
const Description = styled.div`
  line-height: 1.5em;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`
export default function IssueCard({ issue, onShowMore }: Props) {
  const {
    id,
    createdAt,
    title,
    description,
    createdBy,
    repository,
    commentCount,
  } = issue
  return (
    <Root>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            created by {createdBy} for {repository}
          </CardSubtitle>
          <Description>{description}</Description>
          <CardLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onShowMore(id)
            }}
          >
            View in detail
          </CardLink>
        </CardBody>
      </Card>
    </Root>
  )
}
