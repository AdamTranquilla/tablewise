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
  options?: OptionOrderType[];
  preselect: string[];
}

export const addToCart = (item: ItemType) => {
  const cartData = JSON.parse(localStorage.getItem("tablewise_cart") || "[]");
  cartData.push(item);
  localStorage.setItem("tablewise_cart", JSON.stringify(cartData));
};

export const removeFromCart = (index: number) => {
  const cartData = JSON.parse(localStorage.getItem("tablewise_cart") || "[]");
  cartData.splice(index, 1);
  localStorage.setItem("tablewise_cart", JSON.stringify(cartData));
};

export const emptyCart = () => {
  localStorage.setItem("tablewise_cart", "[]");
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem("tablewise_cart") || "[]");
};

export const updateCart = (index: number, data: ItemType) => {
  const cartData = JSON.parse(localStorage.getItem("tablewise_cart") || "[]");
  cartData[index] = data;
  localStorage.setItem("tablewise_cart", JSON.stringify(cartData));
};
