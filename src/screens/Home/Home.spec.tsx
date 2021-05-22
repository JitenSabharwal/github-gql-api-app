import Home from "./Home"
import React from "react"
import { shallow } from "enzyme"
describe("Home", () => {
  let component: React.ReactElement
  beforeAll(() => (component = <Home totalCount={100} issues={[]} />))
  it("Should render Home Component", () => {
    const container = shallow(component)
  })
  it("Should render the layout", () => {
    const container = shallow(component)
    expect(container.getElements()).toMatchSnapshot()
  })
})
