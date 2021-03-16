import React from 'react';
import TableUnit from './Table.Unit'
import './Table.Style.css'

interface TableProps {
    mySeat?: Number,
    filledSeats: Number[],
    totalSeats: Number,
}

export default function ({mySeat, filledSeats, totalSeats}: TableProps) {

    let row: Number = 0;


    return (
        <div id="table-container">
            <div className="table-row">
                <TableUnit 
                    isFilled={true}
                    alignment="center"
                />
                <TableUnit 
                    isFilled={false}
                    alignment="center"
                />
            </div>
            <div className="table-row">
                <TableUnit 
                    isFilled={false}
                    alignment="flex-start"
                />
                <TableUnit 
                    isFilled={true}
                    alignment="flex-end"
                />
            </div>
            <div className="table-row">
                <TableUnit 
                    isFilled={true}
                    alignment="center"
                />
                <TableUnit 
                    isFilled={true}
                    alignment="center"
                />
            </div>
        </div>
    );

}