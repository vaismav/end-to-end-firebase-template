import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageNotFound, CreateAccount, LoginPage, Home, Transfer, Deposit } from 'modules/pages';

export default function RouterSwitch() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/newAccount" element={<CreateAccount />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
