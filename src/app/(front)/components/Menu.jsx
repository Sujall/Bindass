"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Menu({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Menu Container */}
      <div className="fixed top-14 z-50 h-full w-[75%] max-w-[480px] bg-[#e6ecf4] shadow-lg">
       

        {/* Menu Items */}
        <nav className="p-2">
          {[
            { href: "/refund-policy", label: "Refund Policy" },
            { href: "/about-us", label: "About Us" },
            { href: "/rules", label: "Rules" },
            { href: "/privacy-policy", label: "Privacy & Policy" },
            { href: "/terms", label: "Term and Conditions" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}