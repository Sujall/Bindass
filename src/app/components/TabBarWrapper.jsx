// src/app/components/TabBarWrapper.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { TabBar } from './TabBar';

const TabBarWrapper = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showTabBar, setShowTabBar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowTabBar(currentScrollY < lastScrollY.current || currentScrollY < 10);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`transition-transform duration-300 ${showTabBar ? 'translate-y-0' : 'translate-y-full'} w-full`}>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default TabBarWrapper;
