import React from "react";
import { sermonsData } from "../data/sermonData";
import Image from "next/image";
import Link from "next/link";

export default function Sermons() {
  return (
    <div id="sermons" className="bg-primary text-white py-20">
      <div className="container mx-auto">
        <h2 className="text-5xl text-center">Latest Messages</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {sermonsData.map((sermon) => (
            <div
              key={sermon.id}
              className="relative group bg-white text-primary rounded-lg overflow-hidden"
            >
              <Image
                src={sermon.imageUrl}
                alt={sermon.title}
                className="w-full h-50 object-cover"
                width={100}
                height={100}
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold truncate border-b-2 pb-3">
                  {sermon.title}
                </h3>

                <p className="text-lg line-clamp-3 my-3">{sermon.message}</p>

                <div className="flex justify-between border-t-2 pt-3">
                  <p className="text-base">{sermon.preacher}</p>
                  <p className="text-base">Date: {sermon.date}</p>
                </div>
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out text-white cursor-pointer">
                <Link
                  href={`/sermons/${sermon.id}`}
                  className="py-3 px-14 mt-10 rounded-full text-base font-normal bg-secondary dark:bg-accent hover:bg-accent dark:hover:bg-secondary transition duration-500 ease-in-out text-white cursor-pointer"
                >
                  View Sermon
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
