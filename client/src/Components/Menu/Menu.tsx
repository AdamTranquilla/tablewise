import React from "react";
import Section from "./MenuSection";
import "./Menu.css";
import { SectionType, OrderItemType, CartItemType } from "../../types";
import { useQuery } from "@apollo/client";
import { GET_SECTIONS } from "../../graphql/section";

// @ts-ignore
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { GET_CART } from "../../graphql/cart";
import { GET_ITEMS } from "../../graphql/items";
import { OrderContext } from "../../context/Order";

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flex: 1,
  },
}));

export default function Menu(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [sections, setSections] = React.useState([]);
  const { loading, data, error } = useQuery(GET_SECTIONS);
  const itemsListQuery = useQuery(GET_ITEMS);
  const context = React.useContext(OrderContext);

  const cartItems = useQuery(GET_CART, {
    variables: {
      seatNo: context?.seatNo,
      uniqueTableId: context?.tableId,
    },
  });

  React.useEffect(() => {
    if (!itemsListQuery.error) {
      context?.setItemsList(itemsListQuery.data?.items);
    }
  }, [itemsListQuery.loading]);

  React.useEffect(() => {
    let _cartItems: CartItemType[] | undefined =
      cartItems.data?.cart[0]?.orderItems;
    let cartItemsList: OrderItemType[] = [];
    _cartItems?.forEach((cartItem: CartItemType) => {
      let itemInfo = context?.itemsList?.find((item) => {
        return item._id === cartItem.itemId;
      });
      let item: OrderItemType = {
        itemId: itemInfo?._id || "",
        name: itemInfo?.name || "",
        price: itemInfo?.price || 0,
        presetOptionId: itemInfo?.presetOptionId || [],
        seatId: cartItem.seatId.map((seat) => seat),
        cartItemId: cartItem.uniqueItemId,
        options: cartItem?.options?.map((option) => {
          let selectedOption = itemInfo?.options?.find(
            (itemOption) => itemOption._id === option.optionId
          );
          return {
            optionId: option.optionId,
            price: selectedOption?.price,
            name: selectedOption?.name,
          };
        }),
      };
      context?.setItems("ADD_ITEM", item);
    });
  }, [cartItems.loading, cartItems.data, itemsListQuery.data]);

  React.useEffect(() => {
    if (!loading && data) {
      setSections(data.sections);
    }
  }, [loading]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  if (loading || !sections) {
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

  if (error) {
    return <p> Some error occurred </p>;
  }
  console.log("FROM CONTEXT", context?.itemsList);
  return (
    <div id="menu-container">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {sections.map((section: SectionType, index: number) => {
              return <Tab label={section.name} {...a11yProps(index)} />;
            })}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {sections.map((section: SectionType) => {
            return (
              <Section
                _id={section._id}
                name={section.name}
                categories={section.categories}
              />
            );
          })}
        </SwipeableViews>
      </div>
    </div>
  );
}
