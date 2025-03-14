"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCircleNotch, FaTimes } from "react-icons/fa";

export default function LiveServiceModal({
  isOpen,
  onClose,
  username,
  isLive,
}) {
  const [countdown, setCountdown] = useState(null);
  const [nextService, setNextService] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState("");

  // Prevents scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const serviceSchedule = {
    0: {
      title: "Sunday sermon",
      description:
        "Tune in and join us as we receive God's word for His church. Shalom!",
      time: "11AM",
      day: "Sunday",
      weekDay: 0,
    },
    2: {
      title: "Hour of Transformation",
      description:
        "A transformative sermon every Tuesday through the study of God’s word",
      time: "9AM",
      day: "Tuesday",
      weekDay: 2,
    },
    3: {
      title: "Hour of Mercy",
      description:
        "A weekly service on Wednesdays to celebrate God’s mercy with worship, praise and prayers and to teach God’s salvation through Christ for all mankind",
      time: "6PM",
      day: "Wednesday",
      weekDay: 3,
    },
    5: {
      title: "Hour of Warfare",
      description:
        "A weekly service every Friday to learn about spiritual warfare through the study of God’s word with warfare prayers",
      time: "6PM",
      day: "Friday",
      weekDay: 5,
    },
  };

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 12) {
      setTimeOfDay("Good morning,");
    } else if (hour >= 12 && hour < 16) {
      setTimeOfDay("Good afternoon,");
    } else {
      setTimeOfDay("Good evening,");
    }
  }, []);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentTime = now.getTime();

      const serviceTimes = [
        { day: 0, hour: 11, minute: 0, endHour: 12, endMinute: 30 }, // Tuesday 11 AM - 12:15 PM
        { day: 2, hour: 9, minute: 0, endHour: 10, endMinute: 15 }, // Tuesday 9 AM - 10:15 AM
        { day: 3, hour: 18, minute: 0, endHour: 19, endMinute: 15 }, // Wednesday 6 PM - 7:15 PM
        { day: 5, hour: 18, minute: 0, endHour: 19, endMinute: 15 }, // Friday 6 PM - 7:15 PM
      ];

      let nextProgram = null;
      let minTimeDifference = Infinity;

      for (let service of serviceTimes) {
        let targetDate = new Date(now);
        let dayOffset = (service.day - currentDay + 7) % 7; // Days ahead, including today

        // Start time
        targetDate.setDate(now.getDate() + dayOffset);
        targetDate.setHours(service.hour, service.minute, 0, 0);
        let serviceStartTime = targetDate.getTime();

        // End time (including the grace period)
        let serviceEndTime = new Date(targetDate);
        serviceEndTime.setHours(service.endHour, service.endMinute, 0, 0);
        let serviceGraceEndTime = serviceEndTime.getTime();

        let timeDifference = serviceStartTime - currentTime;

        // ✅ If we are within the grace period, stop countdown but keep current service displayed
        if (
          currentTime >= serviceStartTime &&
          currentTime <= serviceGraceEndTime
        ) {
          console.log("Within grace period:", service);
          setCountdown(null); // This triggers the "Waiting for broadcast" UI
          setNextService(serviceSchedule[service.day]); // Keep the current service
          return;
        }

        // ✅ Select the nearest future program
        if (timeDifference > 0 && timeDifference < minTimeDifference) {
          minTimeDifference = timeDifference;
          nextProgram = service;
        }
      }

      // If no next program is found, default to the first event next week
      if (!nextProgram) {
        nextProgram = serviceTimes[0];
      }

      // Set the countdown
      let targetTime = new Date();
      targetTime.setDate(
        now.getDate() + ((nextProgram.day - currentDay + 7) % 7)
      );
      targetTime.setHours(nextProgram.hour, nextProgram.minute, 0, 0);

      const timeDifference = targetTime - now;

      if (timeDifference > 0) {
        setCountdown(Math.ceil(timeDifference / 1000));
        setNextService(serviceSchedule[nextProgram.day]);
      } else {
        setCountdown(null);
        setNextService(serviceSchedule[nextProgram.day]);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
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
            className="relative w-[95%] md:w-[70%] md:max-w-5xl h-[70vh] max-h-[700px] px-5 md:px-12 py-6 mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <div className=" mb-4">
                {nextService && (
                  <>
                    <p className="text-base md:text-lg italic text-gray-500 dark:text-gray-400">
                      {timeOfDay} Amazing Heir!
                    </p>

                    <h2 className="text-3xl md:text-4xl mt-3 md:mt-5 font-bold text-primary dark:text-muted">
                      {nextService.title}
                    </h2>
                  </>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <div className="text-center">
              {isLive ? (
                <iframe
                  src={`https://${username}.mixlr.com/embed`}
                  height="450px"
                  width="100%"
                ></iframe>
              ) : (
                <div className="text-light">
                  {countdown !== null ? (
                    <div className="border-spacing-6 border border-primary dark:border-muted rounded-xl p-3 md:p-6 h-[450px] grid place-items-center">
                      <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-muted">
                        This program is not yet live.
                      </h1>
                      <p className="text-primary dark:text-muted text-lg">
                        {nextService?.title} will be live{" "}
                        {nextService?.weekDay === new Date().getDay()
                          ? `this ${
                              nextService?.weekDay > 2 ? "evening" : "morning"
                            }`
                          : nextService?.weekDay === new Date().getDay() + 1
                          ? "tomorrow"
                          : "on " + nextService?.day}{" "}
                        at {nextService?.time}. Please check back at the
                        scheduled time to join us. Program goes live in...
                      </p>

                      <div className="text-2xl md:text-7xl text-primary dark:text-muted grid grid-cols-4 gap-2 md:grid-cols-4 md:gap-8">
                        {/* Days */}
                        <p className="border-2 border-primary dark:border-muted w-24 h-12 md:w-36 md:h-32 rounded-lg md:grid place-items-center">
                          <span className="font-bold">
                            {Math.floor(countdown / 86400)}
                          </span>
                          <span className="text-sm md:block ms-1 md:ms-0">
                            Day{Math.floor(countdown / 86400) === 1 ? "" : "s"}
                          </span>
                        </p>

                        {/* Hours */}
                        <p className="border-2 border-primary dark:border-muted w-24 h-12 md:w-36 md:h-32 rounded-lg md:grid place-items-center">
                          <span className="font-bold">
                            {Math.floor((countdown % 86400) / 3600)}
                          </span>
                          <span className="text-sm md:block ms-1 md:ms-0">
                            Hour
                            {Math.floor((countdown % 86400) / 3600) === 1
                              ? ""
                              : "s"}
                          </span>
                        </p>

                        {/* Minutes */}
                        <p className="border-2 border-primary dark:border-muted w-24 h-12 md:w-36 md:h-32 rounded-lg md:grid place-items-center">
                          <span className="font-bold">
                            {Math.floor((countdown % 3600) / 60)
                              .toString()
                              .padStart(2, "0")}
                          </span>
                          <span className="text-sm md:block ms-1 md:ms-0">
                            Minute
                            {Math.floor((countdown % 3600) / 60) === 1
                              ? ""
                              : "s"}
                          </span>
                        </p>

                        {/* Seconds */}
                        <p className="border-2 border-primary dark:border-muted w-24 h-12 md:w-36 md:h-32 rounded-lg md:grid place-items-center">
                          <span className="font-bold">
                            {(countdown % 60).toString().padStart(2, "0")}
                          </span>
                          <span className="text-sm md:block ms-1 md:ms-0">
                            Second{countdown % 60 === 1 ? "" : "s"}
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="border-spacing-6 border border-primary dark:border-muted rounded-xl p-6  h-[450px] grid place-items-center">
                      <h1 className="text-3xl font-bold text-primary dark:text-muted flex space-x-16 items-center">
                        <span>
                          <FaCircleNotch className="animate-spin size-10 color-primary dark:color-muted" />
                        </span>
                        <span>Waiting for broadcast...</span>
                      </h1>

                      <p className="text-primary dark:text-muted text-lg">
                        The program should be live now, but we are waiting for
                        the broadcast to start. <br /> If the stream does not
                        begin shortly, please refresh the page or check back
                        later. <br /> <br />
                        The broadcast may also have ended, in which case, the
                        next program will be displayed. Please stay tuned or
                        check back later.
                      </p>

                      <button
                        onClick={() => window.location.reload()}
                        className="py-3 px-14 mt-10 rounded-full text-base font-normal bg-secondary dark:bg-accent hover:bg-subSecondary dark:hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer"
                      >
                        Refresh
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {nextService && (
              <p className="text-sm italic text-center mt-3 text-gray-500 dark:text-gray-400">
                {nextService.description}
              </p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
