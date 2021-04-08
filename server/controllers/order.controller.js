const Item = require("../models/items.mongo");
const Order = require("../models/orders.mongo");
const Option = require("../models/options.mongo");
const { getById, get, create } = require("../transactions");
const { getSession } = require("../utils/stripe");

exports.placeOrder = async (parent, args) => {
  let price = 0;
  let _items = await args.items.map(async (orderItem) => {
    let item = await getById(Item, orderItem.itemId);
    let itemPrice = 0;
    price += item.price;
    itemPrice += item.price;
    await orderItem.options.map(async (orderOption) => {
      let option = await getById(Option, orderOption.optionId);
      if (option && option.price) price += option.price;
      itemPrice += option.price;
    });
    orderItem.splitBill = itemPrice / orderItem.seatId.length;
    return orderItem;
  });

  let doc;

  let totalSplitBill = 0;
  await Promise.all(_items).then(async (d) => {
    d.forEach((item) => {
      console.log(item);
      totalSplitBill += item.splitBill;
    });

    doc = {
      orderItems: d[0],
      price,
      tableId: args.tableId,
      uniqueTableId: args.uniqueTableId,
    };

    let count = await Order.count({ uniqueTableId: args.uniqueTableId });
    if (count === 0) {
      doc = await create(Order, doc);
    } else {
      await Order.updateOne(
        {
          uniqueTableId: args.uniqueTableId,
        },
        {
          $push: { orderItems: doc.orderItems },
          $inc: { price: doc.price },
        }
      );
      doc = await Order.find({ uniqueTableId: args.uniqueTableId });
      doc = doc[0];
    }
  });

  let session = await getSession(totalSplitBill || 10, "Test", doc._id);
  doc.stripeSessionId = session.id;

  return doc;
};

exports.markAsPaid = async function (req, res) {
  try {
    // JSON token verification (jwt)
    await Order.updateOne({ _id: req.params.orderId }, { paid: true });
    res.send("You have paid for order: " + req.params.orderId);
  } catch (err) {
    res.send({ status: "fail", err });
  }
};
