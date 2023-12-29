import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../apollo-client";

function App({ Component, pageProps }) {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default App