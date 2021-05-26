import React from "react"
import styled from "styled-components"
import { Chrono } from "react-chrono"
const Root = styled.div`
  min-width: 45vw;
  height: 700px;
`
type Props = {
  data: {
    createdAt: Date
    body: string
    createdBy: string
  }[]
}
export default function Comments({ data }: Props) {
  return (
    <Root>
      <Chrono
        cardHeight={100}
        items={data.map((d) => {
          return {
            cardTitle: d.createdBy,
            cardSubtitle: d.body,
            title: d.createdAt.toDateString(),
          }
        })}
        mode="VERTICAL"
      />
    </Root>
  )
}
