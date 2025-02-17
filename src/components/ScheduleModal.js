import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaPersonPraying } from "react-icons/fa6";

function ScheduleModal({ isOpen, onClose }) {
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
            className="relative w-[70%] max-w-5xl h-[70vh] max-h-[700px] px-12 py-6 mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl grid place-items-center"
          >
            <div>
              <div className="flex justify-between items-center py-6">
                <h2 className="text-3xl font-bold text-primary dark:text-muted">
                  Explore Our Weekly Service Schedule
                </h2>

                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              <p className="text-base text-primary dark:text-muted">
                We invite you to join us in worship and fellowship. Below is our
                weekly service schedule, where you can find details about
                upcoming programs designed to nurture your faith and strengthen
                our community. We look forward to welcoming you as we gather to
                glorify God together!
              </p>
            </div>

            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="text-light bg-secondary">
                  <th className="border border-gray-300 px-4 py-2">Day</th>
                  <th className="border border-gray-300 px-4 py-2">Program</th>
                  <th className="border border-gray-300 px-4 py-2">Mode</th>
                  <th className="border border-gray-300 px-4 py-2">Time</th>
                </tr>
              </thead>

              <tbody>
                <tr className="text-center">
                  <td className="border border-gray-300 px-4 py-2">Tuesday</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Hour of Transformation
                  </td>
                  <td className="border border-gray-300 px-4 py-2 ">
                    <span className="flex justify-center">
                      <HiOutlineStatusOnline />
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    9 AM - 10 AM
                  </td>
                </tr>

                <tr className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    Wednesday
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Hour of Mercy
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className="flex justify-center items-center gap-2">
                      <HiOutlineStatusOnline /> <BsFillPeopleFill />{" "}
                      <FaPersonPraying />
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    6 PM - 7 PM
                  </td>
                </tr>

                <tr className="text-center">
                  <td className="border border-gray-300 px-4 py-2">Friday</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Hour of Warfare
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className="flex justify-center items-center gap-2">
                      <HiOutlineStatusOnline /> <BsFillPeopleFill />
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    6 PM - 7 PM
                  </td>
                </tr>

                <tr className="text-center">
                  <td className="border border-gray-300 px-4 py-2">Sunday</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span>Sunday School</span>
                    <span className="block">Sunday Service</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className="flex justify-center items-center gap-2">
                      <HiOutlineStatusOnline /> <BsFillPeopleFill />
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span>8:15 AM - 9:50 AM</span>
                    <span className="block">10 AM - 12 PM</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="w-[100%]">
              <h3 className="text-primary dark:text-muted font-bold text-lg">
                Modes Description
              </h3>
              <div className="flex items-center gap-2">
                <span>
                  <HiOutlineStatusOnline />
                </span>
                <span>-</span>
                <span className="text-primary dark:text-muted">
                  Online (You can access online sessions via the app directly)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>
                  <BsFillPeopleFill />
                </span>
                <span>-</span>
                <span className="text-primary dark:text-muted">
                  In-Church (If you would love to worship with us, check our
                  address in the footer of the app)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>
                  <FaPersonPraying />
                </span>
                <span>-</span>
                <span className="text-primary dark:text-muted">
                  Fast and prayers (The church observes a general fast every
                  Wednesday)
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ScheduleModal;
