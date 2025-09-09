import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logos/zsbc_logo.png"
import { Link } from "react-router-dom";

const Navbar = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full mx-auto shadow">
      {/* Top Logo (only visible on md and above) */}
      <div className="hidden md:flex justify-center py-4">
        <Link to="/">
          <img src={Logo} alt='' className="lg:w-52 md:w-52" />
        </Link>
      </div>
      <div className="w-full mx-auto sm:px-6 lg:px-8 bg-[#0061a1] py-4">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navbar */}
          <nav className="flex items-center justify-between py-3 ">
            {/* Left side (auth links) - hidden on small screens */}
            <div className="hidden md:flex space-x-3">
              <Link to="/login" className="text-white transition duration-300 hover:scale-110 text-xl sm:text-xl">Login</Link>
              <Link to="/register" className="text-white transition duration-300 hover:scale-110 text-xl sm:text-xl">Register</Link>
              <Link to="/dashboard" className="text-white transition duration-300 hover:scale-110 text-xl sm:text-xl">Dashboard</Link>
            </div>

            {/* Mobile logo (only visible below md) */}
            <div className="flex md:hidden">
              <button to="/dashboard" className="transition duration-300 hover:scale-110 text-md sm:text-md border border-amber-50 px-2 bg-white text-[#0061a1] rounded-2xl shadow-2xl">Dashboard</button>
            </div>

            {/* Right side (nav links) */}
            <div className="hidden md:flex space-x-6">
              <Link to="/home" className="text-white transition duration-300 hover:scale-110 text-xl sm:text-xl">Home</Link>
              <Link to="/about" className="text-white transition duration-300 hover:scale-110 text-xl sm:text-xl">About</Link>
              {/* Services Dropdown */}
              <div className="relative group">
                <Link to="#" className="text-white duration-300 hover:scale-110 text-xl sm:text-xl">
                  Services
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute left-0 hidden group-hover:block bg-white text-[#0061a1] mt-0 pt-3 pb-3 rounded-lg shadow-lg w-64 z-50" >
                  <Link to="/admission" className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white">Admission Processing</Link>
                  <Link to="/business" className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white">Business Consultation</Link>
                  <Link to="/goods" className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white">Import&Export of Goods</Link>
                  <Link to="/translation" className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white">Translation</Link>
                </div>
              </div>
              <Link to="/majors" className="text-white transition duration-300 hover:scale-110 text-xl sm:text-xl">Majors</Link>
              <Link to="/contact" className="text-white transition duration-300 hover:scale-110 text-xl sm:text-xl">Contact</Link>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white transition duration-300 ease-in-out hover:scale-110 focus:outline-none">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-4">
              <Link to="/home" className="block text-white transition duration-300 hover:scale-110">Home</Link>
              <Link to="/about" className="block text-white transition duration-300 hover:scale-110">About</Link>
              {/* Services Dropdown */}
              <div className="relative group">
                <Link to="#services" className="text-white transition duration-300 hover:scale-110 text-xl sm:text-xl h-full">
                  Services
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute left-0 hidden group-hover:block bg-white text-[#0061a1] mt-0 rounded-lg shadow-lg w-48 z-50" >
                  <Link to="#webdesign" className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white">Web Design</Link>
                  <Link to="#development" className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white">Development</Link>
                  <Link to="#seo" className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white">SEO</Link>
                  <Link to="#marketing" className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white">Marketing</Link>
                </div>
              </div>
              <Link to="/majors" className="block text-white transition duration-300 hover:scale-110">Majors</Link>
              <Link to="/contact" className="block text-white transition duration-300 hover:scale-110">Contact</Link>
              <Link to="/login" className="block text-white transition duration-300 hover:scale-110">Login</Link>
              <Link to="/logout" className="block text-white transition duration-300 hover:scale-110">Logout</Link>
              <Link to="/register" className="block text-white transition duration-300 hover:scale-110">Register</Link>
              <Link to="/dashboard" className="block text-white transition duration-300 hover:scale-110">Dashboard</Link>
            </div>
          )}
        </div>
      </div>
    </header>

  );
}

export default Navbar