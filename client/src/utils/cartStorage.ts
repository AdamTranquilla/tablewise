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
  options?: OptionOrderType[];
}

export const addToCart = (item: ItemType) => {
  const cartData = JSON.parse(localStorage.getItem("tablewise_cart") || "[]");
  cartData.push(item);
  localStorage.setItem("tablewise_cart", JSON.stringify(cartData));
};

export const removeFromCart = (index: Number) => {
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
