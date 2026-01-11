import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import { products } from "../utils/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const product = products.find((p) => p.id === Number(id));
  const inWishlist = product ? isInWishlist(product.id) : false;
  const isOutOfStock = product?.stock !== undefined && product.stock === 0;

  useEffect(() => {
    // Save to recently viewed
    if (product) {
      const recent = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const updated = [product.id, ...recent.filter((id: number) => id !== product.id)].slice(0, 5);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      showToast("Added to cart!", "success");
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (inWishlist) {
        removeFromWishlist(product.id);
        showToast("Removed from wishlist", "info");
      } else {
        addToWishlist(product);
        showToast("Added to wishlist!", "success");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link
            to="/dashboard"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex flex-col">
      <div className="max-w-6xl mx-auto flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 md:p-8"
        >
          <Breadcrumbs
            items={[
              { label: "Dashboard", path: "/dashboard" },
              { label: "Products", path: "/dashboard" },
              { label: product.name },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* Product Image */}
            <div className="bg-gray-200 rounded-lg h-64 md:h-96 flex items-center justify-center relative">
              <span className="text-gray-400 text-4xl">{product.name}</span>
              {isOutOfStock && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded">
                  Out of Stock
                </div>
              )}
              {product.stock !== undefined && product.stock > 0 && product.stock <= 5 && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded">
                  Only {product.stock} left
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {product.name}
                </h1>
                <button
                  onClick={handleWishlistToggle}
                  className={`text-3xl transition ${inWishlist ? "text-red-500" : "text-gray-300 hover:text-red-500"}`}
                  aria-label="Add to wishlist"
                  title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  ❤️
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <p className="text-3xl font-bold text-black">${product.price}</p>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <span className="text-xl">⭐ {product.rating}</span>
                    {product.reviewCount && (
                      <span className="text-gray-600 text-sm">
                        ({product.reviewCount} reviews)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {product.stock !== undefined && (
                <p className="text-gray-600 mb-4">
                  Stock: {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </p>
              )}

              <p className="text-gray-600 mb-6">{product.description}</p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
