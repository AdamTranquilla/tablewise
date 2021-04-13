import React from "react";
import "./WelcomeTable.css";

interface WelcomeTableProps {
  tableNo: number;
  seatNo: number;
}

export default function WelcomeTable({
  tableNo,
  seatNo,
}: WelcomeTableProps): JSX.Element {
  return (
    <div id="welcometable-container">
      <img
        src="./plate.png"
        style={{ width: 50, height: 50 }}
        className="logo"
        alt="TableWise"
      />
      <div className="welcome-text">
        <p id="table-title">Welcome to Table # {tableNo}</p>
        <p id="table-title-small">Seat # {seatNo}</p>
      </div>
    </div>
  );
}
