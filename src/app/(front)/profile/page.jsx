"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaCheckCircle,
  FaHistory,
  FaPlayCircle,
  FaSignOutAlt,
  FaTrophy,
  FaUser,
  FaWallet
} from "react-icons/fa";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center">
      {/* Header */}
      <div className="bg-white w-full rounded-b-3xl shadow-sm pb-8">
        <div className="flex flex-col items-center pt-10">
          <div className="w-24 h-24 rounded-full bg-gray-300 shadow-md overflow-hidden">
            <Image
              src="/images/user.png"
              alt="User"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold mt-4 text-black">Sujal</h2>
          <p className="text-gray-500 text-sm mt-1">sujal@sensixtech.com</p>
          <div className="mt-3 bg-blue-100 px-4 py-1 rounded-full text-blue-700 font-medium text-sm flex items-center gap-2">
            <FaWallet size={14} /> ₹0
          </div>

          <div className="flex gap-3 mt-5">
            <Link href="/editProfile">
              <button className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition">
                Edit Profile
              </button>
            </Link>
            {/* <Link href="/wallet">
            <button className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition">
              Add Money
            </button>
            </Link> */}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 px-6">
          <StatItem
            icon={<FaTrophy className="text-yellow-500" />}
            label="Wins"
            value="0"
          />
          <StatItem
            icon={<FaPlayCircle className="text-green-500" />}
            label="Live"
            value="0"
          />
          <StatItem
            icon={<FaCheckCircle className="text-purple-600" />}
            label="Joined"
            value="0"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="w-full max-w-md px-4 py-10 space-y-8">
        {/* Account */}
        <Section title="Account">
          <Item icon={<FaUser className="text-blue-500" />} label="My Profile" />
          <Item icon={<FaWallet className="text-green-500" />} label="Wallet" />
          <Item icon={<FaHistory className="text-purple-500" />} label="Transaction History" />
        </Section>

        {/* App */}
        {/* <Section title="App">
          <Item icon={<FaCog className="text-gray-600" />} label="Settings" />
          <Item icon={<FaSyncAlt className="text-orange-500" />} label="Clear Cache" />
          <Item icon={<FaQuestionCircle className="text-pink-500" />} label="Help & Support" />
        </Section> */}

        {/* Actions */}
        <Section title="Actions">
          <Item icon={<FaSignOutAlt className="text-red-500" />} label="Log Out" textColor="text-red-500" />
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

function Item({ icon, label, textColor = "text-gray-900" }) {
  return (
    <button className="flex items-center justify-between w-full px-4 py-4 hover:bg-gray-50 transition">
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
