import React, { useEffect, useState } from "react";
// import { sermonsData } from "@/data/sermonData";
import { fetchSermons } from "@/db/firebase";
import Image from "next/image";
import Link from "next/link";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Sermons() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [sermonsData, setSermonsData] = useState([]);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 576) {
        setIsMobile(true);
      } else if (window.innerWidth > 577 && window.innerWidth < 992) {
        setIsTablet(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const getSermons = async () => {
      const data = await fetchSermons();
      setSermonsData(data);
    };

    getSermons();
  }, []);

  console.log(sermonsData);

  const itemsPerPage = 6;

  // Filter sermons based on search input
  const filteredSermons = sermonsData.filter(
    (sermon) =>
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate results
  const paginatedSermons = filteredSermons.slice(
    currentPage * (isMobile ? 1 : isTablet ? 4 : itemsPerPage),
    (currentPage + 1) * (isMobile ? 1 : isTablet ? 4 : itemsPerPage)
  );

  return (
    <div
      id="sermons"
      className={`${
        isMobile ? "h-100" : "h-[1600px]"
      } bg-primary text-white py-20 relative`}
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl text-center">Latest Messages</h2>

        <div className="my-10 text-center">
          {/* Search Input */}
          <input
            type="search"
            placeholder="Looking for a sermon?"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
            className="w-[90%] md:w-[500px] py-2 px-5 border rounded-md text-primary"
          />
        </div>

        {/* Sermon Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 px-5 lg:px-0 xl:px-32">
          {paginatedSermons.length > 0 ? (
            paginatedSermons.map((sermon, i) => (
              <div
                key={sermon.id}
                className="relative group text-primary rounded-lg overflow-hidden"
              >
                <Image
                  src={sermon.imageUrl}
                  alt={sermon.title}
                  className={`${
                    isMobile ? "h-60" : "h-80"
                  } w-full object-cover`}
                  width={100}
                  height={100}
                  priority={i === 0}
                />
                <div className="p-8 bg-light dark:bg-muted">
                  <h3 className="text-xl font-bold truncate border-b-2 pb-3 border-muted dark:border-primary">
                    {sermon.title}
                  </h3>

                  <p className="text-base line-clamp-3 my-3">
                    {sermon.message}
                  </p>

                  <div className="flex justify-between border-t-2 border-muted dark:border-primary pt-3 text-sm md:text-base">
                    <p>{sermon.preacher}</p>
                    <p>{sermon.date}</p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out text-white cursor-pointer">
                  <Link
                    href={`/sermons/${sermon.id}`}
                    className="py-3 px-14 mt-10 rounded-full text-base font-normal bg-secondary dark:bg-accent hover:bg-subSecondary dark:hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer"
                  >
                    View Sermon
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-light dark:text-muted">
              Oops...We couldn&apos;t find that sermon!
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div
          className={`${
            isMobile ? "pt-5" : "absolute bottom-10 left-0 right-0 "
          }  mt-5 flex justify-center px-5 gap-4`}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="p-4 bg-subSecondary hover:bg-secondary dark:hover:bg-blue-500 dark:bg-accent transition-all duration-300 text-white rounded-full disabled:bg-gray-400"
          >
            <GrFormPrevious size={20} />
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                (prev + 1) * (isMobile ? 1 : isTablet ? 4 : itemsPerPage) <
                filteredSermons.length
                  ? prev + 1
                  : prev
              )
            }
            disabled={
              (currentPage + 1) *
                (isMobile ? 1 : isTablet ? 4 : itemsPerPage) >=
              filteredSermons.length
            }
            className="p-4 bg-subSecondary hover:bg-secondary dark:hover:bg-blue-500 dark:bg-accent transition-all duration-300 text-white rounded-full disabled:bg-gray-400"
          >
            <GrFormNext size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
