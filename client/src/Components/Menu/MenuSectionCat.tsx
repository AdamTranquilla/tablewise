import React from "react";
import Item from "./MenuSectionCatItem";
import { ItemType, CategoryType } from "../../types";
import "./Menu.css";
import { Accordion, AccordionBtn, AccordionContent } from "./Accordions";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY } from "../../graphql/category";

interface CategoryProps {
  id?: string;
  name: string;
  img: string;
}

export default function Category({ name, id }: CategoryProps) {
  const [expanded, setExpanded] = React.useState<string | false>(`panel${id}`);
  const { loading, data } = useQuery(GET_CATEGORY, { variables: { id } });
  const [items, setItems] = React.useState([]);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  React.useEffect(() => {
    if (!loading) {
      setItems(data?.category?.items);
    }
  }, [loading]);

  if (loading || !items) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          verticalAlign: "center",
        }}
      >
        Loading ...
      </div>
    );
  }

  return (
    <Accordion square onChange={handleChange("id")}>
      <AccordionBtn aria-controls="panel${id}-content" id={id}>
        <h3 style={{ margin: 0, marginBottom: 5 }}>{name}</h3>
      </AccordionBtn>
      <AccordionContent>
        <div className="item-container">
          {items.map((item: ItemType) => {
            return (
              <Item
                _id={item._id}
                name={item.name}
                price={item.price}
                options={item.options}
                presetOptionId={item.presetOptionId}
              />
            );
          })}
        </div>
      </AccordionContent>
    </Accordion>
  );
}
