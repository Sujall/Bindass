"use client";

import Link from "next/link";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ClockIcon,
  WalletIcon,
  GiftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { MdOutlineCancel } from "react-icons/md";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`fixed z-50 top-0 left-0 h-full w-64 bg-black text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative lg:block`}
    >
      <Card className="h-full w-full p-4 bg-black text-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="mb-6 px-4 mt-4 flex items-center justify-between">
          <Typography variant="h5" className="text-white font-semibold">
            Dashboard
          </Typography>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close sidebar"
          >
            <MdOutlineCancel className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Navigation List */}
        <List className="space-y-1 flex-grow">
          <Link href="/dashboard/dashboard">
            <ListItem className="hover:bg-gray-800 px-4 py-3 rounded-lg flex items-center gap-4">
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5 text-white" />
              </ListItemPrefix>
              Home
            </ListItem>
          </Link>

          <Link href="/dashboard/history">
            <ListItem className="hover:bg-gray-800 px-4 py-3 rounded-lg flex items-center gap-4">
              <ListItemPrefix>
                <ClockIcon className="h-5 w-5 text-white" />
              </ListItemPrefix>
              History
            </ListItem>
          </Link>

          <Link href="/dashboard/wallet">
            <ListItem className="hover:bg-gray-800 px-4 py-3 rounded-lg flex items-center gap-4">
              <ListItemPrefix>
                <WalletIcon className="h-5 w-5 text-white" />
              </ListItemPrefix>
              Wallet
            </ListItem>
          </Link>

          <Link href="/dashboard/create-giveaway">
            <ListItem className="hover:bg-gray-800 px-4 py-3 rounded-lg flex items-center gap-4">
              <ListItemPrefix>
                <GiftIcon className="h-5 w-5 text-white" />
              </ListItemPrefix>
              Create a Giveaway
            </ListItem>
          </Link>

          <Link href="/dashboard/profile">
            <ListItem className="hover:bg-gray-800 px-4 py-3 rounded-lg flex items-center gap-4">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5 text-white" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </Link>
        </List>
      </Card>
    </aside>
  );
};

export default Sidebar;
