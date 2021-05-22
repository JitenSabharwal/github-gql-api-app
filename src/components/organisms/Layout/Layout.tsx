import React from "react"
import styled from "styled-components"
import Header from "../../molecules/Header"
const Root = styled.div``
const Body = styled.div`
  margin: 24px;
`
export default function Layout({
  children,
  onBackClick,
}: {
  children: React.ReactNode
  onBackClick?: () => void
}) {
  return (
    <Root>
      <Header onBackClick={onBackClick} heading={"GitHub Issue Search"} />
      <Body>{children}</Body>
    </Root>
  )
}
