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

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8001/graphql",
  }),
  cache: new InMemoryCache(),
});

interface OptionOrderType {
  optionId: String;
  quantity?: Number;
  price: Number;
  name: String;
}

interface ItemType {
  itemId: String;
  quantity: Number;
  seatId: Number[];
  price: Number;
  name: String;
  options?: OptionOrderType[];
}

function App() {
  const state = { view: "MENU" };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <WelcomeTable tableNo={1} />
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

  const setItems = (actionType: String, item?: ItemType) => {
    if (actionType === "ADD_ITEM") {
      if (item) items?.push(item);
      let _items = items ? [...items] : [];
      _setItems(_items);
    } else if (actionType === "EMPTY") {
      _setItems([]);
    }
  };

  return (
    <OrderContext.Provider value={{ items, setItems }}>
      <App />
    </OrderContext.Provider>
  );
}

AppWithContext.contextType = OrderContext;

export default AppWithContext;
