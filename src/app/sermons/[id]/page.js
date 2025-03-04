"use client";
import { use, useEffect, useState } from "react";
import { fetchSermonById } from "@/db/firebase";
import TextFormatter from "@/utils/TextFormatter";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { BiMessageRoundedError } from "react-icons/bi";
import FloatingBibleDock from "@/utils/FloatingBible";
import { SecondaryLoading } from "@/utils/Loading";
import { GrClose } from "react-icons/gr";

export default function SermonPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const [sermon, setSermon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      {isLoading ? (
        <SecondaryLoading />
      ) : (
        <div className="bg-light dark:bg-primary min-h-screen bg-cover bg-center pt-5 pb-10">
          <Navbar />

          <div className="container mx-auto mt-32">
            <div className="fixed right-20 rounded-full p-5 hover:bg-secondary bg-subSecondary text-light dark:bg-accent  hover:text-light dark:hover:bg-subSecondary cursor-pointer transition duration-500 ease-in-out">
              <Link href={"/"} className="flex gap-2 items-center text-sm">
                <GrClose size={24} />
              </Link>
            </div>

            <div className="px-32">
              {sermon ? (
                <div className=" text-primary dark:text-light p-10">
                  <h2 className="text-5xl font-semibold mb-12 text-center">
                    {sermon.title}
                  </h2>

                  <div className="grid grid-cols-3 items-center text-lg italic">
                    <p>Minister - {sermon.preacher}</p>
                    <p className="md:text-center">{sermon.program}</p>
                    <p className="md:text-end">{sermon.date}</p>
                  </div>

                  <div className="my-8">
                    <iframe
                      src={`https://amazing-grace-heirs.mixlr.com/recordings/${sermon.id}/embed`}
                      height="200px"
                      width="100%"
                      className="rounded-xl"
                    ></iframe>
                  </div>

                  <div className="mt-16 mb-10">
                    <p className="text-xl mb-5 italic">
                      Study Text: {sermon.studyText}
                    </p>
                    <TextFormatter text={sermon.message} />
                  </div>

                  <div className="text-lg text-light bg-primary border-2 border-primary dark:border-muted rounded-xl p-5">
                    <p>Prayer points:</p>
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
