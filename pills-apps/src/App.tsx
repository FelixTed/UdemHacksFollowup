import { useState } from 'react'
import './App.css'
import LoginPage from "./components/loginPage";
import HomePage from './components/home';
import BasicExample from './components/listeMeds';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {

  return (
    <Router>
      {/* <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
        <Link to="/" style={{ margin: "10px" }}>Accueil</Link>
        <Link to="/login" style={{ margin: "10px" }}>Login</Link>
        <Link to="/contact" style={{ margin: "10px" }}>Contact</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<BasicExample />} />
      </Routes>
    </Router>
  )
}

export default App
