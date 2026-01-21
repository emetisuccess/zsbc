import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useStateContext();
  const [loading, setLoading] = useState(false);
  // const [googleLoading, setGoogleLoading] = useState(false);
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  // const handleGoogleCallback = async (e) => {
  //   e.preventDefault();

  //   setGoogleLoading(true);
  //   try {
  //     const res = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/user/auth-google`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //         },
  //         credentials: "include",
  //       }
  //     );

  //     if (!res.ok) {
  //       const data = await res.json().catch(() => null);
  //       throw new Error(data?.message || `Request failed (${res.status})`);
  //     }
  //     const data = await res.json();
  //     if (data) {
  //       // console.log(data);
  //       window.location.href = data.url; // redirect to Google login
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setGoogleLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are Required");
    } else {
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        toast.error("Please enter a valid email address!");
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.message || `Request failed (${res.status})`);
        }

        const data = await res.json();
        const token = data.token;
        if (token) {
          setToken(token);
          setUser(data.user);
          toast.success(data.message);
        } else {
          toast.error("User is Unauthorized!");
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email & Password Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
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
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0061a1] text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="m-0 text-sm">
            Forgot Password?&nbsp;
            <Link
              to="/forgot-password"
              className="underline text-[#0061a1] font-semibold"
            >
              Reset
            </Link>
          </div>
          <div className="m-0 text-sm">
            Don't have an Account?&nbsp;
            <Link
              to="/register"
              className="underline text-[#0061a1] font-semibold"
            >
              Register
            </Link>
          </div>
        </form>

        {/* Divider 
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
*/}
        {/* Google Login Button 
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
        */}
      </div>
    </div>
  );
};

export default Login;
