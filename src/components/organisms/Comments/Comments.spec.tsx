import Comments from "./Comments"
import React from "react"
import { shallow } from "enzyme"

describe("Comments", () => {
  let component: React.ReactElement
  beforeAll(() => (component = <Comments />))
  it("Should render Comments", () => {
    const container = shallow(component)
  })
  it("Should render the layout", () => {
    const container = shallow(component)
    expect(container.getElements()).toMatchSnapshot()
  })
})
