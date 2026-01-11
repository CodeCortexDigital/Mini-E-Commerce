import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import Products from "./Products";

const Dashboard = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-black text-white px-4 py-4 md:px-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-bold">
            Mini E-Commerce Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/profile"
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Profile
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/orders"
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Orders
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/wishlist"
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Wishlist
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/cart"
                className="relative bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Cart
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Products */}
      <Products />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
