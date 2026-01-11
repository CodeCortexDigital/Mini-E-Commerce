import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
              <Link
                to="/dashboard"
                className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-lg text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-gray-600">
                        ${item.price} × {item.quantity} = $
                        {item.price * item.quantity}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
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
                  <Link
                    to="/dashboard"
                    className="flex-1 text-center bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                  >
                    Continue Shopping
                  </Link>

                  <button
                    onClick={clearCart}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
