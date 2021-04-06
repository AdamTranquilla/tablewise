import React from "react";
import TableSeat from "./TableSeat";
import "./Table.css";

interface TableProps {
  mySeat?: number;
  filledSeats: number[];
  totalSeats: number;
  onClick?: (seatId: number) => void;
}

export default function Table({ filledSeats, onClick }: TableProps) {
  return (
    <div id="table-container">
      <div className="table-row">
        <TableSeat
          isFilled={filledSeats.indexOf(1) !== -1}
          alignment="center"
          onClick={onClick}
          id={1}
        />
        <TableSeat
          isFilled={filledSeats.indexOf(2) !== -1}
          alignment="center"
          onClick={onClick}
          id={2}
        />
      </div>
      <div className="table-row">
        <TableSeat
          isFilled={filledSeats.indexOf(4) !== -1}
          alignment="center"
          onClick={onClick}
          id={4}
        />
        <TableSeat
          isFilled={filledSeats.indexOf(3) !== -1}
          alignment="center"
          onClick={onClick}
          id={3}
        />
      </div>
    </div>
  );
}
