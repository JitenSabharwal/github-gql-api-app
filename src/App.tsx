import "./App.css"
import { ApolloProvider } from "@apollo/client/react"
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import SearchBar from "./components/atoms/SearchBar/SearchBar"
import Routes from "./screens/routes"
import { GRAPHQL_URL, GRAPHQL_TOKEN } from "./config/index"
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

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )
}

export default App
