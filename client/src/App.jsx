import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';

// Import components
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error.message);
      }
  };

  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
