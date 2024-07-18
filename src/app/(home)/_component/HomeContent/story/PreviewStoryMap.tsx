'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import GradientContainer from '@/components/GradientContainer';
import { DataStoriesType } from './ShowStoriesMap';
import { useStoriesAction, useStoriesStore } from '@/store/stories';

import 'swiper/css/pagination';
import 'swiper/css';

const PreviewStoryMap = ({ data }: DataStoriesType) => {
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
      <SwiperSlide className="cursor-pointer w-20 h-20">
        <GradientContainer classes="relative w-fit mb-1" borderGradient={true}>
          <Link href={'/stories'} className="flex items-center flex-col">
            <Image src={'/anonymous.png'} alt={`profile of `} width={50} height={50} className="rounded-full" />
          </Link>
        </GradientContainer>
        <Link href={'/stories'} className="flex items-start flex-col mr-2">
          <p className="leading-5 text-xs overflow-hidden text-ellipsis">mohammad</p>
        </Link>
      </SwiperSlide>

      {data?.map((story) => (
        <SwiperSlide key={story.id} onClick={() => startShowingStory(story.id)} className="cursor-pointer w-16 h-20">
          <Link href={'/stories'} className="flex items-center flex-col mr-0">
            <GradientContainer classes="w-fit mb-1" borderGradient={true}>
              <Image
                src={'/anonymous.png'}
                alt={`profile of ${story.title}`}
                width={50}
                height={50}
                className="rounded-full"
              />
            </GradientContainer>
            <p className="leading-5 text-xs w-16 overflow-hidden text-ellipsis">{story.title.trim()}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PreviewStoryMap;
