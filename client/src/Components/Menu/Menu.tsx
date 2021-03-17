import React, { useState } from "react";
import Section from "./MenuSection";
import "./Menu.css";

export default function Menu() {
  //load menu here
  //load sections here

  const [selectedSection, setSection] = useState("Apps");

  const sections: string[] = ["Apps", "Mains", "Deserts", "Drinks"];

  return (
    <div id="menu-container">
      <h3>Menu</h3>

      <div className="cat-btns">
        {sections.map((section) => {
          return (
            <button
              value={section}
              type="button"
              onClick={() => {
                setSection(section);
              }}
              className={
                section === selectedSection ? "selected-section-button" : ""
              }
            >
              {section}
            </button>
          );
        })}
      </div>

      <Section />
    </div>
  );
}
