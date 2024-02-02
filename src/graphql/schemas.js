import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    countries(value:String):[Country]
  }

  type Country {
    name: String,
    flag: String,
    symbol: String,
    phoneCode: String,
    currency: String
  }
`;
export default typeDefs;