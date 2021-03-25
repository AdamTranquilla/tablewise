import React from "react";
import "./Menu.css";

interface OptionOrderType {
  optionId: String;
  quantity?: Number;
  name: String;
  price: Number;
}

interface OptionType {
  _id: String;
  name: String;
  price: Number;
  editOption: (option: OptionOrderType) => void;
}

export default function Option({ _id, name, price, editOption }: OptionType) {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="option">
      <input
        type="checkbox"
        style={{ marginTop: 5 }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.checked)
            editOption({ optionId: _id, quantity, name, price });
        }}
      />
      <h3 style={{ margin: 0, marginBottom: 0 }}>{name}</h3>
      <h3 style={{ margin: 0, marginBottom: 0 }}>${price}</h3>
    </div>
  );
}
