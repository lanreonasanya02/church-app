import React, { useState } from "react";
import BookingModal from "./BookingModal";

export default function Schedule() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <div className="container mx-auto w-[70%] text-center p-20">
        <h3 className="text-lg text-primary dark:text-muted">
          Guidance That Matters, Right When You Need It
        </h3>
        <h2 className=" text-7xl text-semibold mt-5 mb-16 text-primary dark:text-muted">
          Need Prayers, Counseling, or Listening Ear?
        </h2>

        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="py-3 px-14 rounded-full text-base font-normal bg-secondary dark:bg-accent hover:bg-accent dark:hover:bg-secondary transition duration-500 ease-in-out text-white cursor-pointer"
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
