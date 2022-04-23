import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageNotFound, CreateAccount, LoginPage } from 'modules/pages';

export default function RouterSwitch() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/newAccount" element={<CreateAccount />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
