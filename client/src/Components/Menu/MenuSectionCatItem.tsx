import React from "react";
import "./Menu.css";
import Option from "./MenuSectionCatItemOptions";
import { OptionOrderType, ItemType } from "../../types";
import { Accordion, AccordionBtn, AccordionContent } from "./Accordions";
import { OrderContext } from "../../context/Order";
import socket from "../../utils/socket.io.js";
// @ts-ignore
import Modal from "react-modal";
import SplitTable from "./SplitTable";
// @ts-ignore
import { v4 as uuid } from "uuid";
import { ADD_TO_CART } from "../../graphql/cart";
import { useMutation } from "@apollo/client";

export default function Item({
  _id,
  name,
  price,
  options,
  presetOptionId,
}: ItemType) {
  const [expanded, setExpanded] = React.useState<string | false>(`panel${_id}`);
  const [selectedOptions, setOptions] = React.useState<OptionOrderType[]>([]);
  const context = React.useContext(OrderContext);
  const [showSplit, setShowSplit] = React.useState<boolean>(false);
  const [addToTableCart, cartData] = useMutation(ADD_TO_CART);

  React.useEffect(() => {
    let preSelectedOptions = options.filter((option) => {
      return presetOptionId && presetOptionId?.indexOf(option._id) > -1;
    });

    preSelectedOptions.map((option) => {
      selectedOptions.push({
        name: option.name,
        optionId: option._id,
        price: option.price,
      });
    });
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const editOption = ({ optionId, name, price }: OptionOrderType) => {
    selectedOptions.push({ optionId, name, price });
  };

  const removeOption = (optionId: string) => {
    let index = -1;

    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i].optionId === optionId) {
        index = i;
        break;
      }
    }
    selectedOptions.splice(index, 1);
    setOptions([...selectedOptions]);
  };

  const add = (seatIds: number[]) => {
    let orderItem = {
      itemId: _id,
      cartItemId: uuid(),
      options: selectedOptions,
      seatId: seatIds,
      name,
      price,
      presetOptionId,
    };
    let cartItem = JSON.parse(
      JSON.stringify({
        itemId: _id,
        uniqueItemId: orderItem.cartItemId,
        options: selectedOptions.map((option) => ({
          optionId: option.optionId,
        })),
        seatId: seatIds,
      })
    );

    addToTableCart({
      variables: {
        tableId: 1,
        item: cartItem,
        uniqueTableId: context?.tableId,
      },
    });

    if (seatIds.indexOf(context?.seatNo || -1) > -1) {
      cartItem.options.forEach((option: OptionOrderType) => {
        delete option.price;
        delete option.name;
      });

      context?.setItems("ADD_ITEM", orderItem);
    }
    socket.emit("split_bill", {
      item: orderItem,
      splitBy: context?.seatNo,
      tableNo: context?.tableNo,
    });
    // alert("Added to cart");
  };

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div /* className="item-container" */>
      <Modal isOpen={showSplit} style={customStyles}>
        <SplitTable
          preSelect={context?.seatNo}
          onClick={(seats: number[]) => {
            setShowSplit(false);
            add(seats);
          }}
        />
      </Modal>

      <Accordion square onChange={handleChange(`panel${_id}`)}>
        <AccordionBtn aria-controls="panel${id}-content">
          <div className="item-head">
            <h3 style={{ margin: 0, marginBottom: 5 }}>{name} </h3>
            <div className="item-price">
              <h3 style={{ margin: 0, marginBottom: 5 }}>
                ${price.toFixed(2)}
              </h3>
              <button className="btn" onClick={() => setShowSplit(true)}>
                <img
                  src="./add.svg"
                  style={{ width: 20, height: 20 }}
                  className="add-btn"
                  alt="Add"
                />
              </button>
            </div>
          </div>
        </AccordionBtn>
        <AccordionContent>
          <div className="option-container">
            {options.map((option) => {
              return (
                <Option
                  _id={option._id}
                  name={option.name}
                  price={option.price}
                  editOption={editOption}
                  removeOption={removeOption}
                  dontShowPrice={
                    option.price === 0 ||
                    presetOptionId.indexOf(option._id) !== -1
                  }
                  isSelected={
                    presetOptionId?.indexOf
                      ? presetOptionId?.indexOf(option._id) > -1
                      : false
                  }
                />
              );
            })}
          </div>
        </AccordionContent>
      </Accordion>
    </div>
  );
}
