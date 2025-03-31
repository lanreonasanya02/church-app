"use client";
import { useState, useEffect } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function BibleViewer() {
  const versions = ["KJV", "BBE", "ASV"];

  const books = {
    Genesis: 50,
    Exodus: 40,
    Leviticus: 27,
    Numbers: 36,
    Deuteronomy: 34,
    Joshua: 24,
    Judges: 21,
    Ruth: 4,
    "1 Samuel": 31,
    "2 Samuel": 24,
    "1 Kings": 22,
    "2 Kings": 25,
    "1 Chronicles": 29,
    "2 Chronicles": 36,
    Ezra: 10,
    Nehemiah: 13,
    Esther: 10,
    Job: 42,
    Psalms: 150,
    Proverbs: 31,
    Ecclesiastes: 12,
    SongOfSongs: 8,
    Isaiah: 66,
    Jeremiah: 52,
    Lamentations: 5,
    Ezekiel: 48,
    Daniel: 12,
    Hosea: 14,
    Joel: 3,
    Amos: 9,
    Obadiah: 1,
    Jonah: 4,
    Micah: 7,
    Nahum: 3,
    Habakkuk: 3,
    Zephaniah: 3,
    Haggai: 2,
    Zechariah: 14,
    Malachi: 4,
    Matthew: 28,
    Mark: 16,
    Luke: 24,
    John: 21,
    Acts: 28,
    Romans: 16,
    "1 Corinthians": 16,
    "2 Corinthians": 13,
    Galatians: 6,
    Ephesians: 6,
    Philippians: 4,
    Colossians: 4,
    "1 Thessalonians": 5,
    "2 Thessalonians": 3,
    "1 Timothy": 6,
    "2 Timothy": 4,
    Titus: 3,
    Philemon: 1,
    Hebrews: 13,
    James: 5,
    "1 Peter": 5,
    "2 Peter": 3,
    "1 John": 5,
    "2 John": 1,
    "3 John": 1,
    Jude: 1,
    Revelation: 22,
  };

  const [version, setVersion] = useState(versions[0]);
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [verseText, setVerseText] = useState("Enter a chapter and verse");
  const [maxVerses, setMaxVerses] = useState(1);

  useEffect(() => {
    if (chapter) fetchMaxVerses();
  }, [book, chapter]);

  useEffect(() => {
    if (chapter && verse) fetchVerse();
  }, [version, book, chapter, verse]);

  async function fetchVerse() {
    try {
      const response = await fetch(
        `https://bible-api.com/${book}+${chapter}:${verse}?translation=${version.toLowerCase()}&single_chapter_book_matching=indifferent`
      );
      const data = await response.json();
      setVerseText(data.text || "Verse not found");
    } catch (error) {
      console.error("Error fetching verse:", error);
      setVerseText("Error fetching verse. Check internet connection.");
    }
  }

  async function fetchMaxVerses() {
    try {
      const response = await fetch(
        `https://bible-api.com/${book}+${chapter}?translation=${version.toLowerCase()}`
      );
      const data = await response.json();
      if (data.verses) {
        setMaxVerses(data.verses.length);
      }
    } catch (error) {
      console.error("Error fetching max verses:", error);
    }
  }

  return (
    <div className="px-2 py-5 text-center w-[100%] h-[100%] flex flex-col justify-between bg-light dark:bg-darkBackground">
      {/* Dropdowns for Version & Book */}
      <div>
        <div className="mb-4 flex items-center gap-3 justify-center">
          <select
            className="p-1 text-sm text-primary border border-primary dark:border-muted rounded"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          >
            {versions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>

          <select
            className="p-1 text-sm text-primary border border-primary dark:border-muted rounded"
            value={book}
            onChange={(e) => {
              setBook(e.target.value);
              setChapter("");
              setVerse("");
              setVerseText("Enter a chapter and verse");
            }}
          >
            {Object.keys(books).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter & Verse Inputs */}
        <div className="flex justify-center gap-3 mb-4">
          <input
            type="number"
            className="p-1 text-base text-primary border border-primary dark:border-muted rounded w-20 text-center"
            value={chapter}
            min={1}
            max={books[book]}
            onChange={(e) => {
              const value = e.target.value
                ? Math.max(1, Math.min(books[book], Number(e.target.value)))
                : "";
              setChapter(value);
              setVerse("");
              setVerseText("Enter a verse");
            }}
            placeholder="chapter"
          />

          <input
            type="number"
            className="p-1 text-base text-primary border border-primary dark:border-muted rounded w-20 text-center"
            value={verse}
            min={1}
            max={maxVerses}
            onChange={(e) => {
              const value = e.target.value
                ? Math.max(1, Math.min(maxVerses, Number(e.target.value)))
                : "";
              setVerse(value);
            }}
            placeholder="verse"
          />
        </div>

        {/* Verse Display */}
        <p className="text-base bg-white text-primary h-[330px] p-2 rounded flex flex-grow items-center justify-center overflow-y-auto border border-primary dark:border-muted">
          {verseText}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="p-4 bg-accent hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer rounded-full disabled:bg-gray-400"
          onClick={() => setVerse((prev) => prev - 1)}
          disabled={!verse || verse <= 1}
        >
          <GrFormPrevious size={20} />
        </button>
        <button
          className="p-4 bg-accent hover:bg-blue-500 transition duration-500 ease-in-out text-white cursor-pointer rounded-full disabled:bg-gray-400"
          onClick={() => setVerse((prev) => prev + 1)}
          disabled={!verse || verse >= maxVerses}
        >
          <GrFormNext size={20} />
        </button>
      </div>
    </div>
  );
}
