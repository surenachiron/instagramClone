'use client';

import { useEffect, useState } from 'react';

const useSize = () => {
  const [windowSize, setWindowSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowSizeHandler = () => {
        setWindowSize(window.innerWidth);
      };

      windowSizeHandler();

      window.addEventListener('resize', windowSizeHandler);
      return () => {
        window.removeEventListener('resize', windowSizeHandler);
      };
    }
  }, []);

  return windowSize;
};

export default useSize;
