import React from "react";
import Category from "./MenuSectionCat";
import { SectionType } from "../../types";
import "./Menu.css";

export default function Section({ name, _id, categories }: SectionType) {
  return (
    <div className="section-container">
      <h3>{name}</h3>
      <div className="cat-container">
        {categories.map((category) => {
          return <Category name={category.name} id={category._id} />;
        })}
      </div>
    </div>
  );
}
