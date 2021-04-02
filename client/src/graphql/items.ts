import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  {
    items {
      name
      presetOptionId
      options {
        name
        price
      }
      price
    }
  }
`;
