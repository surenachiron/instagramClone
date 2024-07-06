'use client';

import { FaComment, FaHeart } from 'react-icons/fa6';

export type CountPerInfoPost = {
  likesCount: number;
  commentsCount: number;
};

const PreInfoPost = ({ likesCount, commentsCount }: CountPerInfoPost) => {
  return (
    <div className="bg-black opacity-55 hidden absolute top-0 left-0 w-full h-full group-hover:flex justify-center items-center text-white gap-x-4">
      {likesCount >= 0 && (
        <div className="flex gap-x-2">
          <FaHeart className="text-2xl text-white" />
          {likesCount}
        </div>
      )}
      {commentsCount >= 0 && (
        <div className="flex gap-x-2">
          <FaComment className="text-2xl rotate-y-180 text-white" />
          {commentsCount}
        </div>
      )}
    </div>
  );
};

export default PreInfoPost;
