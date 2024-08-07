'use client';

import { useEffect } from 'react';

import { useUtilStore } from '@/store/util';

import InstagramSVG from './Icons/InstagramSVG';

const Spinner = () => {
  const { loading } = useUtilStore();

  useEffect(() => {
    if (loading.main) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [loading]);

  return (
    <>
      {loading.main && (
        <div className="absolute w-full h-full flex items-center justify-center left-0 bottom-0 bg-[#0000005c] z-[999999999]">
          <InstagramSVG />
        </div>
      )}
    </>
  );
};

export default Spinner;
