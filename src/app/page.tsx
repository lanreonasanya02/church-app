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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Delay for 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <>
      {isLoading ? (
        <PrimaryLoading />
      ) : (
        <>
          <div className="bg-mobile-hero dark:bg-mobile-dark-hero md:bg-hero md:dark:bg-church-banner-dark min-h-screen bg-cover bg-center pt-5">
            <Navbar />
            <Hero />
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
