'use client';

import { useEffect, useState } from 'react';
import PopupSlider from '../components/PopupSlider';
import Banner from '../components/Banner';
import Grid from '../components/Grid';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(true); // Show popup after a short delay
    }, 1000); // delay 1 second after load

    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <main className="min-h-screen pb-20 relative">
      {/* Popup */}
      {showPopup && <PopupSlider onClose={handleClose} />}

      {/* Main Content */}
      <Banner />
      <Grid />
    </main>
  );
}
