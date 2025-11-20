import { useEffect } from "react";

export type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
        fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white 
        ${type === "error" ? "bg-red-500" : "bg-green-600"}
      `}
    >
      {message}
    </div>
  );
}
