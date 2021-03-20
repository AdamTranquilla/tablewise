import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
  query Get_Category($id: String!) {
    category(id: $id) {
      items {
        _id
        name
        price
        options {
          _id
          price
          name
        }
      }
    }
  }
`;
