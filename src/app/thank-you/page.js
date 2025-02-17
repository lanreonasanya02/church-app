"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import React from "react";

export default function ThankYouPage() {
  return (
    <>
      <Navbar />

      <div className="grid grid-cols-2 h-screen bg-thank-you dark:bg-thank-you-dark bg-cover">
        <div></div>

        <div className="text-primary dark:text-light grid place-content-center px-36">
          <h1 className="text-8xl font-bold my-5">
            Thank You For Reaching Out!
          </h1>
          <p className="">
            We can&apos;t express our gratitude enough for reaching out to us.
            We would be in touch with you shortly. Have a great day!
          </p>

          <div className="mt-10">
            <Link
              href="/"
              className="py-4 px-14 rounded-full text-base font-normal bg-secondary dark:bg-accent hover:bg-accent dark:hover:bg-secondary transition duration-500 ease-in-out text-white cursor-pointer"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
