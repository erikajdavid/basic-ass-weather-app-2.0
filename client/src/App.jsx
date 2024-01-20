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

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:3500/auth/is-verified", {
          method: "GET",
          headers: { token: localStorage.token }
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      parseResponse === true  ? setIsAuthenticated(true) : setIsAuthenticated(false);
      
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
          element={!isAuthenticated ? <Signup setAuth={setAuth} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
