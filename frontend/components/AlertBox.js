// components/ui/AlertBox.tsx
import { useEffect } from "react";

export default function AlertBox({ type = "success", message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyle =
    "fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center transition-transform duration-300 ease-out";
  const typeStyles = {
    success: "bg-green-100 text-green-800 border border-green-300",
    error: "bg-red-100 text-red-800 border border-red-300",
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type]} animate-slide-in`}>
      <span className="font-semibold">{message}</span>
    </div>
  );
}
