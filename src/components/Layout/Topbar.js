"use client";

import {
  Moon,
  Sun,
  Bell,
  Search,
} from "lucide-react";

export default function Topbar({
  darkMode,
  setDarkMode,
}) {

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">

      <div className="flex items-center gap-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            placeholder="Buscar..."
            className="border rounded-2xl pl-10 pr-4 py-2 w-72"
          />

        </div>

      </div>

      <div className="flex items-center gap-4">

        <button className="bg-gray-100 p-3 rounded-xl">

          <Bell size={20} />

        </button>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="bg-gray-900 text-white p-3 rounded-xl"
        >

          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}

        </button>

      </div>

    </header>
  );
}