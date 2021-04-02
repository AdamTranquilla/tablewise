// const Cart = require("../models/cart.mongo");
// const Item = require("../models/item.mongo");
// const Option = require("");
// const mongoose = require("mongoose");

// const calculatePrice = async (item) => {
//   // let item = await getById(Item, item.itemId);
//   let itemPrice = 0;
//   price += item.price;
//   itemPrice += item.price;
//   await item.options.map(async (orderOption) => {
//     let option = await getById(Option, orderOption.optionId);
//     if (option && option.price) price += option.price;
//     itemPrice += option.price;
//   });
//   orderItem.splitBill = itemPrice / orderItem.seatId.length;
// };

// const addToCart = async (uniqueTableId, tableId, orderItem) => {
//   try {
//     let count = await Cart.countDocuments({ uniqueTableId });
//     orderItem.splitBill =
//     if (count === 0) {
//       let cart = new Cart({
//         uniqueTableId,
//         tableId,
//         orderItems: [orderItem],
//       });
//       cart.save();
//     } else {
//       Cart.updateOne({ uniqueTableId }, { $push: { orderItems: orderItem } });
//     }
//   } catch (err) {
//     throw err;
//   }
// };

// module.exports = {
//   addToCart,
// };
