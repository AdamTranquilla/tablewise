export interface CategoryType {
  _id: string;
  name: string;
  img: string;
}

export interface SectionType {
  _id: string;
  name: string;
  categories: CategoryType[];
}

export interface OptionOrderType {
  optionId: string;
  price?: number;
  name?: string;
}

export interface OrderItemType {
  itemId: string;
  name?: string;
  price?: number;
  options?: OptionOrderType[];
  presetOptionId: string[];
  seatId: number[];
  cartItemId?: string;
}

export interface OptionType {
  _id: string;
  name: string;
  price: number;
  isSelected: boolean;
  editOption: (option: OptionOrderType) => void;
  removeOption: (optionId: string) => void;
}

export interface ItemType {
  _id: string;
  name: string;
  price: number;
  options: OptionType[];
  presetOptionId: string[];
}

export interface TableProps {
  mySeat?: number;
  filledSeats: number[];
  totalSeats: number;
  onClick?: (seatId: number) => void;
}

export interface CartItemType {
  _id: string;
  itemId: string;
  seatId: number[];
  options: CartOptionType[];
  splitBill: number;
  uniqueItemId?: string;
}

export interface CartOptionType {
  optionId: string;
}
