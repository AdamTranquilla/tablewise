import React from 'react';

interface TableProps {
    mySeat: Number,
    filledSeats: Number[],
    totalSeats: Number,
}

export default function ({mySeat, filledSeats, totalSeats}: TableProps) {

    return (
        <div id="table-container">

        </div>
    );

}