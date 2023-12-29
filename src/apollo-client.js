import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://datastory-cloud-v2.stellate.sh/",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
