import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
  "/img6.jpg",
  "/img7.jpg",
  "/img8.jpg",
  "/img9.jpg",
  "/img10.jpg",
  "/img11.jpg",
  "/img12.jpg",
  "/img13.jpg",
  "/img14.jpg",
  "/img15.jpg",
];

// Shuffle function
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5).slice(0, 5); // Get 5 random images
};

export default function About() {
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    // Ensure this runs only on the client
    setCurrentImages(shuffleArray(images));

    const interval = setInterval(() => {
      setCurrentImages(shuffleArray(images));
    }, 6000); // Shuffle every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="about"
      className="md:grid grid-cols-2 flex flex-col-reverse container mx-auto place-items-center md:h-[900px] text-primary dark:text-muted pt-20 pb-16 md:py-0"
    >
      <div className="px-8 md:px-16 text-primary dark:text-muted">
        <h4 className="hidden md:block text-sm tracking-widest uppercase text-accent">
          About Us
        </h4>
        <h2 className="hidden md:block text-5xl my-3">A Family in Christ</h2>

        <p className="mt-3 md:mt-10 italic">Calvary Greetings,</p>
        <br />

        <div className="text-justify">
          <p>
            We are a vibrant community dedicated to studying God&apos;s Word and
            living daily in submission to Jesus Christ, our Lord and Savior. Our
            mission is to raise disciples who glorify God through faith, hope,
            and sound doctrine.
          </p>
          <br />
          <p>
            We prioritize Bible-centered teaching, active discipleship, and
            communal worship, fostering an environment for spiritual growth and
            connection. We invite everyone to join our weekly services and
            engage with our programs, as we seek to uplift and inspire one
            another in our faith journey.
          </p>
          <br />
          <div>
            <p>
              Worship with us and be part of our spirit-filled services. Stay
              connected with us and explore devotionals and sermons and engage
              with our church family. Also, grow in faith and experience
              powerful teachings that shape lives.
            </p>

            <br />
            <p>We look forward to welcoming you into our family. Shalom!</p>
            <br />
            <p>Yours in Christ,</p>
            <p className="font-bold">Amazing Grace Heirs.</p>
          </div>
        </div>
      </div>

      {/* Fixed height container to prevent layout shift */}
      <div className="w-[90%] md:w-[65%] h-[850px] md:h-[700px]">
        {/* For Mobile display only */}
        <div className="md:hidden">
          <h4 className="text-sm text-center tracking-widest uppercase text-accent">
            About Us
          </h4>
          <h2 className="text-4xl text-center my-3 ">A Family in Christ</h2>
          <br />
        </div>
        <div className="grid grid-cols-2 gap-4 relative">
          <AnimatePresence mode="popLayout">
            {currentImages.length > 0 && (
              <motion.div
                key={currentImages.join(",")} // Use key to trigger re-render smoothly
                className="absolute inset-0 grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                {currentImages.map((img, i) => (
                  <motion.div
                    key={img}
                    className={`relative rounded-xl overflow-hidden shadow-lg ${
                      i === 0 ? "col-span-2 h-[250px]" : "h-[200px]"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={img}
                      alt={`Gallery Image ${i + 1}`}
                      className="w-full h-full object-cover object-top rounded-xl"
                      width={100}
                      height={100}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
