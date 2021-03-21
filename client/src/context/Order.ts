import React from "react";

interface OptionOrderType {
  optionId: String;
  quantity?: Number;
  price: Number;
  name: String;
}

interface ItemType {
  itemId: String;
  quantity: Number;
  seatId: Number[];
  price: Number;
  name: String;
  options?: OptionOrderType[];
}

export const OrderContext = React.createContext<
  | { items: ItemType[] | undefined; setItems: (item: ItemType) => void }
  | undefined
>(undefined);
