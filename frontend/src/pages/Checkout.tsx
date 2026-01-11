import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

type CheckoutFormData = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  paymentMethod: "cod" | "card";
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, getTotal } = useCart();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const total = getTotal();

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);

    // Simulate order placement (backend later)
    setTimeout(() => {
      // Save order to localStorage (temporary)
      const order = {
        id: Date.now(),
        items: cart,
        total,
        shipping: data,
        status: "pending",
        date: new Date().toISOString(),
      };

      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      clearCart();
      setIsLoading(false);
      showToast("Order placed successfully!", "success");
      navigate("/orders");
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <EmptyState
            title="Your cart is empty"
            message="Add some products to your cart before checkout"
            buttonText="Continue Shopping"
            buttonLink="/dashboard"
            icon="🛒"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Checkout Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <Breadcrumbs
              items={[
                { label: "Dashboard", path: "/dashboard" },
                { label: "Cart", path: "/cart" },
                { label: "Checkout" },
              ]}
            />
            <h2 className="text-2xl font-bold mb-6 text-gray-800 mt-4">
              Shipping Information
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("fullName", { required: "Name is required" })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.address ? "border-red-500" : ""
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    {...register("city", { required: "City is required" })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                      errors.city ? "border-red-500" : ""
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    {...register("zipCode", { required: "Zip code is required" })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                      errors.zipCode ? "border-red-500" : ""
                    }`}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: "Phone is required" })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-4">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="cod"
                      {...register("paymentMethod", {
                        required: "Please select payment method",
                      })}
                      defaultChecked
                      className="mr-2"
                    />
                    Cash on Delivery
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="card"
                      {...register("paymentMethod")}
                      className="mr-2"
                    />
                    Credit/Debit Card
                  </label>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? <LoadingSpinner size="sm" /> : "Place Order"}
              </motion.button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
