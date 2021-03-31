import React from "react";

interface OptionOrderType {
  optionId: String;
  price?: Number;
  name?: String;
}

interface ItemType {
  itemId: String;
  seatId: Number[];
  price?: Number;
  name?: String;
  cartItemId?: String;
  options?: OptionOrderType[];
  preselect: String[];
}

export const OrderContext = React.createContext<
  | {
      items: ItemType[] | undefined;
      removeItem: (index: number) => void;
      updateItem: (index: number, data: ItemType) => void;
      tableNo: Number;
      tableId: String;
      seatNo: Number;
      setItems: (action: String, item?: ItemType) => void;
    }
  | undefined
>(undefined);
