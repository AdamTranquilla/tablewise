import React from "react";
import WelcomeTable from "./Components/WelcomeTable/WelcomeTable.Component";
import Table from "./Components/Table/Table";
import Menu from "./Components/Menu/Menu";
import Order from "./Components/Order/Order";

export default function App() {
  const state = { view: "MENU" };

  return (
    <div className="App">
      <WelcomeTable tableNo={1} />
      {state.view === "TABLE" && (
        <Table mySeat={1} filledSeats={[1, 2, 3]} totalSeats={6} />
      )}
      {state.view === "MENU" && <Menu />}
      <Order />
    </div>
  );
}
