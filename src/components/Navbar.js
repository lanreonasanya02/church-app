import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LiveServiceModal from "@/components/LiveServiceModal";
import { HiOutlineStatusOnline } from "react-icons/hi";
import axios from "axios";

const MIXLR_USERNAME = "amazing-grace-heirs";

export default function Navbar() {
  const [isLive, setIsLive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <>
      <nav
        className={`flex justify-between container mx-auto border border-dark dark:border-muted bg-dark dark:bg-muted text-light dark:text-primary mt-5 pt-2.5 px-10 rounded-xl fixed top-0 left-0 right-0 transition-all duration-500 z-50 ${
          isMenuOpen ? "h-[90vh]" : "h-20 "
        }`}
      >
        <div>
          <Image
            src="/logo.png"
            alt="logo"
            width={60}
            height={60}
            loading="eager"
            title="Amazing Grace Covenant Prayer Assembly"
          />
        </div>

        <div className="flex justify-center items-center space-x-8 h-16">
          {isLive ? (
            <div className=" space-x-8 text-xs">
              <button
                onClick={() => setIsModalOpen(true)}
                className="py-3 px-14 rounded-full text bg-secondary text-white"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <span className="flex items-center space-x-2">
                    <HiOutlineStatusOnline />
                    <span>LIVE NOW</span>
                  </span>
                </motion.div>
              </button>
            </div>
          ) : (
            <div className="relative group text-xs">
              <button
                onClick={() => setIsModalOpen(true)}
                className="py-3 px-14 rounded-full text bg-secondary dark:bg-accent hover:bg-accent dark:hover:bg-secondary text-white cursor-pointer"
              >
                See Upcoming Program
              </button>
            </div>
          )}

          <div
            onMouseOver={() => setIsMenuOpen(true)}
            onClick={() => setIsMenuOpen(false)}
          >
            <button className="text-xs transform  hover:text-secondary p-2 rounded-lg">
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </div>

          {/* Collapsible Menu */}
          <div
            className={`absolute top-20 right-0 bg-dark dark:bg-muted text-light rounded-lg shadow-lg transition-all duration-500 ease-in-out w-full flex flex-col justify-center ${
              isMenuOpen ? "h-[80vh] overflow-y-auto" : "h-0"
            }`}
          >
            {isMenuOpen && (
              <div className="flex flex-col space-y-14 items-center text-6xl justify-center flex-grow">
                <ScrollLink
                  to="home"
                  smooth={true}
                  duration={500}
                  spy={true}
                  activeClass="text-secondary dark:text-primary"
                  className="hover:text-light text-primary dark:text-accent dark:hover:text-light cursor-pointer transition duration-500 ease-in-out"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </ScrollLink>

                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={500}
                  spy={true}
                  activeClass="text-secondary dark:text-primary"
                  className="hover:text-light text-primary dark:text-accent dark:hover:text-light cursor-pointer transition duration-500 ease-in-out"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </ScrollLink>

                <ScrollLink
                  to="sermons"
                  smooth={true}
                  duration={500}
                  spy={true}
                  activeClass="text-secondary dark:text-primary"
                  className="hover:text-light text-primary dark:text-accent dark:hover:text-light cursor-pointer transition duration-500 ease-in-out"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sermons
                </ScrollLink>

                <ScrollLink
                  to="connect"
                  smooth={true}
                  duration={500}
                  spy={true}
                  activeClass="text-secondary dark:text-primary"
                  className="hover:text-light text-primary dark:text-accent dark:hover:text-light cursor-pointer transition duration-500 ease-in-out"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connect
                </ScrollLink>

                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={500}
                  spy={true}
                  activeClass="text-secondary dark:text-primary"
                  className="hover:text-light text-primary dark:text-accent dark:hover:text-light cursor-pointer transition duration-500 ease-in-out"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </ScrollLink>
              </div>
            )}

            {/* Footer with Copyright Info */}
            {isMenuOpen && (
              <div className="flex justify-between items-center px-10 text-sm text-muted dark:text-primary">
                <span className="">
                  © 2025 Amazing Grace Covenant Prayer Assembly
                </span>
                <span>All rights reserved</span>
              </div>
            )}
          </div>

          <ThemeSwitcher />
        </div>
      </nav>

      <LiveServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        username={MIXLR_USERNAME}
        isLive={isLive}
      />
    </>
  );
}
