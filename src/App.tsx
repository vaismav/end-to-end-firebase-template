import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { httpCall } from './cloud-utilities';

function App() {
  const [text, setText] = useState<string>();

  useEffect(() => {
    httpCall('dashboard')
      .then((result) => {
        console.log(result);
        if (typeof result.data === 'string') {
          setText(result.data);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{text || 'loading'}</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
