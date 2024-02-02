import { gql } from '@apollo/client';

const GetCurrencyQuery = gql`
  query GetCurrency($countryName: String!) {
    countries(value: $countryName) {
      name
      phoneCode
      flag
      symbol
      currency
    }
  }
`;
export default GetCurrencyQuery;
