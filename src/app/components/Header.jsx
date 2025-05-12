// src/app/components/Header.jsx
'use client';
import { FiMenu, FiBell } from "react-icons/fi";
import useScreenSize from "../hooks/useScreenSize";
import Link from 'next/link';

export const Header = () => {
  const isLargeScreen = useScreenSize(576);

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-[#e6ecf4] min-h-12"
    >
      {/* Left: Hamburger menu always visible */}
      <div className="flex-1 flex items-center">
        <FiMenu className="text-2xl text-gray-700" />
      </div>
      {/* Center: Website name, always centered */}
      <h1 className="flex-1 text-center text-lg font-bold text-blue-600">
        Bindass Online
      </h1>
      {/* Right: Notification icon always visible */}
      <div className="flex-1 flex items-center justify-end">
        <Link href="notificaton">
          <FiBell className="text-2xl text-gray-700 cursor-pointer" />
        </Link>
      </div>
    </header>
  );
};
