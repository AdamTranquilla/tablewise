import React from 'react';
import WelcomeTable from './Components/WelcomeTable/WelcomeTable.Component';
import Table from './Components/Table/Table.Component'
import './App.css';

function App() {
  return (
    <div className="App">
      <WelcomeTable 
        tableNo={1}
      />
      <Table 
        mySeat={1}
        filledSeats={[1,2,3]}
        totalSeats={6}
      />
    </div>
  );
}

export default App;
