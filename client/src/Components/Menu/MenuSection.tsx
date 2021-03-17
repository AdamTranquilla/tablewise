import React from "react";
import Category from "./MenuSectionCat";
import "./Menu.css";

// import { makeStyles } from "@material-ui/core/styles";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function Section() {
  return (
    <div className="section-container">
      <span>Selected Section</span>
      <Category />
      <Category />
    </div>
  );
}
