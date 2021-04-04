import React from "react";
import { OptionType } from "../../types";
import "./Menu.css";

export default function Option({
  _id,
  name,
  price,
  editOption,
  removeOption,
  isSelected,
  showPrice,
}: OptionType) {
  const [selected, setSelected] = React.useState(isSelected || false);

  return (
    <div className="option">
      <input
        type="checkbox"
        checked={selected}
        style={{ marginTop: 5 }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.checked) {
            editOption({ optionId: _id, name, price });
          } else {
            removeOption(_id);
          }
          setSelected(e.target.checked);
        }}
      />
      <h3 style={{ margin: 0, marginBottom: 0 }}>{name}</h3>
      {showPrice ? (
        <h3 style={{ margin: 0, marginBottom: 0 }}>${price}</h3>
      ) : null}
    </div>
  );
}
