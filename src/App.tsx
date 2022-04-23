import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import { httpCall, onAuthStateChanged, setPersistence } from './cloud-utilities';
import { BrowserRouter, Routes } from 'react-router-dom';
import { SplashScreen } from 'modules/common/indexs';
import RouterSwitch from 'router';
import { Unsubscribe } from 'firebase/auth';

function App() {
  useEffect(() => {
    var unsubscribe: Unsubscribe;
    setPersistence
      .then(
        (unsubscribe = onAuthStateChanged(function (persistedUser) {
          if (persistedUser && persistedUser.uid) {
            console.log(persistedUser);
          }
        })),
      )
      .catch((e) => console.log('App: error at setPersistence for auth state', e));

    return () => {
      unsubscribe();
    };
  }, []);

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
