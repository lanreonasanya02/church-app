import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";
import Image from "next/image";

export function PrimaryLoading() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="bg-dark dark:bg-darkBackground h-screen grid place-content-center w-100">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2, direction: "none" },
            line_linked: { enable: false },
          },
        }}
        className="absolute inset-0"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }} // Starts invisible and small
        animate={{ opacity: 1, scale: 1 }} // Fades in and scales up
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }} // Gentle floating effect
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={1080}
            height={1080}
            title="Amazing Grace Covenant Prayer Assembly"
            className="cursor-pointer pt-1.5 md:pt-0 w-[250px]"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function SecondaryLoading() {
  return (
    <div className="bg-light dark:bg-darkBackground h-screen grid place-content-center w-100">
      <Image
        src="/logo.png"
        alt="logo"
        width={1080}
        height={1080}
        loading="eager"
        title="Amazing Grace Covenant Prayer Assembly"
        className="cursor-pointer pt-1.5 md:pt-0 w-[200px]"
        priority
      />
    </div>
  );
}
