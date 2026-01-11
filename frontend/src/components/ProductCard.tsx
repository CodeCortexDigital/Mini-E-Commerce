import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-xl font-bold text-black mb-4">${product.price}</p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
