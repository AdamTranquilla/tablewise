import React from "react";

interface OptionOrderType {
  optionId: string;
  price?: number;
  name?: string;
}

interface ItemType {
  itemId: string;
  seatId: number[];
  price?: number;
  name?: string;
  cartItemId?: string;
  options?: OptionOrderType[];
  preselect: string[];
}

export const OrderContext = React.createContext<
  | {
      items: ItemType[] | undefined;
      removeItem: (index: number) => void;
      updateItem: (index: number, data: ItemType) => void;
      tableNo: number;
      tableId: string;
      seatNo: number;
      setItems: (action: string, item?: ItemType) => void;
    }
  | undefined
>(undefined);
