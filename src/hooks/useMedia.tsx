'use client';

import { useState, useEffect } from 'react';

const useMedia = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>();
  useEffect(() => {
    setMatches(() => window.matchMedia(query).matches);

    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches!;
};

export default useMedia;
