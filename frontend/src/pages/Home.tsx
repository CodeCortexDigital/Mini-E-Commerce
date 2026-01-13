import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-white">
      {/* Hero Section */}
      <div className="flex items-center justify-center px-4 py-20 bg-gradient-to-b from-green-100 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-green-800 mb-4"
          >
            Welcome to Mini E-Commerce
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-green-700 mb-8"
          >
            Your one-stop shop for quality products at great prices
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-medium inline-block shadow-lg"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition font-medium inline-block shadow-md"
              >
                Register
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Announcements */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
          >
            📢 Important Announcements
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 shadow-lg"
          >
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-emerald-800">
                  Welcome to Our Store!
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Discover amazing products at great prices. Start shopping today and enjoy fast delivery and excellent customer service.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl text-center"
                >
                  Start Shopping
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl text-center"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
