import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export const WeChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl p-6 w-[300px]"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=200&h=200"
                  alt="WeChat QR Code"
                  className="w-48 h-48 mx-auto mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">Connect on WeChat</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Scan the QR code to chat with our travel experts 24/7
                </p>
                <p className="text-green-600 font-medium">ID: NiceLuxury</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};