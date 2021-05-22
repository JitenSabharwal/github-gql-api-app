import React from "react"
import Icon from "./Icon"
import { shallow } from "enzyme"
import Logo from "../../../logo.svg"
describe("Icon", () => {
  let container: React.ReactElement
  beforeAll(() => (container = <Icon icon={Logo} />))

  it("Should render Icon", () => {
    const component = shallow(container)
  })
})
