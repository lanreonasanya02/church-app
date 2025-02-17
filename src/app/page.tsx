"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Sermons from "@/components/Sermons";
import Schedule from "@/components/Schedule";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="bg-hero dark:bg-church-banner-dark min-h-screen bg-cover bg-center pt-5">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Sermons />
      <Schedule />
      <Footer />
    </>
  );
}
