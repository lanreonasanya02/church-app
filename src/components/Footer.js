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
      <div className="container mx-auto py-20 text-light">
        <h2 className="text-5xl text-center">Get In Touch With Us</h2>

        <div className="w-[70%] h-[800px] grid grid-cols-2 gap-20 mx-auto place-items-center">
          <div className="p-3">
            <h3 className="text-2xl mb-5">
              Let&apos;s Walk This Journey Together – Reach Out to Us Today!
            </h3>

            <div className="flex items-center gap-8 text-lg">
              <IoMdPin size={150} className="text-secondary dark:text-accent" />
              <div>
                <p>
                  10, Shobowale Street, Off Muhammed Lawal street, Cele Village,
                  Alimosho B/Stop, Iyana Ipaja, Lagos state, Nigeria
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 border-y border-muted py-8 mb-5 text-lg">
              <GiRotaryPhone
                size={50}
                className="text-secondary dark:text-accent"
              />
              <div>
                <p>amazinggraceheirs@gmail.com</p>
                <p>+234 (0) 803-367-5080</p>
              </div>
            </div>

            <div className="flex items-center gap-8 text-lg">
              <HiClock size={50} className="text-secondary dark:text-accent" />

              <div>
                <p>Mondays through Sundays</p>
                <p>8 AM - 8 PM (WAT)</p>
              </div>
            </div>
          </div>

          <div className="py-14 px-8 border border-light bg-white dark:bg-muted rounded-lg text-primary">
            <span>Fields marked with an asterisk (*) are mandatory.</span>
            <form
              action="https://formsubmit.co/73741a0f52e7d6a8ca836c9de874ffbd"
              method="POST"
            >
              <div>
                <div className="flex items-center gap-2 mt-5">
                  <input
                    type="text"
                    placeholder="Name*"
                    className="w-full p-3 border-2 border-muted focus:outline-none focus:ring-0 focus:border-primary rounded-lg text-primary"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Surname*"
                    className="w-full p-3 border-2 border-muted  focus:outline-none focus:ring-0 focus:border-primary rounded-lg text-primary"
                    required
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email*"
                  className="w-full p-3 my-5 border-2 border-muted focus:outline-none focus:ring-0 focus:border-primary rounded-lg text-primary"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone*"
                  className="w-full p-3 my-2 border-2 border-muted  focus:outline-none focus:ring-0 focus:border-primary rounded-lg text-primary"
                  required
                />

                <textarea
                  placeholder="Message*"
                  className="w-full p-3 my-2 border-2 border-muted focus:outline-none focus:ring-0 focus:border-primary rounded-lg text-primary"
                  required
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-secondary dark:bg-accent text-white p-3 my-2 rounded-full text-base"
                  onClick={() => setIsSubmitted(true)}
                >
                  {isSubmitted ? "Submitting..." : "Submit"}
                </button>

                <input
                  type="hidden"
                  name="_next"
                  value="https://church-app-blond.vercel.app/thank-you"
                  //   value="https://localhost:3000/thank-you"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 text-sm text-gray-500 p-4 flex justify-between container mx-auto">
        <span>© 2025 Amazing Grace Covenant Prayer Assembly</span>
        <span>
          Made with{" "}
          <span className="inline-block">
            <HiHeart className="text-secondary" />
          </span>
          {" from "}
          <Link
            href="https://lanre-portfolio.netlify.app/"
            className="hover:underline"
          >
            Lanre Adeolu
          </Link>
        </span>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}
