import React from 'react';
import './WelcomeTable.css'

interface WelcomeTableProps {
    tableNo: Number,
}

export default function WelcomeTable ({tableNo}: WelcomeTableProps): JSX.Element {
    
    return (
        <div id="welcometable-container">
            <span id="table-title">Welcome to Table # {tableNo}</span>
        </div>
    );

}