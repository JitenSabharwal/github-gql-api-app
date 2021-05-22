import React from "react"
import styled from "styled-components"

const Root = styled.div`
  display: flex;
  width: 100%;
  margin-top: 8px;
  font-size: 13px;
  line-height: 16px;
`
const Text = styled.span`
  margin-right: 8px;
`
const Count = styled.span`
  color: #6c757d;
`
export default function TotalCount({
  value,
  label,
}: {
  value: number
  label: string
}) {
  return (
    <Root>
      <Text>{label}</Text>
      <Count>{value}</Count>
    </Root>
  )
}
