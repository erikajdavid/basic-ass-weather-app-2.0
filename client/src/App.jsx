import './App.css';
import { Routes, Route } from "react-router-dom";

//import components
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./components/Landing"

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
