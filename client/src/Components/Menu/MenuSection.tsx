import React from "react";
import Category from "./MenuSectionCat";
import "./Menu.css";

interface CategoryType {
  _id: string;
  name: string;
}
interface SectionProps {
  sectionName: string;
  id: string;
  categories: CategoryType[];
}

export default function Section({ sectionName, id, categories }: SectionProps) {
  return (
    <div className="section-container">
      <h3>{sectionName}</h3>
      <div className="cat-container">
        {categories.map((category) => {
          return <Category name={category.name} id={category._id} />;
        })}
      </div>
    </div>
  );
}
