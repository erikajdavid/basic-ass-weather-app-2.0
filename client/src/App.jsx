import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';

//import components
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./components/Landing"
import Dashboard from "./components/Dashboard";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
