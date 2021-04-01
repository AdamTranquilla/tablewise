import React from "react";
import { OrderItemType } from "../types";

export const OrderContext = React.createContext<
  | {
      items: OrderItemType[] | undefined;
      removeItem: (index: number) => void;
      updateItem: (index: number, data: OrderItemType) => void;
      tableNo: number;
      tableId: string;
      seatNo: number;
      setItems: (action: string, item?: OrderItemType) => void;
    }
  | undefined
>(undefined);
