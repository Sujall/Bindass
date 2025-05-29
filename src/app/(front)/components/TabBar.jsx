"use client";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineHistory } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

export const TabBar = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  const handleNavigation = (tab, path) => {
    const protectedTabs = ["history", "wallet", "giveaway", "profile"];

    if (protectedTabs.includes(tab)) {
      router.push("/login");
      return;
    }

    setActiveTab(tab);
    router.push(path);
  };

  return (
    <div className="bg-white border-t border-gray-200 rounded-t-xl">
      <div className="flex justify-between items-center px-2 py-1">
        {/* Home Tab */}
        <button
          onClick={() => handleNavigation("home", "/home")}
          className="flex flex-col items-center flex-1"
        >
          <AiFillHome
            className={`text-2xl ${
              activeTab === "home" ? "text-orange-500" : "text-gray-500"
            } font-bold`}
          />
          <span
            className={`text-xs mt-1 ${
              activeTab === "home"
                ? "text-orange-500 font-bold"
                : "text-gray-500"
            }`}
          >
            Home
          </span>
        </button>

        {/* History Tab */}
        <button
          onClick={() => handleNavigation("history", "/history")}
          className="flex flex-col items-center flex-1"
        >
          <AiOutlineHistory
            className={`text-2xl ${
              activeTab === "history" ? "text-gray-700" : "text-gray-500"
            } font-bold`}
          />
          <span
            className={`text-xs mt-1 ${
              activeTab === "history"
                ? "text-gray-700 font-bold"
                : "text-gray-500"
            }`}
          >
            History
          </span>
        </button>

        {/* Wallet Tab (Center Button) */}
        <button
          onClick={() => handleNavigation("wallet", "/wallet")}
          className="relative flex flex-col items-center flex-1 z-10"
          style={{ marginTop: "-28px" }}
        >
          <span
            className={`flex items-center justify-center rounded-full bg-blue-500 border-4 border-blue-500 shadow-md transition-all ${
              activeTab === "wallet" ? "ring-4 ring-blue-300" : ""
            }`}
            style={{ width: 56, height: 56 }}
          >
            <FaWallet className={`text-3xl text-white font-bold`} />
          </span>
        </button>

        {/* Giveaway Tab */}
        <button
          onClick={() => handleNavigation("giveaway", "/giveawaypage")}
          className="flex flex-col items-center flex-1"
        >
          <FaGift
            className={`text-2xl ${
              activeTab === "giveaway" ? "text-gray-700" : "text-gray-500"
            } font-bold`}
          />
          <span
            className={`text-xs mt-1 ${
              activeTab === "giveaway"
                ? "text-gray-700 font-bold"
                : "text-gray-500"
            }`}
          >
            Giveaway
          </span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => handleNavigation("profile", "/profile")}
          className="flex flex-col items-center flex-1"
        >
          <IoPersonSharp
            className={`text-2xl ${
              activeTab === "me" ? "text-gray-700" : "text-gray-500"
            } font-bold`}
          />
          <span
            className={`text-xs mt-1 ${
              activeTab === "me" ? "text-gray-700 font-bold" : "text-gray-500"
            }`}
          >
            Me
          </span>
        </button>
      </div>
    </div>
  );
};