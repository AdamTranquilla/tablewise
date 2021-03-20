import React from "react";
import "./Order.css";

export default function Table() {
  const items = [
    {
      _id: "string",
      name: "Item 1",
      price: 10.0,
      options: [
        {
          _id: "optid1",
          name: "optname 1",
          price: 1.0,
        },
        {
          _id: "optid2",
          name: "optname2",
          price: 3.0,
        },
      ],
    },
    {
      _id: "string2",
      name: "Item 2",
      price: 10.0,
      options: [
        {
          _id: "optid1",
          name: "optname 1",
          price: 2.5,
        },
      ],
    },
  ];

  return (
    <div id="order-container">
      <div className="order-banner">
        <h3>Bill: Seat #1</h3>
        <button>Pay</button>
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
          {items.map((item, index) => {
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
                    option1, option2, fix this
                    {/* {item.map((option, index) => [option].name)} */}
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
