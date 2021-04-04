import React from "react";
import Category from "./MenuSectionCat";
import { SectionType } from "../../types";
import "./Menu.css";

export default function Section({ categories }: SectionType) {
  return (
    <div className="section-container">
      <div className="cat-container">
        {categories.map((category) => {
          return (
            <>
              <Category
                id={category._id}
                name={category.name}
                img={category.img}
              />
              {console.log("HEREEEE", category)}
            </>
          );
        })}
      </div>
    </div>
  );
}
