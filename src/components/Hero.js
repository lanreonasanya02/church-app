import React, { useState } from "react";
import ScrambleText from "@/components/ScrambledText";
import ScheduleModal from "@/components/ScheduleModal";
import LiveServiceModal from "@/components/LiveServiceModal";
// import { motion } from "framer-motion";

export default function Hero({ isLive, username }) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div id="home">
      {/* Mobile Hero */}
      <div className="md:hidden px-5 h-screen grid place-content-center">
        {/* <p className="text-lg text-center text-light dark:text-muted mb-5 font-normal">
          Shalom in Christ,
        </p> */}

        <h1 className="text-5xl text-center font-bold text-light dark:text-muted">
          Discipleship.{" "}
          <span className="text-secondary dark:text-accent">Growth.</span>
        </h1>

        <p className="text-lg my-6 text-center font-normal text-light md:text-primary dark:text-muted">
          Join our vibrant community dedicated in spiritual growth in Christ
          Jesus our Lord. Experience the transformative power of God&apos;s love
          in your daily life.
        </p>

        <div className="md:hidden text-center md:text-start">
          {/* {isLive ? (
            <div className="space-x-8 text-xs">
              <button
                onClick={() => setIsModalOpen(true)}
                className="py-2 px-14 rounded-full text-sm bg-secondary dark:bg-accent text-white"
              >
                <motion.div
                  animate={{
                    x: [0, -5, 5, -5, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <span className="block text-base">
                    {todayProgram} is live.
                  </span>
                  <span>Tap to listen!</span>
                </motion.div>
              </button>
            </div>
          ) : ( */}
          <div className="relative group text-sm flex flex-col space-y-5 items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="py-3 px-14 rounded-full text-sm border-2 dark:border-accent border-secondary bg-secondary dark:bg-accent hover:bg-subSecondary hover:border-subSecondary dark:hover:bg-blue-500 dark:hover:border-muted transition duration-500 ease-in-out text-white cursor-pointer w-[70%]"
            >
              Explore Programs
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="py-3 px-14 rounded-full text-sm border-2 border-muted bg-muted hover:border-subSecondary hover:bg-none dark:hover:border-muted dark:hover:bg-blue-500 transition duration-500 ease-in-out text-secondary dark:text-white cursor-pointer w-[70%]"
            >
              Visit Us This Sunday
            </button>
          </div>
          {/* )} */}
        </div>
      </div>

      {/* Desktop Hero */}
      <div className="container hidden md:grid grid-cols-2 mx-auto place-content-center md:h-screen">
        <div className="px-16">
          <p className="text-xl text-primary dark:text-muted mb-6 font-semibold italic">
            Shalom in Christ,
          </p>

          <h1 className="text-3xl md:text-6xl font-bold text-primary dark:text-muted">
            We Are A Community of Devoted Puritans Committed to God&apos;s Word
            through
            <br />
            <ScrambleText
              texts={[
                "Discipleship",
                "Faith",
                "Devotion",
                "Worship",
                "Fellowship",
              ]}
            />
            <span className="text-secondary dark:text-accent">.</span>
          </h1>

          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="py-3 px-14 mt-10 rounded-full text-base font-normal bg-secondary dark:bg-accent hover:bg-subSecondary dark:hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer"
          >
            Explore Programs
          </button>
        </div>

        <div></div>

        <ScheduleModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
        />
      </div>
      <LiveServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        username={username}
        isLive={isLive}
      />
    </div>
  );
}
