import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../utils/products";

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Hero Section */}
      <div className="flex items-center justify-center px-4 py-20">
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
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Welcome to Mini E-Commerce
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600 mb-8"
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
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium inline-block"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="bg-white text-black border-2 border-black px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium inline-block"
              >
                Register
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Featured Products */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-8 text-gray-800"
          >
            Featured Products
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-100 rounded-lg p-6 text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-black mb-4">
                  ${product.price}
                </p>
                <Link
                  to="/login"
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition inline-block"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
