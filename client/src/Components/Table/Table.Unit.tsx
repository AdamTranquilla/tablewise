import React from 'react';
import EmptySeat from '../../public/seatEmpty.png';
import FilledSeat from '../../public/seatFilled.png';

interface TableUnitProps {
    alignment: "center" | "flex-end" | "flex-start",
    isFilled: Boolean,
}

export default function ({alignment, isFilled}: TableUnitProps) {

    return (
        <div 
            className="seat"
            style={{
                alignSelf: alignment
            }}
        >
            <img src={ isFilled ? FilledSeat : EmptySeat } />
        </div>
    );

}
