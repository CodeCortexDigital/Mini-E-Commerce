import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
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
      <div className="bg-black text-white px-4 py-4 md:px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-bold">
            Mini E-Commerce Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      <Products />
    </div>
  );
};

export default Dashboard;
