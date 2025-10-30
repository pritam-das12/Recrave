import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-[100] animate-slideIn">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border ${
          type === 'success'
            ? 'bg-green-500/20 border-green-500/50 text-green-400'
            : 'bg-red-500/20 border-red-500/50 text-red-400'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle size={24} className="flex-shrink-0" />
        ) : (
          <AlertCircle size={24} className="flex-shrink-0" />
        )}
        <p className="font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 hover:scale-110 transition-transform"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toast;