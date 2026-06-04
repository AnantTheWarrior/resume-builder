


import { useState } from "react";
import { Lock, Mail, User2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import api from "../configs/api";
import { login } from "../app/features/authSlice";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const state = location.pathname.includes("signup") ? "signup" : "login"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = state === "login" ? "login" : "register"
      const { data } = await api.post(`/api/users/${endpoint}`, formData)

      if (state === "signup") {
        toast.success("Registration successful. Please login.")
        navigate("/login")
        return
      }

      dispatch(login({ token: data.token, user: data.user }))
      localStorage.setItem('token', data.token)
      toast.success(data.message)
      navigate("/app")
    } catch (error) {
      const message = error?.response?.data?.message
        ? error.response.data.message
        : error.message === "Network Error"
        ? "Unable to reach the server. Please start the backend and try again."
        : error.message

      toast.error(message)
      console.error("Login error:", error)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Please {state} to continue
        </p>

        {/* Name field only for signup */}
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2 size={16} color="#6B7280" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0 w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email input */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={16} color="#6B7280" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-none outline-none ring-0 w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password input */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={16} color="#6B7280" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0 w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Switch between Login / Signup */}
        <p className="text-sm text-gray-500 mt-6 mb-4">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-green-600 cursor-pointer ml-1"
            onClick={() => {
              const nextPath = state === "login" ? "/signup" : "/login"
              navigate(nextPath)
            }}
          >
            {state === "login" ? "Sign Up" : "Login"}
          </span>
        </p>

        <button
          type="submit"
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-full mt-4 mb-8 transition-colors"
        >
          {state === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
