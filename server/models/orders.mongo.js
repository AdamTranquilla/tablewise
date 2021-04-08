const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    tableId: {
      type: Number,
      required: [true, "Table Number is required"],
    },
    uniqueTableId: {
      type: String,
      required: [true, "Unique table id is required"],
      unique: [true, "Unique Table Id should be unique"],
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
        uniqueItemId: {
          type: String,
        },
        paid: {
          type: Boolean,
          default: false,
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
          },
        ],
      },
    ],
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orderSchema);
