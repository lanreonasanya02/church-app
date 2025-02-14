import React, { useState, useEffect } from "react";

const ScrambledText = ({ texts, duration = 3 }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    let step = 0;
    let scrambleInterval;

    const scrambleText = (original, step) => {
      return original
        .split("")
        .map((char, i) =>
          i < step
            ? char
            : characters[Math.floor(Math.random() * characters.length)]
        )
        .join("");
    };

    const startScrambling = () => {
      scrambleInterval = setInterval(() => {
        setDisplayText(scrambleText(texts[index], step));
        step++;

        if (step > texts[index].length) {
          clearInterval(scrambleInterval);
          setTimeout(() => {
            setIndex((prev) => (prev + 1) % texts.length);
          }, duration * 1000);
        }
      }, 100);
    };

    startScrambling();

    return () => clearInterval(scrambleInterval);
  }, [index, texts, duration]);

  return (
    <span className="text-6xl mt-3 text-secondary dark:text-accent">
      {displayText}
    </span>
  );
};

export default ScrambledText;
