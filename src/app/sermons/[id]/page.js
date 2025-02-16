"use client";
import { use } from "react";
import { sermonsData } from "@/data/sermonData";
import TextFormatter from "@/utils/TextFormatter";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { BiMessageRoundedError } from "react-icons/bi";

export default function SermonPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const sermon = sermonsData.find((sermon) => sermon.id.toString() === id);

  return (
    <>
      <div className="bg-light dark:bg-primary min-h-screen bg-cover bg-center pt-5 pb-10">
        <Navbar />

        {sermon ? (
          <div className="mt-52 container mx-auto text-primary dark:text-light">
            <h2 className="text-4xl font-semibold mb-8 text-center">
              {sermon.program} - {sermon.title}
            </h2>

            <div className="flex justify-between items-center text-lg">
              <p>Minister: {sermon.preacher}</p>

              <p>{sermon.date}</p>
            </div>

            <div className="my-8">
              <iframe
                src={`https://amazing-grace-heirs.mixlr.com/recordings/${sermon.id}/embed`}
                height="200px"
                width="100%"
                className="rounded-xl"
              ></iframe>
            </div>

            <TextFormatter text={sermon.message} />

            <div className="text-lg text-light bg-primary border-2 border-primary dark:border-muted rounded-xl p-5">
              <p>Prayer points:</p>
              <ol className="list-decimal list-inside">
                {sermon.prayers
                  .split(/\d+\.\s+/)
                  .map((prayer, index) =>
                    prayer.trim() ? <li key={index}>{prayer}</li> : null
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
              href="/#sermons"
              className="py-3 px-14 mt-10 rounded-full text-base font-normal bg-secondary dark:bg-accent hover:bg-accent dark:hover:bg-secondary transition duration-500 ease-in-out text-white cursor-pointer"
            >
              Return to Sermons List
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
