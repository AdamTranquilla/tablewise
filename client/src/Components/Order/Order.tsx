import React from "react";
import "./Order.css";
import { useMutation } from "@apollo/client";
import { PLACE_ORDER } from "../../graphql/order";
import { emptyCart } from "../../utils/cartStorage";
import { OrderContext } from "../../context/Order";
import { addToCart } from "../../utils/cartStorage";
import socket from "../../utils/socket.io";

interface OptionOrderType {
  optionId: String;
  quantity?: Number;
  price?: Number;
  name?: String;
}

interface ItemType {
  itemId: String;
  quantity: Number;
  seatId: Number[];
  price?: Number;
  name?: String;
  options?: OptionOrderType[];
}

interface SplitEventResponseType {
  splitBy: Number;
  perSeatPrice: Number;
  item: ItemType;
}

export default function Table() {
  const getCartData = () => {
    let data = localStorage.getItem("tablewise_cart");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  const orderContext = React.useContext(OrderContext);
  const [placeOrderHandler, { loading, error, data }] = useMutation(
    PLACE_ORDER
  );

  React.useEffect(() => {
    socket.on("split_bill", function (data: SplitEventResponseType) {
      console.log(localStorage.getItem("tablewise_cart"));
      console.log(orderContext?.items?.length);
      orderContext?.setItems("ADD_ITEM", data.item);
      addToCart(data.item);
    });
  }, []);

  React.useEffect(() => {
    if (!loading && data) {
      emptyCart();
      orderContext?.setItems("EMPTY");
      alert(orderContext?.items?.length);
    }
  }, [loading, error, data]);

  const getOrderData = () => {
    let cart = JSON.parse(JSON.stringify(orderContext?.items));
    cart.forEach((item: ItemType) => {
      delete item.name;
      delete item.price;
      item.options?.forEach((option) => {
        delete option.name;
        delete option.price;
      });
    });
    return cart;
  };

  return (
    <div id="order-container">
      <div className="order-banner">
        <h3>Bill: Seat #1</h3>
        {JSON.stringify(orderContext?.items).substr(0, 20)}
        <button
          onClick={() => {
            placeOrderHandler({
              variables: { tableId: 1, items: getOrderData() },
            });
          }}
        >
          Pay
        </button>
      </div>
      <div className="order">
        <table>
          <tr className="order-header">
            <td className="order-items">
              <h4>Item</h4>
            </td>
            <td className="order-rate">
              <h4>Sub-Total</h4>
            </td>
            <td className="order-remove">
              <h4>Edit</h4>
            </td>
          </tr>
          {orderContext?.items?.map((item: ItemType, index: Number) => {
            return (
              <>
                <tr className="order-row">
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <button>X</button>
                  </td>
                </tr>
                <tr className="order-details">
                  <td colSpan={2}>
                    {item.options?.map((option) => {
                      return option.name;
                    })}
                  </td>
                </tr>
              </>
            );
          })}
          <tr className="order-footer">
            <td>Total</td>
            <td>$ 10.20</td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  );
}
