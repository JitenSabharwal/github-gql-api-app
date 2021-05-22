import React, { useState } from "react"
import styled from "styled-components"
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
const Root = styled.div`
  display: flex;
`
enum IssueState {
  Open = "Open",
  Closed = "Closed",
}
export default function SearchBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [issueState, setIssueState] = useState(IssueState.Open)
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen)
  const updateIssueState = (state: IssueState) => setIssueState(state)
  return (
    <Root>
      <InputGroup>
        <InputGroupButtonDropdown
          addonType="append"
          isOpen={dropdownOpen}
          toggle={toggleDropDown}
        >
          <DropdownToggle caret>Issue: {issueState}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Issue Status</DropdownItem>
            <DropdownItem onClick={() => updateIssueState(IssueState.Open)}>
              Open
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => updateIssueState(IssueState.Closed)}>
              Closed
            </DropdownItem>
          </DropdownMenu>
        </InputGroupButtonDropdown>
        <Input onChange={() => {}} type="text" />
      </InputGroup>
    </Root>
  )
}
