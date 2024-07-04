'use client';

import Skeleton from '@/components/Skeleton';
import React from 'react';

const SinglePostLoading = () => {
  return (
    <div className="flex desktop:flex-row flex-col w-full gap-x-3 gap-y-2 pt-2 desktop:pt-0 h-full tablet:h-[90vh]">
      <Skeleton
        parentClass="h-[320px] tablet:h-full w-full desktop:w-1/2 order-2 desktop:order-1"
        classes="h-full w-full"
        radius="none"
      />
      <div className="w-full h-full justify-between desktop:w-1/2 order-1 desktop:order-2">
        <div className="w-full flex justify-start items-center gap-x-2 mb-0 desktop:py-2 px-3">
          <Skeleton classes="w-[35px] h-[35px]" radius="full" />
          <Skeleton classes="py-0.5 w-[80px]" radius="full" />
        </div>
        <hr className="hidden desktop:block" />
        <div className="hidden tablet:flex flex-col gap-y-3 mt-2">
          {Array.from({ length: 9 }, (_, colIndex) => (
            <div className="flex items-center gap-x-2" key={colIndex}>
              <Skeleton classes="w-[25px] h-[25px]" radius="full" />
              <div className="flex flex-col gap-y-2 w-full">
                <Skeleton classes="py-0.5 w-[60px]" radius="full" />
                <Skeleton classes="py-0.5 w-[120px]" radius="full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePostLoading;
