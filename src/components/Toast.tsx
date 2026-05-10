import { useEffect } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-grafite text-white px-5 py-3 rounded-lg text-sm font-body shadow-lg animate-fade-in flex items-center gap-2 whitespace-nowrap">
      <span className="w-5 h-5 flex items-center justify-center text-green-400">
        <i className="ri-checkbox-circle-line" />
      </span>
      {message}
    </div>
  );
}