import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  {
    items {
      _id
      name
      presetOptionId
      options {
        _id
        name
        price
      }
      price
    }
  }
`;
