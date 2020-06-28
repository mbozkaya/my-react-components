import React from 'react';
import './App.css';
import CountDown from './Components/CountDown/CountDown';

function App() {
  const begin = new Date(2020, 5, 28, 14, 35);
  return (
    <>
      <CountDown
        begin={begin}
        onTimeEnd ={()=>alert('The time was end')}
        dangerZoneMinute={25}
        maxMinute={35}
      />
    </>
  );
}

export default App;
