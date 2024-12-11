import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profil from './components/Profil'
import ProfilEdit from './components/ProfilEdit'

const App = () => {
    return (
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/profiledit" element={<ProfilEdit />} />
          </Routes>
        </div>
      </Router>
    );
  };
  export default App;