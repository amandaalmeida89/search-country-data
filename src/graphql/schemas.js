import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    countries(value:String):[Country]
  }

  type Country {
    name: String,
    currency: String
  }
`;
export default typeDefs;