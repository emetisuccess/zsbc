import { useState } from "react";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import Logo from "../assets/logos/zsbc_logo.png"
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Toaster, toast } from "react-hot-toast";


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const { token } = useStateContext();


  const onLogout = () => {
    if (token) {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("AUTH_USER");
      toast.success("Logged out Successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  }

  return (
    <header className="w-full mx-auto shadow relative">
      <div className="w-full mx-auto sm:px-6 lg:px-8 sm:bg-white py-2 top-0 bg-white fixed z-50">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navbar */}
          <nav className="flex items-center justify-between py-3 relative">
            {/* Left side (auth links) - hidden on small screens */}
            <div className="flex space-x-3 mr-5">
              <Link to="/">
                <img src={Logo} alt='' className="lg:w-52 md:w-52 h-9" />
              </Link>
            </div>

            {/* Right side (nav links) */}
            <div className="hidden md:flex space-x-4 items-center ml-5">
              <Link
                to="/home"
                className="text-[#0061a1] transition duration-300 hover:scale-110 text-xl sm:text-xl font-Poppins"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-[#0061a1] transition duration-300 hover:scale-110 text-xl sm:text-xl"
              >
                About
              </Link>

              {/* Services Dropdown (hover) */}
              <div className="relative">
                <button
                  onClick={() => setServiceMenuOpen(!serviceMenuOpen)}
                  className="flex items-center text-[#0061a1] text-xl sm:text-xl hover:scale-110 transition duration-300 cursor-pointer"
                >
                  Services <ChevronDown className="ml-1 w-5 h-5" />
                </button>
                {serviceMenuOpen && (
                  <div className="absolute right-0 mt-3 bg-white text-[#0061a1] rounded-lg shadow-lg w-48 z-50">
                    <Link
                      to="/admission"
                      className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                    >
                      Admission Processing
                    </Link>
                    <Link
                      to="/business"
                      className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                    >
                      Business Consultation
                    </Link>

                    <Link
                      to="/goods"
                      className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                    >
                      Import & Export of Goods
                    </Link>
                    <Link
                      to="/translation"
                      className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                    >
                      Translation
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/majors"
                className="text-[#0061a1] transition duration-300 hover:scale-110 text-xl sm:text-xl"
              >
                Majors
              </Link>
              <Link
                to="/contact"
                className="text-[#0061a1] transition duration-300 hover:scale-110 text-xl sm:text-xl"
              >
                Contact
              </Link>

              {/* 👇 User Dropdown (onClick toggle) */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center text-[#0061a1] text-xl sm:text-xl hover:scale-110 transition duration-300 cursor-pointer"
                >
                  Account <ChevronDown className="ml-1 w-5 h-5" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 bg-white text-[#0061a1] rounded-lg shadow-lg w-48 z-50 pt-3 pb-1">
                    {token ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                        >
                          Dashboard
                        </Link>
                        <button onClick={() => {
                          onLogout();
                          setUserMenuOpen(false);
                        }} className="flex items-center space-x-2 p-2 w-full rounded-lg hover:bg-[#0061a1] text-red-700 hover:text-white cursor-pointer">
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/register"
                          className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                        >
                          Register
                        </Link>
                        <Link
                          to="/login"
                          className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                        >
                          Login
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#0061a1] transition duration-300 ease-in-out hover:scale-110 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-4 text-center text-black">
              <Link to="/home" className="block text-2xl text-[#0061a1] transition duration-300 hover:scale-110" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Home</Link>
              <Link to="/about" className="block text-2xl text-[#0061a1] transition duration-300 hover:scale-110" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>About</Link>

              {/* Services Dropdown */}
              <div className="relative group flex justify-center">
                <button
                  onClick={() => setServiceMenuOpen(!serviceMenuOpen)}
                  className="flex text-2xl text-[#0061a1] transition duration-300 hover:scale-110 sm:text-xl h-full"
                >
                  Services <ChevronDown className="ml-1 w-5 h-5 mt-2" />
                </button>
                {serviceMenuOpen && (
                  <div className="absolute right-0 mt-10 bg-white text-[#0061a1] rounded-lg shadow-lg w-48 z-50">
                    <Link
                      to="/admission"
                      className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                    >
                      Admission Processing
                    </Link>
                    <Link
                      to="/business"
                      className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                    >
                      Business Consultation
                    </Link>
                    <Link
                      to="/goods"
                      className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                    >
                      Import & Export of Goods
                    </Link>
                    <Link
                      to="/translation"
                      className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                    >
                      Translation
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/majors" className="block text-2xl text-[#0061a1] transition duration-300 hover:scale-110" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Majors</Link>
              <Link to="/contact" className="block text-2xl text-[#0061a1] transition duration-300 hover:scale-110" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>Contact</Link>

              {/* 👇 User Dropdown (onClick toggle) */}
              <div className="relative group flex justify-center">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex text-2xl text-[#0061a1] transition duration-300 hover:scale-110 sm:text-xl h-full"
                >
                  Account <ChevronDown className="ml-1 w-5 h-5 mt-2" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-10 bg-white text-[#0061a1] rounded-lg shadow-lg w-48 z-50">
                    {token ? (
                      <>
                        {/*<Link
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                        >
                          Dashboard
                        </Link>*/}
                        <button onClick={() => {
                          onLogout();
                          setUserMenuOpen(false);
                        }} className="flex items-center space-x-2 p-2 w-full rounded-lg hover:bg-[#0061a1] text-red-700 hover:text-white cursor-pointer">
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/register"
                          className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                        >
                          Register
                        </Link>
                        <Link
                          to="/login"
                          className="block px-4 py-2 hover:bg-[#0061a1] hover:text-white"
                        >
                          Login
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>

  );
}

export default Navbar