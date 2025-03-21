"use client";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import BibleViewer from "@/utils/BibleViewer";
import { BiSolidBible } from "react-icons/bi";
import { motion } from "framer-motion";

export default function FloatingBibleDock({ drawer = false }) {
  const [isOpen, setIsOpen] = useState(drawer);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 576);
      setIsTablet(window.innerWidth >= 576 && window.innerWidth < 992);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="fixed bottom-1.5 md:bottom-6 right-1.5 md:right-20 flex flex-col items-end z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`bg-primary dark:bg-accent shadow-lg rounded-2xl overflow-hidden w-[380px] md:w-[400px] h-[600px] p-4 flex flex-col ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-light">Bible Dock</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-light hover:text-muted transition duration-500 ease-in-out"
          >
            <GrClose size={20} />
          </button>
        </div>
        <div className="flex-grow overflow-auto">
          <BibleViewer />
        </div>
      </motion.div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen
            ? "bg-primary hover:bg-accent"
            : "bg-secondary hover:bg-subSecondary"
        } p-3 md:p-4 mt-3 rounded-full shadow-lg flex items-center justify-center dark:bg-accent dark:hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer group`}
      >
        {isOpen ? (
          <GrClose size={isMobile || isTablet ? 25 : 35} />
        ) : (
          <BiSolidBible size={isMobile || isTablet ? 25 : 35} />
        )}

        {!isOpen && !isMobile && !isTablet && (
          <span className="absolute bottom-full w-[80px] p-1 text-xs font-semibold text-white bg-gray-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Open Bible
          </span>
        )}
      </button>
    </div>
  );
}
