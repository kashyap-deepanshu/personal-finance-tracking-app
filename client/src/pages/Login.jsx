import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent double submit

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login", form);

      login(res.data);

      const storedSummary = JSON.parse(localStorage.getItem("summary"));

      if (storedSummary) {
        navigate("/dashboard");
      } else {
        navigate("/upload");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) navigate("/upload");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-10 border border-gray-200 relative">

        {/* Progress Bar */}
        {loading && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 overflow-hidden rounded-t-2xl">
            <div className="h-full bg-gray-900 animate-pulse w-full"></div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome back
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              disabled={loading}
              className={`w-full px-4 py-3 border rounded-lg transition 
                ${loading ? "bg-gray-100 cursor-not-allowed" : ""}
                focus:outline-none focus:ring-2 focus:ring-gray-800`}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              disabled={loading}
              className={`w-full px-4 py-3 border rounded-lg transition 
                ${loading ? "bg-gray-100 cursor-not-allowed" : ""}
                focus:outline-none focus:ring-2 focus:ring-gray-800`}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-medium py-3 rounded-lg transition duration-200 shadow-md
              ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gray-900 hover:bg-black hover:shadow-lg"}`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="grow h-px bg-gray-200"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="grow h-px bg-gray-200"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-gray-900 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;