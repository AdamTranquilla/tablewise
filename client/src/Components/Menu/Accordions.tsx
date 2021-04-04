import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

export const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    // "&:before": {
    //   display: "none",
    // },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

export const AccordionBtn = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .07)",
    // border: "1px solid rgba(0, 0, 0, .125)",
    minHeight: 30,
    "&$expanded": {
      minHeight: 5,
    },
  },
  content: {
    "&$expanded": {
      margin: "6px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

export const AccordionContent = withStyles((theme) => ({
  root: {
    padding: 5,
  },
}))(MuiAccordionDetails);
