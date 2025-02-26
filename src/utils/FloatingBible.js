"use client";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import BibleViewer from "@/utils/BibleViewer";
import { BiSolidBible } from "react-icons/bi";
import { motion } from "framer-motion";

export default function FloatingBibleDock({ drawer = false }) {
  const [isOpen, setIsOpen] = useState(drawer);

  return (
    <div className="fixed bottom-4 md:bottom-6 right-4 md:right-20 flex flex-col items-end z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`bg-primary dark:bg-accent shadow-lg rounded-2xl overflow-hidden w-[400px] h-[600px] p-4 flex flex-col ${
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
        } p-3 md:p-4 mt-3 rounded-full shadow-lg flex items-center justify-center  dark:bg-accent  dark:hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer`}
      >
        {isOpen ? <GrClose size={35} /> : <BiSolidBible size={35} />}
      </button>
    </div>
  );
}
