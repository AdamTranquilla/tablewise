import { gql } from "@apollo/client";

export const PLACE_ORDER = gql`
  mutation PLACE_ORDER(
    $tableId: Int
    $items: [InputItemType]
    $uniqueTableId: String!
  ) {
    placeOrder(
      tableId: $tableId
      items: $items
      uniqueTableId: $uniqueTableId
    ) {
      _id
    }
  }
`;
