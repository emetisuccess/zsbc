import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { useStateContext } from "../../contexts/ContextProvider";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryInfo, setCountryInfo] = useState({
    name: "",
    dialCode: "",
    countryCode: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useStateContext();
  const [googleLoading, setGoogleLoading] = useState(false);


  const handleGoogleCallback = async (e) => {
    e.preventDefault();

    setGoogleLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/auth-google`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || `Request failed (${res.status})`);
      }
      const data = await res.json();
      if (data) {
        // console.log(data);
        window.location.href = data.url; // redirect to Google login
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setGoogleLoading(false)
    }
  }

  const handlePhoneChange = (value, country) => {
    setPhoneNumber(value);
    setCountryInfo(country);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!firstname || !lastname || !email || !password || !phoneNumber) {
      toast.error("All fields are Required");
    } else {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
            phoneNumber,
            countryInfo
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          toast.error(data.message.email[0]);
          return;
          // console.log(data.message.email[0]);
          // throw new Error(data?.message || `Request failed (${res.status})`);
        }
        const data = await res.json();
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          toast.success(data.message);
          setFirstname("");
          setLastname("");
          setEmail("");
          setPassword("");
          setEmail("");
          setConfirmPassword("");
          setTimeout(() => {
            window.location.href = "/verify-code"
          }, 4000);
        } else {
          toast.error("User Registration Failed!");
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-32">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Register Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Firstname
              </label>
              <input
                type="text"
                placeholder="Enter your Firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lastname
              </label>
              <input
                type="text"
                placeholder="Enter your Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Phone Number</label>
            <PhoneInput
              country={"cn"}
              value={phoneNumber}
              onChange={handlePhoneChange}
              inputStyle={{
                width: "100%",
                height: "45px",
                borderRadius: "8px",
              }}
              containerClass="border border-gray-300 rounded-md"
              buttonStyle={{
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
            />
          </div>


          <div className="grid grid-cols-2 gap-2">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
                {confirmPassword && password != confirmPassword ? (<small className="text-red-950">Password doesn't match</small>) : ""}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0061a1] text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            {loading ? "Loading" : "Submit"}
          </button>
          <div className="m-0 text-sm">Already have an Account?&nbsp;
            <Link to='/login' className="underline text-[#0061a1] font-semibold">Login</Link>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Signup */}
        <button
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer" onClick={handleGoogleCallback}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium text-gray-700">{googleLoading ? "Processing google auth..." : "Continue with Google"}</span>
        </button>
      </div>
    </div>
  );
}

export default Register