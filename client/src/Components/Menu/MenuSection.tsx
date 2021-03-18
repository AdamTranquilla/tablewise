import React from "react";
import Category from "./MenuSectionCat";
import "./Menu.css";
interface SectionProps {
  sectionName: string;
}

export default function Section({ sectionName }: SectionProps) {
  // fetch categories for this section
  const categories = [
    { name: "Cat 1", _id: "str1" },
    { name: "Cat 2", _id: "str2" },
    { name: "Cat 3", _id: "str3" },
  ];

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
