import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // icon library
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useStateContext();


  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
      confirm_password: confirmPassword
    }

    axiosClient.post("/register", payload)
      .then(({ data }) => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 4000);
        toast.success("User Registered Successfully!")
        setUser(data.user)
        setToken(data.accessToken);
      }).catch(err => {
        const response = err.response;
        // toast.error("Something went Wrong!");
        toast.error("Work still in Progress!");
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {/* Register Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="w-full bg-[#0061a1] text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            {loading ? (<h2>Loading</h2>) : (<span>Submit</span>)}
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
        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium text-gray-700">Sign Up with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Register