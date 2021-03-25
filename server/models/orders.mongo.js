const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  tableId: {
    type: Number,
    required: [true, "Table Number is required"],
  },
  uniqueTableId: {
    type: String,
    required: [true, "Unique table id is required"],
  },
  billPaid: [
    {
      type: String,
      default: [],
    },
  ],
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
            default: 0,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("orders", orderSchema);
