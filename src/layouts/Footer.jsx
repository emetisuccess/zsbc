import { Twitter, Facebook, Instagram, Phone, Mail } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Footer = () => {

  const options = {
    duration: 10000,
    style: { background: "#0061a1", color: "#fff" }
  }
  return (
    <section className="bg-[#045c97] text-white flex flex-col items-center mx-auto">
      <footer className="text-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="">
              <div className="text-sm">
                <h3 className="text-2xl lg:text-2xl md:text-2xl sm:text-2xl font-bold text-white mb-4">Have a Questions?</h3>
                <p className="text-lg leading-6 mb-8">
                  <span className="text">No.308 Xuefu Road, Jingkou District,
                    Zhenjiang City, Jiangsu Province, China. <br />
                    江苏省镇江市京口区学府路308号 </span>
                </p>
                <div className="flex flex-col space-y-2 text-lg lg:text-lg md:text-lg sm:text-lg font-bold">
                  <Link
                    to="tel:+8618252585772"
                    className="flex items-center space-x-2 text-gray-50 transition"
                  >
                    <Phone size={18} className="hidden sm:block" />
                    <span>+8618252585772</span>
                  </Link>
                  <Link
                    to="mailto:zbc@zbusinessconsult.com"
                    className="flex items-center space-x-2 text-gray-50 transition"
                  >
                    <Mail size={18} className="hidden sm:block" />
                    <span>zbc@zbusinessconsult.com</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-2xl lg:text-2xl md:text-2xl sm:text-2xl font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2 text-lg">
                <li><Link to="/admission" className="hover:text-white transition">Admission Processing</Link></li>
                <li><Link to="/business" className="hover:text-white transition">Business Consultation</Link></li>
                <li><Link to="/goods" className="hover:text-white transition">Import&Export of Goods and Technology</Link></li>
                <li><Link to="/translation" className="hover:text-white transition">Translation</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-2xl lg:text-2xl md:text-2xl sm:text-2xl font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-lg mb-4">
                <li>
                  <Link to="/home" className="hover:text-white transition">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition">About</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition">Contact</Link>
                </li>
              </ul>
              <div className="mb-5 mt-5">
                <h2 className="text-xl font-semibold mb-0">Connect With Us</h2>
                <ul className="flex space-x-4 mt-3">
                  <li>
                    <Link
                      to="https://twitter.com/ZsbcWorld"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-100 transition"
                    >
                      <Twitter size={22} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://web.facebook.com/profile.php?id=61555822284542"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-100 transition"
                    >
                      <Facebook size={22} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.instagram.com/zsbc_world/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-100 transition"
                    >
                      <Instagram size={22} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://wa.me/+8618252585772"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-100 transition"
                    >
                      <Phone size={22} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="mt-10 border-t border-gray-50 pt-6 text-center text-md">
            &copy; {new Date().getFullYear()} <span className="font-bold text-gray-300">ZSBC LTD.</span>. All rights reserved.
          </div>
        </div>
      </footer>
      <Toaster position="top-right" autoClose={10000} toastOptions={options} />
    </section>
  )
}

export default Footer