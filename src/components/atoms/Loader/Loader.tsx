import React from "react"
import { Spinner } from "reactstrap"
import styled from "styled-components"
const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: center;
`

export default function Loader() {
  return (
    <Root>
      <div role="status" className="spinner-grow"></div>
      <div role="status" className="spinner-grow"></div>
      <div role="status" className="spinner-grow"></div>
    </Root>
  )
}
