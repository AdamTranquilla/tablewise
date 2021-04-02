import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation ADD_TO_CART(
    $tableId: Int!
    $item: InputItemType!
    $uniqueTableId: String!
  ) {
    addToCart(tableId: $tableId, item: $item, uniqueTableId: $uniqueTableId) {
      message
    }
  }
`;

//export const GET_CART = gql``;
