const Cart = require("../models/cart.mongo");
const Item = require("../models/items.mongo");
const Option = require("../models/options.mongo");
const mongoose = require("mongoose");
const { getById } = require("../transactions.js");

const calculatePrice = async (item) => {
  let itemPrice = 0;
  let _item = await getById(Item, item.itemId);
  itemPrice += _item.price;
  await item.options.map(async (orderOption) => {
    let option = await getById(Option, orderOption.optionId);
    if (option && option.price) itemPrice += option.price;
    itemPrice += option.price;
  });
  item.splitBill = itemPrice / item.seatId.length;
};

const addToCart = async (uniqueTableId, tableId, orderItem) => {
  try {
    let count = await Cart.countDocuments({ uniqueTableId });
    await calculatePrice(orderItem);
    if (count === 0) {
      let cart = new Cart({
        uniqueTableId,
        tableId,
        orderItems: [orderItem],
      });
      await cart.save();
      console.log("SACING");
    } else {
      let d = await Cart.updateOne(
        { uniqueTableId },
        { $push: { orderItems: orderItem } }
      );
      console.log("DDDD");
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addToCart,
};
