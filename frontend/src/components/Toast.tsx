import { motion } from "framer-motion";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

type ToastProps = {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
};

const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -50, x: "-50%" }}
      className={`fixed top-4 left-1/2 z-50 ${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}
    >
      <span className="text-xl">{icons[type]}</span>
      <p className="flex-1 font-medium">{message}</p>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 transition font-bold text-lg"
      >
        ×
      </button>
    </motion.div>
  );
};

export default Toast;
