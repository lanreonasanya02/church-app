"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Sermons from "@/components/Sermons";
import Schedule from "@/components/Schedule";
import Footer from "@/components/Footer";
import FloatingBibleDock from "@/utils/FloatingBible";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";
import { PrimaryLoading } from "@/utils/Loading";
import axios from "axios";

const MIXLR_USERNAME = process.env.NEXT_PUBLIC_MIXLR_USERNAME;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [todayProgram, setTodayProgram] = useState("");

  // Loading logo with particles at the initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Delay for 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Check live status on Mixlr
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

  //  Check if today's program is live
  useEffect(() => {
    const fetchPrograms = async () => {
      const schedule = [
        { day: "Sunday", program: "Sunday Sermon" },
        { day: "Thursday", program: "Hour of Transformation" },
        { day: "Wednesday", program: "Hour of Mercy" },
        { day: "Friday", program: "Hour of Warfare" },
      ];
      const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

      const todaySchedule = schedule.find((entry) => entry.day === today);

      if (todaySchedule) {
        setTodayProgram(todaySchedule.program);
      } else {
        setTodayProgram("");
      }
    };

    fetchPrograms();
  }, [isLive]);

  return (
    <>
      {isLoading ? (
        <PrimaryLoading />
      ) : (
        <>
          <div className="bg-mobile-hero dark:bg-mobile-dark-hero md:bg-hero md:dark:bg-church-banner-dark min-h-screen bg-cover bg-center pt-5">
            <Navbar
              todayProgram={todayProgram}
              isLive={isLive}
              username={MIXLR_USERNAME}
            />
            <Hero
              todayProgram={todayProgram}
              isLive={isLive}
              username={MIXLR_USERNAME}
            />
          </div>
          <About />
          <Sermons />
          <Schedule />
          <Footer />
          <FloatingBibleDock drawer={true} />
          <SpeedInsights />
        </>
      )}
    </>
  );
}
