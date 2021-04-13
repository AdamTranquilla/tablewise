import React from "react";
import WelcomeTable from "./Components/WelcomeTable/WelcomeTable.Component";
import Table from "./Components/Table/Table";
import Menu from "./Components/Menu/Menu";
import Order from "./Components/Order/Order";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { OrderItemType, ItemType } from "./types";
import { OrderContext } from "./context/Order";
import socket from "./utils/socket.io.js";
import "./App.css";
import "./index.css";
import { graphqlLink } from "./res/api";

const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlLink,
  }),
  cache: new InMemoryCache(),
});

let seatNo = Number(
  window.location.hash.substr(1, window.location.hash.length)
);
let tableNo = 1;

function App() {
  const state = { view: "MENU" };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <WelcomeTable tableNo={tableNo} seatNo={seatNo} />
        {state.view === "TABLE" && (
          <Table mySeat={1} filledSeats={[1, 2, 3]} totalSeats={6} />
        )}
        {state.view === "MENU" && <Menu />}
        <Order />
      </div>
    </ApolloProvider>
  );
}

function AppWithContext() {
  const [items, _setItems] = React.useState<OrderItemType[] | undefined>();
  const [itemsList, _setItemsList] = React.useState<ItemType[]>([]);
  const [tableId, setTableId] = React.useState<string>("");

  React.useEffect(() => {
    socket.emit(
      "join",
      { table: tableNo, seat: seatNo, uniqueTableId: tableId },
      function (err: boolean, data: any) {
        setTableId(data.data.tableId);
      }
    );
  }, []);

  const setItems = (actionType: string, item?: OrderItemType) => {
    if (actionType === "ADD_ITEM") {
      if (item) items?.push(item);
      let _items = items ? [...items] : [];
      _setItems(_items);
    } else if (actionType === "EMPTY") {
      _setItems([]);
    }
  };

  const setItemsList = (list: ItemType[]) => {
    _setItemsList(list);
  };

  const removeItem = (index: number) => {
    items?.splice(index, 1);
    let _items = items ? [...items] : [];
    _setItems(_items);
  };

  const updateItem = (index: number, data: OrderItemType) => {
    let _items = items ? [...items] : [];
    _items[index] = data;
    _setItems(_items);
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        removeItem,
        setItems,
        updateItem,
        seatNo,
        tableNo,
        tableId,
        itemsList,
        setItemsList,
      }}
    >
      <App />
    </OrderContext.Provider>
  );
}

AppWithContext.contextType = OrderContext;

export default AppWithContext;
