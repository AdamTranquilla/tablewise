interface OptionType {
  _id: string;
}

interface ItemType {
  _id: string;
  options?: OptionType[];
}

export const addToCart = (item: ItemType) => {
  const cartData = JSON.parse(localStorage.getItem("tablewise_cart") || "[]");
  cartData.push(item);
  localStorage.setItem(JSON.stringify(cartData));
};

export const removeFromCart = (index: Number) => {
  const cartData = JSON.parse(localStorage.getItem("tablewise_cart") || "[]");
  cartData.splice(index, 1);
  localStorage.setItem(JSON.stringify(cartData));
};
