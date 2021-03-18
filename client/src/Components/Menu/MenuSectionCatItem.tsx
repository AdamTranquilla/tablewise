import React from "react";
import "./Menu.css";
import Option from "./MenuSectionCatItemOptions";
import { Accordion, AccordionBtn, AccordionContent } from "./Accordions";
interface OptionType {
  _id: String;
  name: String;
  price: Number;
}
interface ItemType {
  _id: String;
  name: String;
  price: Number;
  options: Array<OptionType>;
}

export default function Item({ _id, name, price, options }: ItemType) {
  const [expanded, setExpanded] = React.useState<string | false>(`panel${_id}`);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div /* className="item-container" */>
      <Accordion square onChange={handleChange(`panel${_id}`)}>
        <AccordionBtn aria-controls="panel${id}-content">
          <h3 style={{ margin: 0, marginBottom: 5 }}>{name}</h3>
          <h3 style={{ margin: 0, marginBottom: 5 }}>${price}</h3>
        </AccordionBtn>
        <AccordionContent>
          <div className="option-container">
            {options.map((option) => {
              return (
                <Option
                  _id={option._id}
                  name={option.name}
                  price={option.price}
                />
              );
            })}
          </div>
        </AccordionContent>
      </Accordion>
    </div>
  );
}
