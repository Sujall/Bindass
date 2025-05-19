"use client";
import { FiMenu, FiX, FiBell } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "./Menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#e6ecf4] shadow-sm max-w-[480px] w-full mx-auto">
        {/* Menu Toggle Button */}
        <button
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FiX className="text-xl text-gray-700" />
          ) : (
            <FiMenu className="text-xl text-gray-700" />
          )}
        </button>

        <div className="absolute left-0 right-0 mx-auto w-fit">
          <Link href="/home">
            <h2 className="text-lg font-bold text-blue-600 cursor-pointer">
              Bindaas
            </h2>
          </Link>
        </div>

        {/* Notification Bell */}
        <Link
          href="/notification"
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          aria-label="Notifications"
        >
          <FiBell className="text-xl text-gray-700" />
        </Link>
      </header>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
