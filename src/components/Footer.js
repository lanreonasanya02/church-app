"use client";
import Link from "next/link";
import React, { useState } from "react";
import { GiRotaryPhone } from "react-icons/gi";
import { HiClock, HiHeart } from "react-icons/hi";
import { IoMdPin } from "react-icons/io";

export default function Footer() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <footer id="contact" className="bg-church-hero bg-cover relative">
      <div className="container mx-auto px-10 md:px-0 py-24 text-light dark:text-muted">
        <h2 className="text-4xl md:text-5xl text-center">
          Get In Touch With Us
        </h2>

        <div className="w-100 md:w-[70%] md:h-[800px] grid md:grid-cols-2 gap-y-14 md:gap-x-20 mx-auto place-items-center">
          <div className="md:p-3">
            <h3 className="text-lg md:text-2xl my-5 text-center md:text-start">
              Let&apos;s Walk This Journey Together – <br />
              Reach Out to Us Today!
            </h3>

            <div className="flex items-center gap-3 md:gap-x-8 text-lg">
              <IoMdPin
                size={150}
                className="text-subSecondary dark:text-accent"
              />
              <div>
                <p>
                  10, Shobowale Street, Off Muhammed Lawal street, Cele Village,
                  Alimosho B/Stop, Iyana Ipaja, Lagos state, Nigeria
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 md:gap-8 border-y border-muted py-8 mb-5 text-lg">
              <GiRotaryPhone
                size={50}
                className="text-subSecondary dark:text-accent"
              />
              <div>
                <p>amazinggraceheirs@gmail.com</p>
                <p>+234 (0) 803-367-5080</p>
              </div>
            </div>

            <div className="flex items-center gap-5 md:gap-8 text-lg">
              <HiClock
                size={50}
                className="text-subSecondary dark:text-accent"
              />

              <div>
                <p>Mondays through Sundays</p>
                <p>8 AM - 8 PM (WAT)</p>
              </div>
            </div>
          </div>

          <div className="py-12 px-8 border border-light bg-none dark:bg-accent rounded-xl text-primary">
            <span className="text-light">
              Fields marked with an asterisk (*) are mandatory.
            </span>
            <form
              action="https://formsubmit.co/73741a0f52e7d6a8ca836c9de874ffbd"
              method="POST"
            >
              <div>
                <div className="flex items-center gap-2 mt-5">
                  <input
                    type="text"
                    placeholder="Name *"
                    className="w-full p-3 bg-light dark:bg-primary border-2 border-muted dark:border-primary focus:outline-none focus:ring-0 focus:border-primary rounded-lg dark:text-light"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Surname *"
                    className="w-full p-3 bg-light dark:bg-primary border-2 border-muted dark:border-primary  focus:outline-none focus:ring-0 focus:border-primary rounded-lg dark:text-light"
                    required
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email *"
                  className="w-full p-3 my-5 bg-light dark:bg-primary border-2 border-muted dark:border-primary focus:outline-none focus:ring-0 focus:border-primary rounded-lg dark:text-light"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone *"
                  className="w-full p-3 my-2 bg-light dark:bg-primary border-2 border-muted dark:border-primary  focus:outline-none focus:ring-0 focus:border-primary rounded-lg dark:text-light"
                  required
                />

                <textarea
                  placeholder="Message"
                  className="w-full p-3 my-2 bg-light dark:bg-primary border-2 border-muted dark:border-primary focus:outline-none focus:ring-0 focus:border-primary rounded-lg dark:text-light"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-subSecondary dark:bg-primary hover:bg-secondary p-3 my-2 rounded-full text-base dark:hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer"
                  onClick={() => setIsSubmitted(true)}
                >
                  {isSubmitted ? "Submitting..." : "Submit"}
                </button>

                <input
                  type="hidden"
                  name="_next"
                  value="https://church-app-blond.vercel.app/thank-you"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="md:absolute bottom-5 left-0 right-0 text-sm text-gray-500 p-4 flex flex-col gap-y-3 md:flex-row md:justify-between text-center container mx-auto">
        <span>© 2025 Amazing Grace Heirs</span>
        <span className="md:hidden">All rights reserved.</span>
        <span>
          Made with{" "}
          <span className="inline-block">
            <HiHeart className="text-secondary" />
          </span>
          {" by "}
          <Link
            href="https://lanre-portfolio.netlify.app/"
            className="hover:underline"
          >
            Lanre Adeolu
          </Link>
        </span>
        <span className="hidden md:inline-block">All rights reserved.</span>
      </div>
    </footer>
  );
}
