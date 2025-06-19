"use client";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.theme = newTheme;
    document.documentElement.classList.toggle("dark");
    setTheme(newTheme);
  };

  return (
    <>
      <div
        className="hidden relative md:inline-flex items-center w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full cursor-pointer"
        onClick={toggleTheme}
      >
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-1">
          <FaSun className={"text-yellow-500 opacity-100"} />
          <FaMoon className={"text-indigo-800 opacity-100"} />
        </div>

        {/* Sliding Toggle */}
        <div
          className={`
          absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out
          ${theme === "dark" ? "translate-x-8" : "translate-x-1"}
        `}
        />
      </div>

      {/* Mobile Theme Switcher */}
      <div className="md:hidden cursor-pointer" onClick={toggleTheme}>
        {theme === "dark" ? (
          <FaSun size={25} className={"text-yellow-600"} />
        ) : (
          <FaMoon size={20} className={"text-gray-300"} />
        )}
      </div>
    </>
  );
}
