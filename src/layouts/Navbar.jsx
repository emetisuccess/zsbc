import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logos/zsbc_logo.png"
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Toaster, toast } from "react-hot-toast";


const Navbar = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token } = useStateContext();

  const onLogout = (token) => {
    if (token) {
      localStorage.removeItem("ACCESS_TOKEN");
      toast.success("Logged out Successfully!");
      window.location.href = "/";
    }
  }


  return (
    <header className="w-full mx-auto shadow">
      {/* Top Logo (only visible on md and above) */}
      <div className="hidden md:flex justify-center py-4">
        <Link to="/">
          <img src={Logo} alt='' className="lg:w-52 md:w-52" />
        </Link>
      </div>

      <div className="w-full mx-auto sm:px-6 lg:px-8 sm:bg-[#0061a1] py-4 bg-white">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navbar */}
          <nav className="flex items-center justify-between py-3 ">
            {/* Left side (auth links) - hidden on small screens */}
            <div className="hidden md:flex space-x-3">
              {!token && (
                <>
                  <Link to="/login" className="text-white transition duration-300 hover:scale-110 text-xl sm:text-xl">Login</Link>
                  <Link to="/register" className="text-white transition duration-300 hover:scale-110 text-xl sm:text-xl">Register</Link>
                </>
              )}
              {token && (
                <>
                  <Link to="/dashboard" className="text-white transition duration-300 hover:scale-110 text-xl sm:text-xl">Dashboard</Link>
                  <button onClick={onLogout} className="text-white transition duration-300 hover:scale-110 text-xl sm:text-xl">Logout</button>
                </>
              )}
            </div>

            {/* Mobile logo (only visible below md) */}
            <div className="flex md:hidden">
              <Link to="/">
                <img src={Logo} alt='' className="w-54" />
              </Link>
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
                className="text-[#0061a1] sm:text-white transition duration-300 ease-in-out hover:scale-110 focus:outline-none">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-4 text-center text-black">
              <Link to="/home" className="block text-2xl text-[#0061a1] sm:text-white transition duration-300 hover:scale-110" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Home</Link>
              <Link to="/about" className="block text-2xl text-[#0061a1] sm:text-white  transition duration-300 hover:scale-110" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>About</Link>
              {/* Services Dropdown */}
              <div className="relative group">
                <Link to="javascript:0" className="block text-2xl text-[#0061a1] sm:text-white  transition duration-300 hover:scale-110 sm:text-xl h-full">
                  Services
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute left-0 hidden group-hover:block bg-white text-[#0061a1] mt-0 rounded-lg shadow-lg w-48 z-50" >
                  <Link to="/admission" className="block text-md px-4 py-2 hover:bg-[#0061a1] hover:text-white sm:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Admission Processing</Link>
                  <Link to="/business" className="block text-md px-4 py-2 hover:bg-[#0061a1] hover:text-white sm:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Business Consultation</Link>
                  <Link to="/goods" className="block text-md px-4 py-2 hover:bg-[#0061a1] hover:text-white sm:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Import&Export of Goods</Link>
                  <Link to="/translation" className="block text-md px-4 py-2 hover:bg-[#0061a1] hover:text-white sm:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Translation</Link>
                </div>
              </div>
              <Link to="/majors" className="block text-2xl text-[#0061a1] sm:text-white  transition duration-300 hover:scale-110" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Majors</Link>
              <Link to="/contact" className="block text-2xl text-[#0061a1] sm:text-white  transition duration-300 hover:scale-110" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Contact</Link>
              {!token && (
                <>
                  <span className="grid gap-2 grid-cols-2 my-8">
                    <Link to="/login" className="block text-md border border-b-gray-500 text-white  transition duration-300 hover:scale-110 bg-[#0061a1] py-2 rounded-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Login</Link>
                    <Link to="/register" className="block text-md text-white  transition duration-300 hover:scale-110 bg-[#0061a1] py-2 rounded-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Register</Link>
                  </span>
                </>)}
              {token && (
                <>
                  <span className="grid gap-2 grid-cols-2 my-8">
                    <Link to="#" onClick={onLogout} className="block text-md  text-white  transition duration-300 hover:scale-110 bg-[#0061a1] py-2 rounded-2xl">Logout</Link>
                    <Link to="/dashboard" className="block text-md text-white  transition duration-300 hover:scale-110 bg-[#0061a1] py-2 rounded-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Dashboard</Link>
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>

  );
}

export default Navbar