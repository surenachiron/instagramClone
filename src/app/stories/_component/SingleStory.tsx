import Link from 'next/link';
import Image from 'next/image';

import { FaRegCirclePause } from 'react-icons/fa6';
import type { Swiper as SwiperType } from 'swiper';

import Button from '@/components/Button';
import StoryProgress from './StoryProgress';
import type { UserStory } from '../page';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { useState } from 'react';
import ChangeSlide from './ChangeSlide';

type Props = {
  story: UserStory;
  active: boolean;
  parentSwiper: SwiperType | null;
  progress: number;
};

const SingleStory = ({ story, active, parentSwiper, progress }: Props) => {
  const [isStopped, setIsStopped] = useState(false);

  const pauseAutoPlay = () => {
    parentSwiper?.autoplay.stop();
    setIsStopped(true);
  };

  const resumeAutoPlay = () => {
    parentSwiper?.autoplay.start();
    setIsStopped(false);
  };

  return (
    <div className="flex flex-col relative w-full h-full">
      <StoryProgress count={1} activeIndex={0} progress={active ? progress : null} />
      <div className="absolute flex items-center justify-between gap-x-2 px-3 pt-5 rounded-full w-full z-50">
        <Link href={`/profile/${story.stories[0].profiles?.user_name}`} className="flex items-center gap-x-2">
          <Image
            src={story.stories[0].profiles?.avatar_url ? story.stories[0].profiles?.avatar_url : '/anonymous.png'}
            alt={`story of ${story.stories[0].profiles?.user_id}`}
            width={40}
            height={40}
            className="rounded-full border-2 w-[35px] h-[35px]"
          />
          <h3 className="text-white">{story.stories[0].profiles?.user_name}</h3>
        </Link>
        {isStopped ? (
          <Button classes="cursor-pointer" onClick={resumeAutoPlay}>
            <IoPlayCircleOutline className="text-2xl text-white" />
          </Button>
        ) : (
          <Button classes="cursor-pointer" onClick={pauseAutoPlay}>
            <FaRegCirclePause className="text-xl text-white" />
          </Button>
        )}
      </div>
      <ChangeSlide parentSwiper={parentSwiper} />
      <Image
        src={story.stories[0].file_url}
        alt={story.stories[0].id}
        width={350}
        height={500}
        className="rounded-lg w-full desktop:w-[500px] h-full"
      />
    </div>
  );
};

export default SingleStory;
