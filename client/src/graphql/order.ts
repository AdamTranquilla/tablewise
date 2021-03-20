import { gql } from "@apollo/client";

export const PLACE_ORDER = gql`
  mutation PLACE_ORDER($tableId: Int, $items: [InputItemType]) {
    placeOrder(tableId: $tableId, items: $items) {
      _id
    }
  }
`;
