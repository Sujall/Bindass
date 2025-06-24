"use client";
import { IoMenu, IoClose, IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "./Menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#e6ecf4] shadow-sm max-w-[480px] w-full mx-auto">
        {/* Menu Toggle Button */}
        <button
          className="p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <IoClose className="text-xl text-gray-700 font-bold" />
          ) : (
            <IoMenu className="text-xl text-gray-700 font-bold" />
          )}
        </button>

        {/* Centered Logo */}
        <div className="absolute left-0 right-0 mx-auto w-fit">
          <Link href="/home" className="cursor-pointer">
            <h2 className="text-lg font-bold text-blue-600">Bindaas</h2>
          </Link>
        </div>

        {/* Notification Bell */}
        <Link
          href="/notification"
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          aria-label="Notifications"
        >
          <IoNotificationsOutline className="text-xl text-gray-700 font-bold" />
        </Link>
      </header>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}