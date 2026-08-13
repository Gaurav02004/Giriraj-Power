import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div id="toast-portal-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = CheckCircle2;
          let borderClass = 'border-emerald-500 bg-white text-neutral-800 shadow-xl';
          let iconColor = 'text-emerald-600';

          if (toast.type === 'success') {
            Icon = CheckCircle2;
            borderClass = 'border-emerald-500 bg-white text-neutral-900 shadow-xl shadow-emerald-950/5';
            iconColor = 'text-emerald-600';
          } else if (toast.type === 'warning') {
            Icon = AlertTriangle;
            borderClass = 'border-yellow-400 bg-white text-neutral-900 shadow-xl shadow-yellow-950/5';
            iconColor = 'text-yellow-600';
          } else if (toast.type === 'error') {
            Icon = XCircle;
            borderClass = 'border-rose-500 bg-white text-neutral-900 shadow-xl shadow-rose-950/5';
            iconColor = 'text-rose-600';
          } else {
            Icon = Info;
            borderClass = 'border-black bg-white text-neutral-900 shadow-xl';
            iconColor = 'text-neutral-900';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-xl border-l-4 border-r border-t border-b border-neutral-200 ${borderClass}`}
            >
              <div className={`mt-0.5 shrink-0 ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-neutral-900 tracking-tight">{toast.title}</h4>
                <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded-md hover:bg-neutral-100 shrink-0"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
