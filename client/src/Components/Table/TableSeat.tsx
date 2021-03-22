import React from "react";
import EmptySeat from "../../public/seatEmpty.png";
import FilledSeat from "../../public/seatFilled.png";

interface TableSeatProps {
  alignment: "center" | "flex-end" | "flex-start";
  isFilled: Boolean;
  id: Number;
  onClick?: (id: Number) => void;
}

export default function Seats({
  alignment,
  isFilled,
  id,
  onClick,
}: TableSeatProps) {
  return (
    <div
      className="seat"
      onClick={() => onClick && onClick(id)}
      style={{
        alignSelf: alignment,
      }}
    >
      <img src={isFilled ? FilledSeat : EmptySeat} alt="seat" />
    </div>
  );
}
