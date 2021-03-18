import React from "react";
import "./Menu.css";

interface OptionType {
  _id: String;
  name: String;
  price: Number;
}

export default function Option({ _id, name, price }: OptionType) {
  return (
    <div /* className="option-container" */>
      <h3 style={{ margin: 0, marginBottom: 5 }}>
        {name}${price}
      </h3>
    </div>
  );
}
