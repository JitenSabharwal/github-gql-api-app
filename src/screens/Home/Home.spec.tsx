import Home from "./Home"
import React from "react"
import { shallow } from "enzyme"
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { GRAPHQL_URL, GRAPHQL_TOKEN } from "../../config/index"
import { ApolloProvider } from "@apollo/client/react"
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: GRAPHQL_TOKEN ? `Bearer ${GRAPHQL_TOKEN}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

describe("Home", () => {
  let component: React.ReactElement
  beforeAll(
    () =>
      (component = (
        <ApolloProvider client={client}>
          <Home totalCount={100} issues={[]} />
        </ApolloProvider>
      ))
  )
  it("Should render Home Component", () => {
    const container = shallow(component)
  })
  it("Should render the layout", () => {
    const container = shallow(component)
    expect(container.getElements()).toMatchSnapshot()
  })
})
