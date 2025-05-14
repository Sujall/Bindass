// src/app/components/TabBarWrapper.jsx
'use client';

import { useState } from 'react';
import { TabBar } from './TabBar';

const TabBarWrapper = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="sticky bottom-0 z-50 w-full bg-white">
      <div className="max-w-[480px] mx-auto">
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default TabBarWrapper;
