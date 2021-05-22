import React from "react"
import styled from "styled-components"
import Icon from "../../atoms/Icon/Icon"
import Logo from "../../../logo.svg"

const Root = styled.header`
  display: flex;
  background: #24292e;
  color: #ffffffe6;
  padding: 8px 24px;
`
const Heading = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  line-height: 36px;
  width: 100%;
`
const BackButton = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-right: 16px;
  line-height: 24px;
`
const ButtonText = styled.span`
  font-size: 13px;
`

export default function Header({
  onBackClick,
  heading,
}: {
  onBackClick?: () => void
  heading: string
}) {
  return (
    <Root>
      {onBackClick && (
        <>
          <BackButton onClick={onBackClick}>
            <Icon icon={Logo} />
            <ButtonText>{"Back to Search"}</ButtonText>
          </BackButton>
        </>
      )}
      <Heading>{heading}</Heading>
    </Root>
  )
}
