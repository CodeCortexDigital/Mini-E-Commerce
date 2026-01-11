import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";

type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
};

const Profile = () => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      address: "123 Main St",
      city: "New York",
      zipCode: "10001",
    },
  });

  const onSubmit = async (_data: ProfileFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      showToast("Profile updated successfully!", "success");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 md:p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Edit Profile
              </motion.button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.name ? "border-red-500" : ""
                } ${!isEditing ? "bg-gray-100" : ""}`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                disabled={!isEditing}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.email ? "border-red-500" : ""
                } ${!isEditing ? "bg-gray-100" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone
              </label>
              <input
                type="tel"
                disabled={!isEditing}
                {...register("phone", { required: "Phone is required" })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.phone ? "border-red-500" : ""
                } ${!isEditing ? "bg-gray-100" : ""}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <input
                type="text"
                disabled={!isEditing}
                {...register("address", { required: "Address is required" })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.address ? "border-red-500" : ""
                } ${!isEditing ? "bg-gray-100" : ""}`}
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
                  disabled={!isEditing}
                  {...register("city", { required: "City is required" })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.city ? "border-red-500" : ""
                  } ${!isEditing ? "bg-gray-100" : ""}`}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  {...register("zipCode", { required: "Zip code is required" })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.zipCode ? "border-red-500" : ""
                  } ${!isEditing ? "bg-gray-100" : ""}`}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? <LoadingSpinner size="sm" /> : "Save Changes"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-200 text-black py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </motion.button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
