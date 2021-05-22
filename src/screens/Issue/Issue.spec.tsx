import Issue from "./Issue"
import React from "react"
import { shallow } from "enzyme"

describe("Issue", () => {
  it("should render a <div />", () => {
    const container = shallow(<Issue />)
    expect(container.find("div").length).toEqual(1)
  })
})
