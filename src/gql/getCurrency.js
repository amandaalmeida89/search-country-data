import { gql } from "@apollo/client";

const GetCurrencyQuery = gql`
  query GetCurrency($countryName: String!) {
    item(where: {class_id: {_eq: "Country"}, nameEn: {_ilike: $countryName} }) {
      nameEn
      currency: statements(where: {property_id: {_eq: "currency"}}) {
        object {
          nameEn
        }
      }
    }
  }
`;
export default GetCurrencyQuery
