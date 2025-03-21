"use client";
import { use, useEffect, useState } from "react";
import { fetchSermonById } from "@/db/firebase";
import TextFormatter from "@/utils/TextFormatter";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { BiMessageRoundedError } from "react-icons/bi";
import FloatingBibleDock from "@/utils/FloatingBible";
import { SecondaryLoading } from "@/utils/Loading";
import { GrClose, GrFormPrevious } from "react-icons/gr";

export default function SermonPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const [sermon, setSermon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (id) {
      fetchSermonById(id).then((data) => {
        if (data) {
          setSermon(data);
          setIsLoading(false);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 576);
      // setIsTablet(window.innerWidth >= 576 && window.innerWidth < 992);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      {isLoading ? (
        <SecondaryLoading />
      ) : (
        <div className="bg-light dark:bg-primary min-h-screen bg-cover bg-center pt-5 pb-10">
          <Navbar />

          <div className="container mx-auto mt-28 md:mt-32">
            {!isMobile && (
              <div className="fixed right-20 p-5 group">
                <Link
                  href={"/"}
                  className="flex gap-2 items-center text-sm hover:text-secondary  text-primary dark:bg-accent  dark:hover:bg-subSecondary cursor-pointer transition duration-500 ease-in-out"
                >
                  <GrClose size={24} />
                </Link>

                {!isMobile && (
                  <span className="absolute top-14 p-1 text-xs font-bold text-white bg-gray-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Close
                  </span>
                )}
              </div>
            )}

            {isMobile && (
              <div>
                <Link
                  href={"/"}
                  className="flex gap-1 items-center text-base cursor-pointer text-subSecondary ps-5"
                >
                  <GrFormPrevious size={20} />
                  <span>Exit</span>
                </Link>
              </div>
            )}

            <div className="md:px-32">
              {sermon ? (
                <div className=" text-primary dark:text-light p-5 md:p-10">
                  <h2 className="text-3xl md:text-5xl font-semibold my-5 md:mb-12 text-center">
                    {sermon.title}
                  </h2>

                  <div className="md:grid grid-cols-3 items-center text-base md:text-lg italic">
                    <p>
                      <strong>Minister:</strong> {sermon.preacher}
                    </p>
                    <p className="md:text-center">
                      <strong>Program:</strong> {sermon.program}
                    </p>
                    <p className="md:text-end">
                      <strong>Date:</strong> {sermon.date}
                    </p>
                  </div>

                  <div className="my-8">
                    <iframe
                      src={`https://amazing-grace-heirs.mixlr.com/recordings/${sermon.id}/embed`}
                      height="200px"
                      width="100%"
                      className="rounded-xl"
                    ></iframe>
                  </div>

                  <div className="md:mt-16 mb-10">
                    <p className="text-base md:text-lg mb-5 italic">
                      <strong>Study Text:</strong> {sermon.studyText}
                    </p>
                    <TextFormatter
                      text={sermon.message}
                      maxSentences={isMobile ? 2 : 5}
                    />
                  </div>

                  <div className="text-base md:text-lg text-light bg-primary border-2 border-primary dark:border-muted rounded-xl p-5">
                    <p className="font-semibold">
                      Prayer point
                      {sermon.prayers.split(/;\s*/).length > 1 ? "s" : ""}:
                    </p>
                    {sermon.prayers.split(/;\s*/).length > 1 ? (
                      <ol className="list-decimal list-outside">
                        {sermon.prayers.split(/;\s*/).map((prayer, index) =>
                          prayer.trim() ? (
                            <li
                              key={index}
                              className="ml-10 pl-4 leading-relaxed"
                            >
                              {prayer}
                            </li>
                          ) : null
                        )}
                      </ol>
                    ) : (
                      <ul>
                        {sermon.prayers.split(/;\s*/).map((prayer, index) =>
                          prayer.trim() ? (
                            <li
                              key={index}
                              className="ml-8 mt-2 leading-relaxed"
                            >
                              {prayer}
                            </li>
                          ) : null
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-screen">
                  <BiMessageRoundedError
                    size={100}
                    className="text-primary dark:text-muted"
                  />
                  <h1 className="text-3xl font-bold text-primary dark:text-muted my-5">
                    Sermon Not Found
                  </h1>
                  <p className="text-primary dark:text-muted">
                    Oops, we could not find the sermon you were looking for!
                  </p>

                  <Link
                    href="/"
                    className="py-3 px-14 mt-10 rounded-full text-base font-normal bg-secondary dark:bg-accent hover:bg-accent dark:hover:bg-secondary transition duration-500 ease-in-out text-white cursor-pointer"
                  >
                    Return to Sermons List
                  </Link>
                </div>
              )}
            </div>
          </div>

          <FloatingBibleDock />
        </div>
      )}
    </>
  );
}
