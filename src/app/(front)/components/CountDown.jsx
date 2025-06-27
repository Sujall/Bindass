import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

const CountdownTimer = ({ endDate, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(endDate);
      const diff = end - now;

      if (diff <= 0) {
        setExpired(true);
        if (onExpire) onExpire();
        return {};
      }

      return {
        total: diff,
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    const interval = setInterval(() => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate, onExpire]);

  const getUrgencyColor = () => {
    if (expired) return "text-red-500";
    if (timeLeft.total < 1000 * 60 * 60) return "text-orange-500"; // < 1 hour
    return "text-green-600";
  };

  const formatTime = () => {
    if (expired) return "⏱ Time's up!";
    const { days = 0, hours = 0, minutes = 0, seconds = 0 } = timeLeft;
    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  };

  const progressBarWidth = timeLeft.total
    ? `${Math.max(0, (timeLeft.total / (new Date(endDate) - new Date())) * 100)}%`
    : "0%";

  return (
    <div className="flex flex-col gap-1 p-2 border rounded-xl shadow-md w-fit bg-white">
      <div className="flex items-center gap-2">
        <FaClock className={getUrgencyColor()} />
        <div>
          <div className={`text-md font-medium ${getUrgencyColor()} animate-pulse`}>
            {formatTime()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
