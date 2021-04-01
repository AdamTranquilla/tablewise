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
import { OrderContext } from "./context/Order";
import { getCart } from "./utils/cartStorage";
import socket from "./utils/socket.io.js";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8001/graphql",
  }),
  cache: new InMemoryCache(),
});

interface OptionOrderType {
  optionId: string;
  price?: number;
  name?: string;
}

interface ItemType {
  itemId: string;
  seatId: number[];
  price?: number;
  name?: string;
  options?: OptionOrderType[];
  preselect: string[];
}

let seatNo = Number(
  window.location.hash.substr(1, window.location.hash.length)
); //Math.ceil(Math.random() * 6);
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
  const [items, _setItems] = React.useState<ItemType[] | undefined>(getCart());
  const [tableId, setTableId] = React.useState<string>("");

  React.useEffect(() => {
    socket.emit(
      "join",
      { table: tableNo, seat: seatNo },
      function (err: boolean, data: any) {
        console.clear();
        console.log("TABLEID", err, data);
        if (err) {
          alert(err);
        }
        setTableId(data.data.tableId);
      }
    );
  }, []);

  const setItems = (actionType: string, item?: ItemType) => {
    if (actionType === "ADD_ITEM") {
      if (item) items?.push(item);
      let _items = items ? [...items] : [];
      _setItems(_items);
    } else if (actionType === "EMPTY") {
      _setItems([]);
    }
  };

  const removeItem = (index: number) => {
    items?.splice(index, 1);
    let _items = items ? [...items] : [];
    _setItems(_items);
  };

  const updateItem = (index: number, data: ItemType) => {
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
      }}
    >
      <App />
    </OrderContext.Provider>
  );
}

AppWithContext.contextType = OrderContext;

export default AppWithContext;
