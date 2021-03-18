import React from "react";
import Item from "./MenuSectionCatItem";
import "./Menu.css";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

interface CategoryProps {
  name: string;
  id?: string;
}

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionBtn = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const items = [
  {
    _id: "string",
    name: "Item 1",
    price: 10,
    options: [
      {
        _id: "optid1",
        name: "optname 1",
        price: 10,
      },
      {
        _id: "optid2",
        name: "optname 2",
        price: 12,
      },
    ],
  },
  {
    _id: "string2",
    name: "Item 2",
    price: 10,
    options: [
      {
        _id: "optid1",
        name: "optname 1",
        price: 10,
      },
      {
        _id: "optid2",
        name: "optname 2",
        price: 12,
      },
    ],
  },
];

export default function Category({ name, id }: CategoryProps) {
  const [expanded, setExpanded] = React.useState<string | false>(`panel${id}`);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion square onChange={handleChange(`panel${id}`)}>
      <AccordionBtn aria-controls="panel${id}-content" id={id}>
        <h3 style={{ margin: 0, marginBottom: 5 }}>{name}</h3>
      </AccordionBtn>
      <AccordionContent>
        <div className="item-container">
          {items.map((item) => {
            return (
              <Item
                _id={item._id}
                name={item.name}
                price={item.price}
                options={item.options}
              />
            );
          })}
        </div>
      </AccordionContent>
    </Accordion>
  );
}
