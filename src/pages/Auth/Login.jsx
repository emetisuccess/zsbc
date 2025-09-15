import React, { useState } from 'react'
import { useStateContext } from "../../contexts/ContextProvider"
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useStateContext();


  const { token } = useStateContext();
  if (token) {
    return <Navigate to="/" />
  }

  const payload = {
    email: email,
    password: password
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are Required")
    } else {
      axiosClient.post("/auth/login", payload
      ).then((response) => {
        toast.success("Logged in Successfully!");
        setToken(response.data.data.access_token);
        setUser(response.data.data.user);
      }).catch((err) => {
        // toast.error("Something went Wrong!");
        toast.error("Work still in Progress!");
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email & Password Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0061a1] text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
          >Login</button>
          <div className="m-0 text-sm">Forgot Password?&nbsp;
            <Link to='' className="underline text-[#0061a1] font-semibold">Reset</Link>
          </div>
          <div className="m-0 text-sm">Don't have an Account?&nbsp;
            <Link to='/register' className="underline text-[#0061a1] font-semibold">Register</Link>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium text-gray-700">Continue with Google</span>
        </button>
      </div>
    </div>
  )
}

export default Login