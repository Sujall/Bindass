"use client";

import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
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
    <Navbar className="mx-auto max-w-screen-xl bg-black px-12 py-6">
      <div className="flex items-center justify-between text-white">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Material Tailwind
        </Typography>

        <div className="hidden lg:flex justify-end">
          <div className="flex gap-2">
            <Button variant="text" size="sm" className="text-white">
              Log In
            </Button>
            <Button variant="gradient" size="sm" className="bg-white text-black">
              Sign In
            </Button>
          </div>
        </div>

        <IconButton
          variant="text"
          color="white"
          className="lg:hidden"
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

      <Collapse open={openNav}>
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          <Button variant="outlined" size="sm" className="text-white border-white" fullWidth>
            Log In
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            Sign In
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
