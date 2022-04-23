import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import { httpCall } from './cloud-utilities';
import { BrowserRouter, Routes } from 'react-router-dom';
import { SplashScreen } from 'modules/common/indexs';
import RouterSwitch from 'router';

function App() {
  const [text, setText] = useState<string>();

  return (
    <div className="App-header">
      <Suspense fallback={<SplashScreen />}>
        <BrowserRouter>
          <RouterSwitch />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
