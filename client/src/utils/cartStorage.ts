import { OrderItemType } from "../types";

export const addToCart = (item: OrderItemType) => {
  return;
  const cartData = JSON.parse(localStorage.getItem("tablewise_cart") || "[]");
  cartData.push(item);
  localStorage.setItem("tablewise_cart", JSON.stringify(cartData));
};

export const removeFromCart = (index: number) => {
  return;
  const cartData = JSON.parse(localStorage.getItem("tablewise_cart") || "[]");
  cartData.splice(index, 1);
  localStorage.setItem("tablewise_cart", JSON.stringify(cartData));
};

export const emptyCart = () => {
  return;
  localStorage.setItem("tablewise_cart", "[]");
};

export const getCart = () => {
  return [];
  return JSON.parse(localStorage.getItem("tablewise_cart") || "[]");
};

export const updateCart = (index: number, data: OrderItemType) => {
  return;
  const cartData = JSON.parse(localStorage.getItem("tablewise_cart") || "[]");
  cartData[index] = data;
  localStorage.setItem("tablewise_cart", JSON.stringify(cartData));
};
