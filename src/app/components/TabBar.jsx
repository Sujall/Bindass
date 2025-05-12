import { 
  FiHome, 
  FiClock, 
  FiGift, 
  FiUser, 
  FiCreditCard 
} from "react-icons/fi";
import Link from 'next/link';

export const TabBar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white border-t border-gray-200 w-full z-40">
      <div className="flex justify-between items-center px-2 py-1">
        {/* Home Tab */}
        <Link href="/home">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-center flex-1"
          >
            <FiHome className={`text-2xl ${activeTab === 'home' ? 'text-orange-500' : 'text-gray-500'}`} />
            <span className={`text-xs mt-1 ${activeTab === 'home' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>Home</span>
          </button>
        </Link>

        {/* History Tab */}
        <Link href="/history">
          <button 
            onClick={() => setActiveTab('history')}
            className="flex flex-col items-center flex-1"
          >
            <FiClock className={`text-2xl ${activeTab === 'history' ? 'text-gray-700' : 'text-gray-500'}`} />
            <span className={`text-xs mt-1 ${activeTab === 'history' ? 'text-gray-700 font-bold' : 'text-gray-500'}`}>History</span>
          </button>
        </Link>

        {/* Wallet Tab (center, floating) */}
        <Link href="/wallet">
          <button
            onClick={() => setActiveTab('wallet')}
            className="relative flex flex-col items-center flex-1 z-10"
            style={{ marginTop: '-28px' }}
          >
            <span className={`flex items-center justify-center rounded-full bg-white ${activeTab === 'wallet' ? 'ring-4 ring-blue-500 shadow-lg' : ''}`} style={{ width: 56, height: 56 }}>
              <FiCreditCard className={`text-3xl ${activeTab === 'wallet' ? 'text-blue-600' : 'text-gray-400'}`} />
            </span>
          </button>
        </Link>

        {/* Giveaway Tab */}
        <Link href="/giveaway">
          <button 
            onClick={() => setActiveTab('giveaway')}
            className="flex flex-col items-center flex-1"
          >
            <FiGift className={`text-2xl ${activeTab === 'giveaway' ? 'text-gray-700' : 'text-gray-500'}`} />
            <span className={`text-xs mt-1 ${activeTab === 'giveaway' ? 'text-gray-700 font-bold' : 'text-gray-500'}`}>Giveaway</span>
          </button>
        </Link>

        {/* Me Tab */}
        <Link href="/profile">
          <button 
            onClick={() => setActiveTab('me')}
            className="flex flex-col items-center flex-1"
          >
            <FiUser className={`text-2xl ${activeTab === 'me' ? 'text-gray-700' : 'text-gray-500'}`} />
            <span className={`text-xs mt-1 ${activeTab === 'me' ? 'text-gray-700 font-bold' : 'text-gray-500'}`}>Me</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
