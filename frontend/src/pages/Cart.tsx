import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import EmptyState from "../components/EmptyState";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal, getItemCount } = useCart();
  const { showToast } = useToast();

  const total = getTotal();
  const itemCount = getItemCount();

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      showToast("Item removed from cart", "info");
    } else {
      updateQuantity(id, newQuantity);
      showToast("Cart updated", "success");
    }
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    showToast("Item removed from cart", "info");
  };

  const handleClearCart = () => {
    clearCart();
    showToast("Cart cleared", "info");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>

          <AnimatePresence mode="wait">
            {cart.length === 0 ? (
              <EmptyState
                title="Your cart is empty"
                message="Add some products to your cart to continue shopping"
                buttonText="Continue Shopping"
                buttonLink="/dashboard"
                icon="🛒"
              />
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-lg text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-gray-600">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition text-lg font-semibold"
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="px-4 py-1 min-w-[50px] text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition text-lg font-semibold"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right min-w-[100px]">
                            <p className="font-semibold text-gray-800">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          <button
                            onClick={() => handleRemove(item.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                          >
                            Remove
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Summary */}
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Items ({itemCount}):</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center mb-6 text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-black">${total.toFixed(2)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Link
                        to="/dashboard"
                        className="block text-center bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                      >
                        Continue Shopping
                      </Link>
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClearCart}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                    >
                      Clear Cart
                    </motion.button>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Link
                        to="/checkout"
                        className="block text-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                      >
                        Proceed to Checkout
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
