"use client";

import "./globals.css";

import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function RootLayout({
  children,
}) {

  const [darkMode, setDarkMode] =
    useState(false);

  return (
    <html lang="es">

      <body
        className={
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-black"
        }
      >

        <div className="flex">

          <Sidebar />

          <main className="flex-1 min-h-screen">

            <Topbar
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />

            <div className="p-6">
              {children}
            </div>

          </main>

        </div>

      </body>

    </html>
  );
}