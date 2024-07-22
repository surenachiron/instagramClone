'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';

import GradientContainer from '@/components/GradientContainer';
import { useStoriesAction, useStoriesStore } from '@/store/stories';
import AddStoryModal from './AddStoryModal';

const PreviewStoryMap = ({ data, userData, userStoryData }: PreviewStoriesT) => {
  const { changeShowStories, setInitialStory } = useStoriesAction();
  const { showStories } = useStoriesStore();

  useEffect(() => {
    document.body.className = !showStories ? '' : '';
  }, []);

  function startShowingStory(id: number) {
    changeShowStories();
    setInitialStory(id);
  }

  return (
    <Swiper
      slidesPerView={'auto'}
      grabCursor={true}
      spaceBetween={10}
      modules={[Pagination]}
      className="!px-3 mr-2 z-0 flex gap-2"
    >
      <SwiperSlide className="cursor-pointer w-20 h-20 relative">
        <Link href={`/stories`} className="flex items-center justify-center flex-col mr-0">
          <GradientContainer classes={`w-fit mb-1 ${!userStoryData?.length && 'bg-none'}`} borderGradient={true}>
            <Image
              src={userData?.avatar ? userData?.avatar : '/anonymous.png'}
              alt={`profile of ${userData?.username}`}
              width={50}
              height={50}
              className="rounded-full w-[50px] h-[50px]"
            />
          </GradientContainer>
          <p className="leading-5 text-xs text-center w-16 overflow-hidden text-ellipsis swiper-no-swiping">
            {userData?.username}
          </p>
        </Link>
        <AddStoryModal />
      </SwiperSlide>
      {data?.map((story) => (
        <SwiperSlide key={story.id} onClick={() => startShowingStory(+story.id)} className="cursor-pointer w-16 h-20">
          <Link href={`/stories`} className="flex items-center justify-center flex-col mr-0">
            <GradientContainer classes="w-fit mb-1" borderGradient={true}>
              <Image
                src={story.profiles?.avatar_url ? story.profiles?.avatar_url : '/anonymous.png'}
                alt={`profile of ${story.profiles?.user_name}`}
                width={50}
                height={50}
                className="rounded-full w-[50px] h-[50px]"
              />
            </GradientContainer>
            <p className="leading-5 text-xs text-center w-16 overflow-hidden text-ellipsis swiper-no-swiping">
              {story.profiles?.user_name}
            </p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PreviewStoryMap;
