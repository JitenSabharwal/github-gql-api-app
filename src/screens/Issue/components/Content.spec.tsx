import Content, { ContentData } from "./Content"
import React from "react"
import { shallow } from "enzyme"
import { IssueState } from "../../../generated/graphql"

const mockData: ContentData = {
  createdAt: new Date(),
  updatedAt: new Date(),
  title: "Sample Issue",
  body: "This is just for testing purpose",
  author: "Jiten",
  state: IssueState.Open,
}
describe("Content", () => {
  let component: React.ReactElement
  beforeAll(() => (component = <Content data={mockData} />))

  it("Should render Content Component", () => {
    const container = shallow(component)
  })

  it("Should render the layout", () => {
    const container = shallow(component)
    expect(container.getElements()).toMatchSnapshot()
  })
})
