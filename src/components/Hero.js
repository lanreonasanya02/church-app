import React from "react";
import ScrambleText from "@/components/ScrambledText";

export default function Hero() {
  return (
    <div className="h-screen container grid grid-cols-2 mx-auto place-content-center">
      <div className=" px-16">
        <span className="text-xl text-primary dark:text-accent">
          Shalom in Christ
        </span>
        <h1 className="text-6xl font-bold">
          We Are A Community of Devoted Puritans Committed to God&apos;s Word
          through
          <br />
          <ScrambleText
            texts={[
              "Discipleship",
              "Faith",
              "Devotion",
              "Worship",
              "Fellowship",
            ]}
          />
          .
        </h1>
      </div>

      <div></div>
    </div>
  );
}
