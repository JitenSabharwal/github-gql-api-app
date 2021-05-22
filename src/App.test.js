import App from "./App"
import { shallow } from "enzyme"

describe("App", () => {
  it("Should render the App", () => {
    const container = shallow(<App />)
  })
  it("Should render the initial layout", () => {
    const container = shallow(<App />)
    expect(container.getElements()).toMatchSnapshot()
  })
})
