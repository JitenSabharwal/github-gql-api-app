import React, { useState } from "react"
import styled from "styled-components"
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap"
const Root = styled.div`
  display: flex;
`
enum IssueState {
  Open = "Open",
  Closed = "Closed",
}
type Props = {
  onSubmit: (state: IssueState, text: string) => void
}
export default function SearchBar({ onSubmit }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [text, setText] = useState("")
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
        <Input
          onChange={(e) => {
            setText(e.target.value)
          }}
          type="text"
          value={text}
        />
      </InputGroup>
      <Button
        variant="outline-info"
        className="btn-info"
        onClick={() => onSubmit(issueState, text.trim())}
      >
        Search
      </Button>
    </Root>
  )
}
