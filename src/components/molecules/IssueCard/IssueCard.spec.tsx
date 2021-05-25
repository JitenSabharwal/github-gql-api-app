import Card, { Issue } from "./IssueCard"
import React from "react"
import { shallow } from "enzyme"

const cardMockData: Issue = {
  id: 1,
  createdAt: new Date(),
  title: "Sample Issue",
  description: "This is just for testing purpose",
  createdBy: "Jiten",
  repository: "Sample Test",
  commentCount: 15,
}
describe("Card", () => {
  let component: React.ReactElement
  beforeAll(
    () => (component = <Card issue={cardMockData} onShowMore={() => {}} />)
  )
  it("Should render a <div />", () => {
    const container = shallow(component)
  })
  it("Should render the layout", () => {
    const container = shallow(component)
    expect(container.getElements()).toMatchSnapshot()
  })
})
