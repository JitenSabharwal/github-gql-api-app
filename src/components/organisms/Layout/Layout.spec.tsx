import Layout from "./Layout"
import React from "react"
import { shallow } from "enzyme"
describe("Layout", () => {
  let container: React.ReactElement
  beforeAll(
    () =>
      (container = (
        <Layout onBackClick={() => {}}>
          <div />
        </Layout>
      ))
  )
  it("Should render my component", () => {
    const component = shallow(container)
  })
  it("Should render initial layout", () => {
    const component = shallow(container)
    expect(component.getElements()).toMatchSnapshot()
  })
  it("Should render initial layout without back button", () => {
    const component = shallow(
      <Layout>
        <div />
      </Layout>
    )
    expect(component.getElements()).toMatchSnapshot()
  })
})
