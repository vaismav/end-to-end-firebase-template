import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageNotFound, CreateAccount, LoginPage, Home } from 'modules/pages';

export default function RouterSwitch() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/newAccount" element={<CreateAccount />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}