const mongoose = require("mongoose");
const Schema = mongoose.Schem;

const orderSchema = new Schema({
  id: {
    type: Schema.ObjectId,
  },
  tableId: {
    type: Number,
    required: [true, "Table Number is required"],
  },
  price: {
    type: Number,
    required: [true, "Price of order is required"],
  },
  orderItems: [
    {
      itemId: {
        type: Schema.ObjectId,
        required: [true, "Item Id is required"],
      },
      quantity: {
        type: Number,
        default: 1,
      },
      seatId: [
        {
          type: Number,
          default: [],
        },
      ],
      splitBill: {
        type: Number,
        required: [true, "Split bill is required"],
      },
      options: [
        {
          optionId: Schema.ObjectId,
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("orders", orderSchema);
