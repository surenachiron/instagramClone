'use client';

import Image from 'next/image';
import { DataStoriesType } from '../story/ShowStoriesMap';
import textReducer from '@/hooks/textReducer';
import Button from '@/components/Button';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { LuMessageCircle } from 'react-icons/lu';
import { CiBookmark, CiHeart } from 'react-icons/ci';
import { TbSend } from 'react-icons/tb';
import MultiplePosts, { TMultiPosts } from './MultiplePosts';

const fakePosts: TMultiPosts = {
  post: [
    { image: '/anonymous.png', link: '1' },
    { image: '/anonymous.png', link: '2' },
    { image: '/anonymous.png', link: '3' },
    { image: '/anonymous.png', link: '4' },
  ],
};

const ShowPosts = ({ data }: DataStoriesType) => {
  return (
    <div className="relative flex flex-col gap-5">
      {data.slice(0, 10).map((post, len) => (
        <div className="relative justify-between rounded-lg w-full h-[90vh]" key={post.id}>
          {len === 0 ? (
            <MultiplePosts post={fakePosts.post} />
          ) : (
            <Image src={post.url} alt={post.title} width={500} height={300} className="w-full h-full rounded-lg" />
          )}
          <div className="absolute top-0 w-full p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image src={'/anonymous.png'} alt="user profile" width={40} height={40} className="rounded-full" />
              <p className="text-white text-sm">
                @{textReducer({ text: post.title, min: 0, max: 18, additionally: '...' })}
              </p>
            </div>
            <Button>
              <MdOutlineMoreHoriz className="text-3xl" />
            </Button>
          </div>
          <div className="absolute bottom-0 w-full p-4 text-white flex justify-between items-center">
            {/* we should return caption of this post here */}
            <p className="text-white text-sm">{post.title}</p>
            <div className="flex justify-center items-center gap-2">
              <Button classes="p-[6px] tablet:p-2 rounded-full bg-[#c3c3c3cf] backdrop-blur-lg">
                <CiHeart color="inherit" className="text-md tablet:text-xl" />
              </Button>
              <Button classes="p-[6px] tablet:p-2 rounded-full bg-[#c3c3c3cf] backdrop-blur-lg">
                <LuMessageCircle color="inherit" className="text-md tablet:text-xl" />
              </Button>
              <Button classes="p-[6px] tablet:p-2 rounded-full bg-[#c3c3c3cf] backdrop-blur-lg">
                <TbSend color="inherit" className="text-md tablet:text-xl" />
              </Button>
              <Button classes="p-[6px] tablet:p-2 rounded-full bg-[#c3c3c3cf] backdrop-blur-lg">
                <CiBookmark color="inherit" className="text-md tablet:text-xl" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowPosts;
