import React, { useState, useEffect } from "react";
import ScrambleText from "@/components/ScrambledText";
import ScheduleModal from "@/components/ScheduleModal";
import LiveServiceModal from "@/components/LiveServiceModal";
import axios from "axios";

const MIXLR_USERNAME = "amazing-grace-heirs";

export default function Hero() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const response = await axios.get(
          `https://api.mixlr.com/users/${MIXLR_USERNAME}`
        );
        setIsLive(response.data.is_live);
      } catch (error) {
        console.error("Error fetching Mixlr status:", error);
      }
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home">
      <div className="md:hidden px-8 h-screen grid place-content-center">
        <p className="text-xl text-primary dark:text-muted mb-6 font-semibold italic">
          Shalom in Christ,
        </p>

        <h1 className="text-5xl md:text-6xl font-bold text-light md:text-primary dark:text-muted">
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

        <div className="md:hidden mt-5">
          {isLive ? (
            <div className="space-x-8 text-xs">
              <button
                onClick={() => setIsModalOpen(true)}
                className="py-3 px-14 rounded-full text bg-secondary text-white"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <span className="flex items-center space-x-2">
                    <HiOutlineStatusOnline />
                    <span>LIVE NOW</span>
                  </span>
                </motion.div>
              </button>
            </div>
          ) : (
            <div className="relative group text-xs">
              <button
                onClick={() => setIsModalOpen(true)}
                className="py-3 px-14 rounded-full text text- bg-secondary dark:bg-accent hover:bg-accent dark:hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer"
              >
                See Upcoming Program
              </button>
            </div>
          )}
        </div>
      </div>

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
            className="py-3 px-14 mt-10 rounded-full text-base font-normal bg-secondary dark:bg-accent hover:bg-accent dark:hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer"
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
        username={MIXLR_USERNAME}
        isLive={isLive}
      />
    </div>
  );
}
