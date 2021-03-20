import React from "react";
import TableSeat from "./TableSeat";
import "./Table.css";

interface TableProps {
  mySeat?: Number;
  filledSeats: Number[];
  totalSeats: Number;
}

export default function Table({ mySeat, filledSeats, totalSeats }: TableProps) {
  return (
    <div id="table-container">
      <div className="table-row">
        <TableSeat isFilled={true} alignment="center" />
        <TableSeat isFilled={false} alignment="center" />
      </div>
      <div className="table-row">
        <TableSeat isFilled={false} alignment="flex-start" />
        <TableSeat isFilled={true} alignment="flex-end" />
      </div>
      <div className="table-row">
        <TableSeat isFilled={true} alignment="center" />
        <TableSeat isFilled={true} alignment="center" />
      </div>
    </div>
  );
}
