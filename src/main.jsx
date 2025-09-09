import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Apply from "./pages/Apply.jsx";
import Home from "./pages/Home.jsx";
import Header from './layouts/Navbar.jsx'
import Footer from './layouts/Footer.jsx'
import About from "./pages/About.jsx";
import Admission from "./pages/Admission.jsx";
import Business from "./pages/Business.jsx";
import Contact from "./pages/Contact.jsx";
import Goods from "./pages/Goods.jsx";
import Majors from "./pages/Majors.jsx";
import Translation from "./pages/Translation.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/majors" element={<Majors />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/business" element={<Business />} />
        <Route path="/goods" element={<Goods />} />
        <Route path="/translation" element={<Translation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
