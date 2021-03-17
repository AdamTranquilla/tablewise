import React from "react";
import "./Menu.css";
import Option from "./MenuSectionCatItemOptions";

export default function Item() {
  return (
    <div className="item-container">
      <span>Selected Item</span>
      <Option />
      <Option />
    </div>
  );
}
