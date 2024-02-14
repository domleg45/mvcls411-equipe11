
import React from 'react';
import './App.css';
import Remote from './components/remote';


function App() {
  return (
      <div className="App">
        <div className='header'>
          <h1>ChromeCast</h1>
        </div>
        <div className='remote'>
          <Remote />
        </div>
      </div>
  );
}

export default App;
