import React from "react";
import "./Menu.css";
import Option from "./MenuSectionCatItemOptions";
import { Accordion, AccordionBtn, AccordionContent } from "./Accordions";
import { addToCart } from "../../utils/cartStorage";

import { OrderContext } from "../../context/Order";

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
interface OptionOrderType {
  optionId: String;
  quantity?: Number;
  name: String;
  price: Number;
}

export default function Item({ _id, name, price, options }: ItemType) {
  const [expanded, setExpanded] = React.useState<string | false>(`panel${_id}`);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedOptions, setOptions] = React.useState<OptionOrderType[]>([]);

  const addOption = ({ optionId, quantity, name, price }: OptionOrderType) => {
    if (typeof quantity === "undefined") {
      quantity = 0;
    }
    selectedOptions.push({ optionId, quantity, name, price });
  };

  const add = () => {
    let orderItem = {
      itemId: _id,
      quantity,
      options: selectedOptions,
      seatId: [1],
      name,
      price,
    };
    addToCart(orderItem);
    setOptions([]);
    setQuantity(1);
    alert("Added to cart");
  };

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <OrderContext.Consumer>
      {(values) => {
        console.log("VALUES ARE:", values);
        return (
          <div /* className="item-container" */>
            <Accordion square onChange={handleChange(`panel${_id}`)}>
              <AccordionBtn aria-controls="panel${id}-content">
                <h3 style={{ margin: 0, marginBottom: 5 }}>{name}</h3>
                <h3 style={{ margin: 0, marginBottom: 5 }}>${price}</h3>
                <button className="btn" onClick={add}>
                  Add to Order
                </button>
              </AccordionBtn>
              <AccordionContent>
                <div className="option-container">
                  {options.map((option) => {
                    return (
                      <Option
                        _id={option._id}
                        name={option.name}
                        price={option.price}
                        addOption={addOption}
                      />
                    );
                  })}
                </div>
              </AccordionContent>
            </Accordion>
          </div>
        );
      }}
    </OrderContext.Consumer>
  );
}
