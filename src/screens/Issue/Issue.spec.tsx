import Issue from "./Issue"
import React from "react"
import { shallow } from "enzyme"
import { BrowserRouter } from "react-router-dom"

describe("Issue", () => {
  let container: React.ReactElement
  beforeAll(
    () =>
      (container = (
        <BrowserRouter>
          <Issue />
        </BrowserRouter>
      ))
  )
  it("Should render a <div />", () => {
    const component = shallow(container)
  })
  it("Should render the layout", () => {
    const component = shallow(container)
    expect(component.getElements()).toMatchSnapshot()
  })
})
