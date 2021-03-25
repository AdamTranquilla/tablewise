const Item = require("../models/items.mongo");
const Order = require("../models/orders.mongo");
const { getById, get, create } = require("../transactions");

exports.placeOrder = async (parent, args) => {
  let price = 0;
  let _items = await args.items.map(async (orderItem) => {
    let item = await getById(Item, orderItem.itemId);
    let itemPrice = 0;
    price += item.price * orderItem.quantity;
    itemPrice += item.price * orderItem.quantity;
    await orderItem.options.map(async (orderOption) => {
      let option = await getById(Option, orderOption.optionId);
      if (option && option.price) price += option.price * orderOption.quantity;
      itemPrice += option.price * orderOption.quantity;
    });
    orderItem.splitBill = itemPrice / orderItem.seatId.length;
    return orderItem;
  });

  let doc;

  await Promise.all(_items).then(async (d) => {
    console.log(args);
    doc = {
      orderItems: d[0],
      price,
      tableId: args.tableId,
      uniqueTableId: args.uniqueTableId,
    };
    doc = await create(Order, doc);
  });

  return doc;
};
