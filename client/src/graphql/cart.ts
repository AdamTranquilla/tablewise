import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation ADD_TO_CART(
    $tableId: Int!
    $item: InputItemType!
    $uniqueTableId: String!
  ) {
    addToCart(tableId: $tableId, item: $item, uniqueTableId: $uniqueTableId) {
      _id
    }
  }
`;

export const GET_CART = gql`
  query GET_CART($uniqueTableId: String!, $seatNo: Int!) {
    cart(uniqueTableId: $uniqueTableId, seatNo: $seatNo) {
      _id
      uniqueTableId
      tableId
      orderItems {
        itemId
        uniqueItemId
        options {
          optionId
        }
        seatId
        splitBill
      }
    }
  }
`;
