import Header from "./index"
import React from "react"
import { shallow } from "enzyme"

describe("Header", () => {
  let container: React.ReactElement
  beforeAll(() => (container = <Header heading={"Heading"} />))
  it("Should render Header", () => {
    const component = shallow(container)
  })
  it("Should render initial layout", () => {
    const component = shallow(container)
    expect(component.getElements()).toMatchSnapshot()
  })

  it("Should render initial layout with back button", () => {
    const component = shallow(
      <Header heading={"Heading"} onBackClick={() => {}} />
    )
    expect(component.getElements()).toMatchSnapshot()
  })
})
