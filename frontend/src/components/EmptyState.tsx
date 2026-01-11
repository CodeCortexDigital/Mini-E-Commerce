import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type EmptyStateProps = {
  title: string;
  message: string;
  buttonText?: string;
  buttonLink?: string;
  icon?: string;
};

const EmptyState = ({
  title,
  message,
  buttonText,
  buttonLink,
  icon = "📦",
}: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-4"
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{message}</p>
      {buttonText && buttonLink && (
        <Link
          to={buttonLink}
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
        >
          {buttonText}
        </Link>
      )}
    </motion.div>
  );
};

export default EmptyState;
