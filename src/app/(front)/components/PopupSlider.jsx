"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRight, FaTimes } from "react-icons/fa";

const popups = [
  {
    title: "Claim Your ₹5,000 Cash!",
    image: "/images/Giveaway.jpg",
    description:
      "🎉 Last Call! Enter the ₹5,000 Cash Giveaway Before It's Too Late!",
    link: "/login",
  },
  {
    title: "Claim Your ₹10,000!",
    image: "/images/iphone-15-pro-thumbnail.png",
    description: "🏆 Enter the ₹10,000 Cash Giveaway for a Chance to Win Big!",
    link: "/login",
  },
];

export default function PopupSlider({ onClose }) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasViewedAll, setHasViewedAll] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextPopup = () => {
    if (index < popups.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setHasViewedAll(true);
    }
  };

  const prevPopup = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleClose = () => {
    if (hasViewedAll) {
      setIsVisible(false);
      setTimeout(onClose, 300);
    } else {
      nextPopup(); // Force navigation to next slide
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
          onClick={handleBackgroundClick}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-[90%] max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Only shown after viewing all slides */}
            {/* {hasViewedAll && ( */}
            <button
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={handleClose}
              aria-label="Close popup"
            >
              <FaTimes className="text-gray-600" size={18} />
            </button>
            {/* )} */}

            {/* Popup Content */}
            <div className="p-5 pt-8 text-gray-800">
              {/* Dots Indicator */}
              <div className="flex justify-center mb-4">
                <div className="flex gap-1.5">
                  {popups.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-1.5 w-6 rounded-full transition-all ${
                        i === index ? "bg-blue-600" : "bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center mb-3">
                {popups[index].title}
              </h2>

              {/* Image */}
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden mb-4 border border-gray-200 shadow-lg"
              >
                <Image
                  src={popups[index].image}
                  alt="Giveaway"
                  width={400}
                  height={240}
                  className="w-full h-auto object-cover"
                  priority
                />
              </motion.div>

              {/* Description */}
              <p className="text-center mb-5 text-gray-600 font-medium">
                {popups[index].description}
              </p>

              {/* Learn More Link */}
              <div className="flex justify-center mb-4">
                <a
                  href={popups[index].link}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Learn more <FaArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
