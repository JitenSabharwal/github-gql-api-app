import TotalCount from "./TotalCount"
import React from "react"
import { shallow } from "enzyme"

describe("TotalCount", () => {
  let container: React.ReactElement
  beforeAll(
    () =>
      (container = (
        <TotalCount value={100} label={"Total number of found issues"} />
      ))
  )
  it("Should render the compoent", () => {
    const component = shallow(container)
  })
  it("Should render the layout", () => {
    const component = shallow(container)
    expect(component.getElements()).toMatchSnapshot()
  })
})
