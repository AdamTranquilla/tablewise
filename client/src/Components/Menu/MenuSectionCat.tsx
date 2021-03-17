import React from "react";
import Item from "./MenuSectionCatItem";
import "./Menu.css";

export default function Category() {
  return (
    <div className="cat-container">
      <span>Selected Category</span>
      <Item />
      <Item />
    </div>
  );
}
