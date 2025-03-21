import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LiveServiceModal from "@/components/LiveServiceModal";
import { HiOutlineStatusOnline } from "react-icons/hi";
import Link from "next/link";
import ScheduleModal from "@/components/ScheduleModal";

export default function Navbar({ todayProgram, isLive, username }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevents scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleScheduleModal = () => {
    setIsMenuOpen(false);
    setIsScheduleModalOpen(true);
  };

  return (
    <>
      <nav className="pt-2 md:pt-5 h-16 md:h-24 fixed top-0 left-0 right-0 backdrop-blur-md z-50">
        <div
          className={`relative flex justify-between mx-2 md:container md:mx-auto border border-dark bg-dark text-light dark:text-primary md:pt-2.5 px-5 md:px-10 rounded-xl transition-all duration-500 z-50 ${
            isMenuOpen
              ? "h-[65vh] md:h-[80vh] dark:bg-dark"
              : "h-14 md:h-20 dark:bg-muted dark:border-muted"
          }`}
        >
          <div className="w-11 md:w-16">
            <Link href={"/"}>
              <Image
                src="/logo.png"
                alt="logo"
                width={60}
                height={60}
                loading="eager"
                title="Amazing Grace Covenant Prayer Assembly"
                className="cursor-pointer pt-1.5 md:pt-0"
              />
            </Link>
          </div>

          <div className="flex justify-center items-center space-x-8 h-14 md:h-16">
            {isLive ? (
              <div className=" space-x-8 text-xs">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hidden md:block py-3 px-14 rounded-full text-sm bg-secondary text-white"
                >
                  <motion.div
                    animate={{
                      x: [0, -5, 5, -5, 0],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <span className="flex items-center space-x-2">
                      <HiOutlineStatusOnline />
                      <span>{todayProgram} is live. Click to listen</span>
                    </span>
                  </motion.div>
                </button>
              </div>
            ) : (
              <div className="relative group text-xs">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hidden md:block py-3 px-14 rounded-full text-sm bg-secondary dark:bg-accent hover:bg-subSecondary dark:hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer"
                >
                  See Upcoming Program
                </button>
              </div>
            )}

            <div onClick={() => setIsMenuOpen((prev) => !prev)}>
              <button
                className={`${
                  isMenuOpen ? "text-secondary" : ""
                } text-xs transform hover:text-subSecondary p-2 rounded-lg w-[100px]`}
              >
                {isMenuOpen ? "Close Menu" : "Menu"}
              </button>
            </div>

            {/* Collapsible Menu */}
            <div
              className={`absolute top-20 right-0 bg-dark dark:bg-dark  text-light rounded-lg shadow-lg transition-all duration-500 ease-in-out w-full flex flex-col justify-center ${
                isMenuOpen ? "h-[65vh] md:h-[80vh] overflow-y-auto" : "h-0"
              }`}
            >
              {isMenuOpen && (
                <div className="flex flex-col space-y-8 md:space-y-14 items-center text-3xl md:text-5xl justify-center flex-grow">
                  <ScrollLink
                    to="home"
                    smooth={true}
                    duration={500}
                    spy={true}
                    activeClass="text-secondary dark:text-muted"
                    className="text-light md:hover:text-light md:text-muted dark:text-accent dark:hover:text-primary cursor-pointer transition duration-500 ease-in-out"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </ScrollLink>

                  <ScrollLink
                    to="about"
                    smooth={true}
                    duration={500}
                    spy={true}
                    activeClass="text-secondary dark:text-muted"
                    className="text-light md:hover:text-light md:text-muted dark:text-accent dark:hover:text-primary cursor-pointer transition duration-500 ease-in-out"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </ScrollLink>

                  <ScrollLink
                    to="sermons"
                    smooth={true}
                    duration={500}
                    spy={true}
                    activeClass="text-secondary dark:text-muted"
                    className="text-light md:hover:text-light md:text-muted dark:text-accent dark:hover:text-primary cursor-pointer transition duration-500 ease-in-out"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sermons
                  </ScrollLink>

                  <ScrollLink
                    to="outreach"
                    smooth={true}
                    duration={500}
                    spy={true}
                    activeClass="text-secondary dark:text-muted"
                    className="text-light md:hover:text-light md:text-muted dark:text-accent dark:hover:text-primary cursor-pointer transition duration-500 ease-in-out"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Outreach
                  </ScrollLink>

                  <ScrollLink
                    to="contact"
                    smooth={true}
                    duration={500}
                    spy={true}
                    activeClass="text-secondary dark:text-muted"
                    className="text-light md:hover:text-light md:text-muted dark:text-accent dark:hover:text-primary cursor-pointer transition duration-500 ease-in-out"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </ScrollLink>

                  <button
                    onClick={handleScheduleModal}
                    className="md:hidden py-3 px-14 mt-10 rounded-full text-base font-normal bg-secondary dark:bg-accent hover:bg-subSecondary dark:hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer"
                  >
                    Explore Programs
                  </button>
                </div>
              )}

              {/* Footer with Copyright Info */}
              {isMenuOpen && (
                <div className="hidden md:flex justify-between items-center px-10 mb-3 text-sm text-muted dark:text-accent">
                  <span>© 2025 Amazing Grace Heirs</span>
                  <span>All rights reserved</span>
                </div>
              )}
              {/* Mobile screen */}
              {isMenuOpen && (
                <div className="md:hidden px-10 mb-3 text-xs text-center text-muted dark:text-accent">
                  <span>© 2025 Amazing Grace Heirs. All rights reserved.</span>
                </div>
              )}
            </div>

            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      <LiveServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        username={username}
        isLive={isLive}
      />
    </>
  );
}
