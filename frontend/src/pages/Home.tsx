import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Mini E-Commerce
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your one-stop shop for quality products at great prices
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-black border-2 border-black px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
