import React from "react";
import "./WelcomeTable.css";

interface WelcomeTableProps {
  tableNo: Number;
  seatNo: Number;
}

export default function WelcomeTable({
  tableNo,
  seatNo,
}: WelcomeTableProps): JSX.Element {
  return (
    <div id="welcometable-container">
      <p id="table-title">Welcome to Table # {tableNo}</p>
      <p id="table-title-small">Seat # {seatNo}</p>
    </div>
  );
}
