import React from "react";
import "./Menu.css";

interface OptionType {
  _id: String;
  name: String;
  price: Number;
}

export default function Option({ _id, name, price }: OptionType) {
  return (
    <div className="option">
      <input type="checkbox" style={{ marginTop: 5 }} />
      <h3 style={{ margin: 0, marginBottom: 0 }}>{name}</h3>
      <h3 style={{ margin: 0, marginBottom: 0 }}>${price}</h3>
    </div>
  );
}
