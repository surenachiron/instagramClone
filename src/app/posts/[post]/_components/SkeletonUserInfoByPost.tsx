'use client';

import Box from '@/components/Box';
import Skeleton from '@/components/Skeleton';

const SkeletonUserInfoByPost = ({ classes }: { classes: string }) => {
  return (
    <Box classes={`absolute top-[34px] p-[6px] w-[350px] shadow-xl ${classes}`} align="">
      <div className="flex items-center justify-start gap-2 mx-3 group relative">
        <Skeleton parentClass="w-[55px] h-[55px]" classes="w-full h-full" radius="full" />
        <div className="flex flex-col gap-y-2 justify-center w-fit">
          <Skeleton classes="py-0.5 w-[60px]" radius="full" />
          <Skeleton classes="py-0.5 w-[90px]" radius="full" />
        </div>
      </div>
      <hr className="my-2" />
      <div className="grid grid-cols-12 gap-1">
        {Array.from({ length: 3 }).map((post, index) => (
          <Skeleton parentClass="col-span-4 h-36" classes="w-full h-full" key={index} />
        ))}
      </div>
    </Box>
  );
};

export default SkeletonUserInfoByPost;
