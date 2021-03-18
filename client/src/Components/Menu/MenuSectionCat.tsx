import React from "react";
import Item from "./MenuSectionCatItem";
import "./Menu.css";
import { Accordion, AccordionBtn, AccordionContent } from "./Accordions";

interface CategoryProps {
  name: string;
  id?: string;
}

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
    <Accordion square onChange={handleChange("id")}>
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
