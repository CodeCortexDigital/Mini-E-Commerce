import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "Product One", price: 20 },
  { id: 2, name: "Product Two", price: 30 },
  { id: 3, name: "Product Three", price: 40 },
  { id: 4, name: "Product Four", price: 50 },
  { id: 5, name: "Product Five", price: 60 },
  { id: 6, name: "Product Six", price: 70 },
];

const Products = () => {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
