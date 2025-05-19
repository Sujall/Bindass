"use client";

import React from "react";
import {
  Navbar,
  Collapse,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 960) setOpenNav(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Navbar className="sticky top-0 z-50 mx-auto max-w-screen-xl bg-black px-12 py-6">
      <div className="flex items-center justify-between text-white">
        {/* Empty left side space for now */}
        <div></div>

        {/* Avatar aligned to right */}
        <div className="flex items-center justify-end w-full lg:w-auto">
          <Avatar
            src="/images/default-user-avatar.png"
            alt="profile"
            size="sm"
            className="cursor-pointer border-2 border-white"
          />
        </div>

        {/* Mobile menu toggle */}
        <IconButton
          variant="text"
          color="white"
          className="lg:hidden ml-4"
          onClick={() => setOpenNav(!openNav)}
          aria-label="Toggle Navigation"
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      {/* Avatar for mobile view */}
      <Collapse open={openNav}>
        <div className="flex justify-end px-4 pb-4 lg:hidden">
          <Avatar
            src="/images/useravatar.png"
            alt="profile"
            size="sm"
            className="cursor-pointer border-2 border-white"
          />
        </div>
      </Collapse>
    </Navbar>
  );
}
