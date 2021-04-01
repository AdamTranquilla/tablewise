import React, { useState } from "react";
import Table from "../Table/Table";

interface SplitTableProps {
  onClick: (seats: number[]) => void;
  preSelect?: number;
}

export default function SplitTable({ onClick, preSelect }: SplitTableProps) {
  const [selected, _setSelected] = useState<number[]>([preSelect || 0]);

  const setSelected = (id: number) => {
    if (selected.indexOf(id) === -1) {
      selected.push(id);
    } else {
      selected.splice(selected.indexOf(id), 1);
    }
    _setSelected([...selected]);
  };

  return (
    <>
      <h2>Split Item</h2>
      <Table
        mySeat={1}
        filledSeats={selected}
        totalSeats={6}
        onClick={setSelected}
      />
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button onClick={() => onClick(selected)}>Done</button>
      </div>
    </>
  );
}
