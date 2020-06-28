import React from 'react';
import './App.css';
import CountDown from './Components/CountDown/CountDown';

function App() {
  const begin = new Date(2020, 5, 27, 20, 0);
  return (
    <>
      <CountDown
        begin={begin}
        onTimeEnd ={()=>alert('The time was end')}
      />
    </>
  );
}

export default App;
