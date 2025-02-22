import React, { useState } from "react";
import { sermonsData } from "@/data/sermonData";
import Image from "next/image";
import Link from "next/link";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Sermons() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 6;

  // Filter sermons based on search input
  const filteredSermons = sermonsData.filter(
    (sermon) =>
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate results
  const paginatedSermons = filteredSermons.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div
      id="sermons"
      className="bg-primary text-white py-20 h-[1800px] relative"
    >
      <div className="container mx-auto">
        <h2 className="text-5xl text-center">Latest Messages</h2>

        <div className="my-10  text-center">
          {/* Search Input */}
          <input
            type="search"
            placeholder="Looking for a sermon?"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
            className="w-[500px] py-2 px-5 border rounded-md text-primary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 px-20">
          {paginatedSermons.length > 0 ? (
            paginatedSermons.map((sermon) => (
              <div
                key={sermon.id}
                className="relative group text-primary rounded-lg overflow-hidden"
              >
                <Image
                  src={sermon.imageUrl}
                  alt={sermon.title}
                  className="w-full h-50 object-cover"
                  width={100}
                  height={100}
                />
                <div className="p-8 bg-light dark:bg-muted">
                  <h3 className="text-2xl font-bold truncate border-b-2 pb-3 border-muted dark:border-primary">
                    {sermon.title}
                  </h3>

                  <p className="text-lg line-clamp-3 my-3">{sermon.message}</p>

                  <div className="flex justify-between border-t-2 border-muted dark:border-primary pt-3">
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
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No results found
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-10 left-0 right-0 mt-5 flex justify-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="p-4 hover:bg-blue-500 bg-accent transition-all duration-300 text-white rounded-full disabled:bg-gray-400"
          >
            <GrFormPrevious size={20} />
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                (prev + 1) * itemsPerPage < filteredSermons.length
                  ? prev + 1
                  : prev
              )
            }
            disabled={
              (currentPage + 1) * itemsPerPage >= filteredSermons.length
            }
            className="p-4 hover:bg-blue-500 bg-accent transition-all duration-300 text-white rounded-full disabled:bg-gray-400"
          >
            <GrFormNext size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
