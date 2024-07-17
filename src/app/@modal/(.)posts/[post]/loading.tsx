'use client';

import React from 'react';

import Skeleton from '@/components/Skeleton';
import { ModalRoute } from './ModalRoute';

const SinglePostLoading = () => {
  return (
    <ModalRoute>
      <div className="flex tablet:flex-row flex-col w-full tablet:w-3/4 gap-x-3 gap-y-2 pt-2 tablet:pt-0 h-full tablet:h-auto desktop:h-[90vh] bg-white text-black overflow-auto">
        <Skeleton
          parentClass="h-[70vh] tablet:h-auto w-full tablet:w-1/2 order-2 tablet:order-1"
          classes="h-full w-full"
          radius="none"
        />
        <div className="w-full h-auto tablet:h-full justify-between tablet:w-1/2 order-1 tablet:order-2">
          <div className="w-full flex justify-start items-center gap-x-2 mb-0 tablet:py-2 px-3">
            <Skeleton classes="w-[35px] h-[35px]" radius="full" />
            <Skeleton classes="py-0.5 w-[80px]" radius="full" />
          </div>
          <hr className="hidden tablet:block" />
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
    </ModalRoute>
  );
};

export default SinglePostLoading;
