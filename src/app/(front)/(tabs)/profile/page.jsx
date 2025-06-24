"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCheckCircle,
  FaHistory,
  FaPlayCircle,
  FaSignOutAlt,
  FaTrophy,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import { getUserProfile } from "@/api/apiClient"; // Adjust if your path differs
import { useRouter } from "next/navigation";
import { getInitials } from "@/lib/getInitails";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (err) {
        console.error("Failed to fetch profile:", err.message);
        router.push("/login"); // redirect to login if unauthorized
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center">
      {/* Header */}
      <div className="bg-white w-full rounded-b-3xl shadow-sm pb-8">
        <div className="flex flex-col items-center pt-10">
          <div className="w-24 h-24 rounded-full bg-blue-600 shadow-md flex items-center justify-center text-white text-3xl font-bold">
            {getInitials(user.fullName)}
          </div>

          <h2 className="text-2xl font-bold mt-4 text-black">
            {user.fullName}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          <div className="mt-3 bg-blue-100 px-4 py-1 rounded-full text-blue-700 font-medium text-sm flex items-center gap-2">
            <FaWallet size={14} /> ₹{user.balance || 0}
          </div>

          <div className="flex gap-3 mt-5">
            <Link href="/editProfile">
              <button className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        {/* <div className="mt-8 grid grid-cols-3 gap-4 px-6">
          <StatItem
            icon={<FaTrophy className="text-yellow-500" />}
            label="Wins"
            value={user.stats?.wins || 0}
          />
          <StatItem
            icon={<FaPlayCircle className="text-green-500" />}
            label="Live"
            value={user.stats?.live || 0}
          />
          <StatItem
            icon={<FaCheckCircle className="text-purple-600" />}
            label="Joined"
            value={user.stats?.joined || 0}
          />
        </div> */}
      </div>

      {/* Sections */}
      <div className="w-full max-w-md px-4 py-10 space-y-8">
        <Section title="Account">
          <Item
            href={"/editProfile"}
            icon={<FaUser className="text-blue-500" />}
            label="My Profile"
          />
          <Item
            href={"/wallet"}
            icon={<FaWallet className="text-green-500" />}
            label="Wallet"
          />
          <Item
            href={"/history"}
            icon={<FaHistory className="text-purple-500" />}
            label="History"
          />
        </Section>

        <Section title="Actions">
          <SubItem
            icon={<FaSignOutAlt className="text-red-500" />}
            label="Log Out"
            textColor="text-red-500"
            onClick={handleLogout}
          />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-sm text-gray-600 font-semibold mb-3 uppercase tracking-wide">
        {title}
      </h3>
      <div className="bg-white rounded-xl shadow divide-y">{children}</div>
    </div>
  );
}

function Item({ icon, label, textColor = "text-gray-900", href }) {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className="flex items-center justify-between w-full px-4 py-4 hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-3">
            {icon}
            <span className={`text-[15px] font-medium ${textColor}`}>
              {label}
            </span>
          </div>
          <span className="text-gray-400">{">"}</span>
        </Link>
      ) : null}
    </>
  );
}

function SubItem({ icon, label, textColor = "text-gray-900", onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-4 py-4 hover:bg-gray-50 transition"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className={`text-[15px] font-medium ${textColor}`}>{label}</span>
      </div>
      <span className="text-gray-400">{">"}</span>
    </button>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 shadow-sm text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-lg font-semibold text-black">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  );
}
