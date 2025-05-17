'use client'
import { FaBullhorn, FaInfoCircle, FaGift, FaTelegram } from 'react-icons/fa';
import { RiNotificationFill } from 'react-icons/ri';
import Link from 'next/link';


const notifications = [
  {
    id: 1,
    icon: <FaGift className="text-yellow-500 w-5 h-5" />,
    title: 'Claim Your ₹10,000!',
    description: 'Enter the ₹10,000 Cash Giveaway for a Chance to Win Big!',
    type: 'Giveaway',
    time: '2 hours ago',
    isNew: true
  },
  {
    id: 2,
    icon: <FaTelegram className="text-blue-500 w-5 h-5" />,
    title: 'Join Telegram',
    description: 'Join our Telegram Community for exclusive giveaways and updates!',
    type: 'Community',
    time: '5 hours ago',
    isNew: false
  },
  {
    id: 3,
    icon: <RiNotificationFill className="text-purple-500 w-5 h-5" />,
    title: 'Welcome',
    description: 'Get ready to join exciting giveaways and don\'t miss your chance to be a winner!',
    type: 'Info',
    time: '1 day ago',
    isNew: false
  },
  {
    id: 4,
    icon: <FaGift className="text-green-500 w-5 h-5" />,
    title: 'Black, Bold & Yours to Win!',
    description: 'Win the brand-new Apple iPhone 15 (Black, 128GB)',
    type: 'Giveaway',
    time: '2 days ago',
    isNew: false
  },
];

export default function NotificationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <FaBullhorn className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Latest Updates</h1>
              <p className="text-sm opacity-90">Stay updated with our latest announcements</p>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-100">
          {notifications.map((note) => (
            <div 
              key={note.id} 
              className={`flex items-start p-5 hover:bg-gray-50 transition-colors ${note.isNew ? 'bg-blue-50' : ''}`}
            >
              <div className={`p-3 rounded-lg ${note.isNew ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {note.icon}
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                  {note.isNew && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                      New
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-1">{note.description}</p>
                
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {note.type}
                    </span>
                    <span className="text-xs text-gray-400">{note.time}</span>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
         <Link href="/notifications">
  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
    View All Notifications
  </button>
</Link>
        </div>
      </div>
    </div>
  );
}