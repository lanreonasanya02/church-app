import React, { useState } from "react";
import BookingModal from "./BookingModal";

export default function Schedule() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <div
        id="connect"
        className="container mx-auto w-[70%] text-center p-10 md:p-20"
      >
        <h4 className="text-sm tracking-widest uppercase text-accent">
          Guidance That Matters, Right When You Need It
        </h4>
        <h2 className="text-4xl md:text-7xl text-semibold mt-5 mb-16 text-primary dark:text-muted">
          Need Prayers, Counseling, or Listening Ear?
        </h2>

        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="py-3 px-14 rounded-full text-base bg-secondary dark:bg-accent hover:bg-accent dark:hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer"
        >
          Talk To Us
        </button>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
