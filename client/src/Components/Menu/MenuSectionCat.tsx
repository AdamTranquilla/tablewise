import React from "react";
import Item from "./MenuSectionCatItem";
import "./Menu.css";
import { Accordion, AccordionBtn, AccordionContent } from "./Accordions";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY } from "../../graphql/category";

interface CategoryProps {
  name: string;
  id?: string;
}

interface OptionType {
  name: string;
  _id: string;
  price: Number;
}
interface ItemType {
  _id: string;
  name: string;
  price: Number;
  options: OptionType[];
}

export default function Category({ name, id }: CategoryProps) {
  const [expanded, setExpanded] = React.useState<string | false>(`panel${id}`);
  const { loading, data } = useQuery(GET_CATEGORY, { variables: { id } });
  const [items, setItems] = React.useState([]);
  console.clear();
  console.log(">>>", loading, data);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  React.useEffect(() => {
    if (!loading) {
      // checks if data and category exist
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
              />
            );
          })}
        </div>
      </AccordionContent>
    </Accordion>
  );
}
