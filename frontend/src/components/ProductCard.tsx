import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import type { Product } from "../utils/products";

type ProductCardProps = {
  product: Product;
  index?: number;
};

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = product.stock !== undefined && product.stock === 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast("Removed from wishlist", "info");
    } else {
      addToWishlist(product);
      showToast("Added to wishlist!", "success");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product);
      showToast("Added to cart!", "success");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition relative"
    >
      {isOutOfStock && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
          Out of Stock
        </div>
      )}
      {product.stock !== undefined && product.stock > 0 && product.stock <= 5 && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded z-10">
          Low Stock
        </div>
      )}

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 hover:text-black cursor-pointer">
              {product.name}
            </h3>
          </Link>
          <button
            onClick={handleWishlistToggle}
            className={`ml-2 text-2xl transition ${inWishlist ? "text-red-500" : "text-gray-300 hover:text-red-500"}`}
            aria-label="Add to wishlist"
            title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            ❤️
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <p className="text-xl font-bold text-black">${product.price}</p>
          {product.rating && (
            <div className="flex items-center text-sm text-gray-600">
              <span>⭐ {product.rating}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center bg-gray-200 text-black py-2 rounded-md hover:bg-gray-300 transition"
          >
            View
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
