import { OrderItemType } from "../types";

export const addToCart = (item: OrderItemType) => {
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

export const updateCart = (index: number, data: OrderItemType) => {
  const cartData = JSON.parse(localStorage.getItem("tablewise_cart") || "[]");
  cartData[index] = data;
  localStorage.setItem("tablewise_cart", JSON.stringify(cartData));
};
