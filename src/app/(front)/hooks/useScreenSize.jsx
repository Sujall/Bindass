import { useState, useEffect } from 'react';

const useScreenSize = (breakpoint = 576) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > breakpoint);
    };

    handleResize(); // Set initial value after mount

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isLargeScreen;
};

export default useScreenSize;
