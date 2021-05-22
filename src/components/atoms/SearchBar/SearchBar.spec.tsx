import React from "react"
import SearchBar from "./SearchBar"
import { shallow } from "enzyme"

describe("SearchBar", () => {
  let container: React.ReactElement
  beforeAll(() => (container = <SearchBar />))
  it("Should render SearchBar", () => {
    const component = shallow(container)
  })
  it("Should render the initial layout", () => {
    const component = shallow(container)
    expect(component.getElements()).toMatchSnapshot()
  })
})
