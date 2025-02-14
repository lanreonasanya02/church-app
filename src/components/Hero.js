import React from "react";
import ScrambleText from "@/components/ScrambledText";
import ScheduleModal from "@/components/ScheduleModal";
import { useState } from "react";

export default function Hero() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <div className="h-screen container grid grid-cols-2 mx-auto place-content-center">
      <div className="px-16">
        <p className="text-xl text-primary dark:text-muted mb-6 font-semibold italic">
          Shalom in Christ,
        </p>

        <h1 className="text-6xl font-bold text-primary dark:text-muted">
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
          className="py-3 px-14 mt-10 rounded-full text-base font-normal bg-secondary dark:bg-accent hover:bg-accent dark:hover:bg-secondary transition duration-500 ease-in-out text-white cursor-pointer"
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
  );
}
