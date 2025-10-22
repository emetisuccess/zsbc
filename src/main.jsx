import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
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
import NotFound from "./pages/NotFound.jsx";
import ForgotResetPassword from "./pages/Auth/ForgotPassword.jsx";
import VerifyCode from "./pages/Auth/VerifyCode.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import VerifyResetPasswordOtp from "./pages/Auth/VerifyResetPasswordOtp.jsx"
import GoogleSuccess from "./pages/Auth/GoogleSuccess.jsx";
import AdmissionSuccess from "./pages/AdmissionSuccess.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
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
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/verify-otp" element={<VerifyResetPasswordOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/google-success" element={<GoogleSuccess />} />
          <Route path="/admission-success" element={<AdmissionSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ContextProvider>
  </StrictMode>,
)
