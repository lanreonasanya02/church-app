import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import CalendlyEmbed from "@/utils/CalendlyEmbed";

export default function BookingModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
          />

          {/* Modal Container */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
                type: "spring",
                damping: 15,
                stiffness: 300,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
              transition: {
                duration: 0.2,
              },
            }}
            className="relative w-[70%] max-w-xl h-[70vh] max-h-[700px] px-12 py-6 mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl grid place-items-center"
          >
            <div className="w-full flex justify-between items-center py-6">
              <h2 className="text-xl font-bold text-primary dark:text-muted">
                Schedule A Counseling Session
              </h2>

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <CalendlyEmbed />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
