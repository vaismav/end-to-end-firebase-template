import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { httpCall } from './cloud-utilities';
import { CreateAccount } from 'modules/createAccount/CreateAccount';

function App() {
  const [text, setText] = useState<string>();

  useEffect(() => {
    httpCall('dashboard')
      .then((result) => {
        if (typeof result.data === 'string') {
          setText(result.data);
        }
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <CreateAccount />
      </header>
    </div>
  );
}

export default App;
