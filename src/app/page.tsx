"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="bg-hero dark:bg-church-banner-dark min-h-screen bg-cover bg-center pt-5">
      <Navbar />
      <Hero />
    </div>
  );
}
