import React from "react";

interface OptionOrderType {
  optionId: String;
  quantity?: Number;
  price?: Number;
  name?: String;
}

interface ItemType {
  itemId: String;
  quantity: Number;
  seatId: Number[];
  price?: Number;
  name?: String;
  cartItemId?: String;
  options?: OptionOrderType[];
}

export const OrderContext = React.createContext<
  | {
      items: ItemType[] | undefined;
      removeItem: (index: number) => void;
      tableNo: Number;
      seatNo: Number;
      setItems: (action: String, item?: ItemType) => void;
    }
  | undefined
>(undefined);
