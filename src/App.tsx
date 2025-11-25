import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
