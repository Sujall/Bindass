'use client';
import {
  FiHome,
  FiClock,
  FiGift,
  FiUser,
  FiCreditCard
} from "react-icons/fi";
import { useRouter } from 'next/navigation';

export const TabBar = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  const handleNavigation = (tab, path) => {
    setActiveTab(tab);
    router.push(path);
  };

  return (
    <div className="bg-white border-t border-gray-200 rounded-t-xl">
      <div className="flex justify-between items-center px-2 py-1">
        {/* Home Tab */}
        <button
          onClick={() => handleNavigation('home', '/home')}
          className="flex flex-col items-center flex-1"
        >
          <FiHome className={`text-2xl ${activeTab === 'home' ? 'text-orange-500' : 'text-gray-500'}`} />
          <span className={`text-xs mt-1 ${activeTab === 'home' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>Home</span>
        </button>

        {/* History Tab */}
        <button
          onClick={() => handleNavigation('history', '/history')}
          className="flex flex-col items-center flex-1"
        >
          <FiClock className={`text-2xl ${activeTab === 'history' ? 'text-gray-700' : 'text-gray-500'}`} />
          <span className={`text-xs mt-1 ${activeTab === 'history' ? 'text-gray-700 font-bold' : 'text-gray-500'}`}>History</span>
        </button>

        {/* Wallet Tab (Center Button) */}
        <button
          onClick={() => handleNavigation('wallet', '/wallet')}
          className="relative flex flex-col items-center flex-1 z-10"
          style={{ marginTop: '-28px' }}
        >
          <span
            className={`flex items-center justify-center rounded-full bg-blue-500 border-4 border-blue-500 shadow-md transition-all ${
              activeTab === 'wallet' ? 'ring-4 ring-blue-300' : ''
            }`}
            style={{ width: 56, height: 56 }}
          >
            <FiCreditCard className={`text-3xl text-white`} />
          </span>
        </button>

        {/* Giveaway Tab */}
        <button
          onClick={() => handleNavigation('giveaway', '/giveawaypage')}
          className="flex flex-col items-center flex-1"
        >
          <FiGift className={`text-2xl ${activeTab === 'giveaway' ? 'text-gray-700' : 'text-gray-500'}`} />
          <span className={`text-xs mt-1 ${activeTab === 'giveaway' ? 'text-gray-700 font-bold' : 'text-gray-500'}`}>Giveaway</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => handleNavigation('profile', '/profile')}
          className="flex flex-col items-center flex-1"
        >
          <FiUser className={`text-2xl ${activeTab === 'me' ? 'text-gray-700' : 'text-gray-500'}`} />
          <span className={`text-xs mt-1 ${activeTab === 'me' ? 'text-gray-700 font-bold' : 'text-gray-500'}`}>Me</span>
        </button>
      </div>
    </div>
  );
};