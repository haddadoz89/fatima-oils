import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/ui.store';

export const Notification = () => {
  const notification = useUIStore((state) => state.notification);

  const types = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50"
        >
          <div
            className={`${
              types[notification.type] || types.info
            } text-white px-6 py-4 rounded-lg shadow-lg`}
          >
            {notification.message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
