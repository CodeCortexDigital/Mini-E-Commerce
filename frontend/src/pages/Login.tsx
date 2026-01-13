import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import { login } from "../utils/auth";
import { useToast } from "../context/ToastContext";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [loginType, setLoginType] = useState<"admin" | "customer">("customer");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    setTimeout(() => {
      const result = login(data.email, data.password);
      
      if (result.success && result.user) {
        setIsLoading(false);
        showToast(`Welcome ${result.user.role === "admin" ? "Admin" : result.user.name || "User"}!`, "success");
        navigate("/dashboard");
      } else {
        setIsLoading(false);
        setError(result.error || "Invalid credentials");
        showToast(result.error || "Invalid credentials", "error");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-white px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border-2 border-emerald-100"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Login to Mini E-Commerce
        </h2>

        {/* Role Selector */}
        <div className="mb-6">
          <div className="flex gap-2 bg-emerald-50 p-1 rounded-xl border-2 border-emerald-200">
            <button
              type="button"
              onClick={() => {
                setLoginType("customer");
                setValue("email", "");
                setValue("password", "");
                setError("");
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                loginType === "customer"
                  ? "bg-white text-emerald-700 shadow-md"
                  : "text-emerald-600 hover:text-emerald-700"
              }`}
            >
              👤 Customer
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginType("admin");
                setValue("email", "admin@commerce.com");
                setValue("password", "admin123");
                setError("");
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                loginType === "admin"
                  ? "bg-white text-emerald-700 shadow-md"
                  : "text-emerald-600 hover:text-emerald-700"
              }`}
            >
              👑 Admin
            </button>
          </div>
          {loginType === "admin" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 bg-amber-50 border-2 border-amber-200 rounded-lg p-3 text-sm"
            >
              <p className="text-amber-800 font-medium">
                ⚠️ Admin credentials will be auto-filled
              </p>
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-emerald-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`input-primary ${
                errors.email ? "border-red-500 focus:ring-red-400 focus:border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-emerald-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`input-primary ${
                errors.password ? "border-red-500 focus:ring-red-400 focus:border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-2 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {loginType === "customer" && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-sm">
              <p className="font-semibold text-blue-800 mb-1">💡 Customer Login:</p>
              <p className="text-blue-700">Use your registered email and password, or <Link to="/register" className="font-bold underline">create a new account</Link></p>
            </div>
          )}

          {loginType === "admin" && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 text-sm">
              <p className="font-semibold text-amber-800 mb-1">🔐 Admin Credentials:</p>
              <p className="text-amber-700"><strong>Email:</strong> admin@commerce.com</p>
              <p className="text-amber-700"><strong>Password:</strong> admin123</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold shadow-xl hover:shadow-2xl text-lg transform hover:scale-105"
          >
            {isLoading ? <LoadingSpinner size="sm" /> : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-emerald-700 mt-6 font-medium">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
