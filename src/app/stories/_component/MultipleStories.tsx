'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { FaRegCirclePause } from 'react-icons/fa6';
import { IoPlayCircleOutline } from 'react-icons/io5';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import type { UserStory } from '../page';
import Button from '@/components/Button';
import StoryProgress from './StoryProgress';
import ChangeSlide from './ChangeSlide';

type Props = {
  parentSwiper: SwiperType | null;
  story: UserStory;
  setIsNestedPlaying: (isPlaying: boolean) => void;
  active: boolean;
};

const MultipleStories = ({ parentSwiper, story, active, setIsNestedPlaying }: Props) => {
  const nestedSwiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState<number | null>(0);
  const [isStopped, setIsStopped] = useState(false);

  const onAutoplayTimeLeft = (swiper: SwiperType, time: number, progress: number) => {
    setActiveIndex(swiper.activeIndex);
    setProgress(progress);
  };

  const pauseAutoPlay = () => {
    nestedSwiperRef.current?.autoplay.stop();
    setIsNestedPlaying(true);
    setIsStopped(true);
  };

  const resumeAutoPlay = () => {
    nestedSwiperRef.current?.autoplay.start();
    setIsStopped(false);
    const swiper = nestedSwiperRef.current;
    if (swiper && swiper.activeIndex === swiper.slides.length - 1) setIsNestedPlaying(false);
  };

  const handleSlideChange = () => {
    const swiper = nestedSwiperRef.current;
    resumeAutoPlay();
    setProgress(0);
    setActiveIndex(swiper?.activeIndex || 0);
    if (swiper && swiper.activeIndex === swiper.slides.length - 1 && !isStopped) {
      setIsNestedPlaying(false);
    } else {
      setIsNestedPlaying(true);
    }
  };

  useEffect(() => {
    const swiper = nestedSwiperRef.current;
    setProgress(null);
    if (active) {
      if (swiper && swiper.activeIndex === swiper.slides.length - 1 && !isStopped) {
        setIsNestedPlaying(false);
      } else {
        swiper?.autoplay.start();
        setIsNestedPlaying(true);
      }
    } else {
      swiper?.autoplay.stop();
      setIsNestedPlaying(false);
    }
  }, [active, setIsNestedPlaying]);

  useEffect(() => {
    const handleAutoplayStart = () => setIsNestedPlaying(true);
    const handleAutoplayStop = () => setIsNestedPlaying(false);

    nestedSwiperRef.current?.on('autoplayStart', handleAutoplayStart);
    nestedSwiperRef.current?.on('autoplayStop', handleAutoplayStop);
    nestedSwiperRef.current?.on('slideChange', handleSlideChange);
    nestedSwiperRef.current?.on('autoplayTimeLeft', onAutoplayTimeLeft);

    return () => {
      nestedSwiperRef.current?.off('autoplayStart', handleAutoplayStart);
      nestedSwiperRef.current?.off('autoplayStop', handleAutoplayStop);
      nestedSwiperRef.current?.off('slideChange', handleSlideChange);
      nestedSwiperRef.current?.off('autoplayTimeLeft', onAutoplayTimeLeft);
    };
  }, [setIsNestedPlaying]);

  return (
    <Swiper
      className="mySwiper h-full postNav"
      navigation={true}
      allowTouchMove={false}
      spaceBetween={50}
      autoplay={{ delay: 5000, stopOnLastSlide: true, disableOnInteraction: false }}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      modules={[Navigation, Autoplay]}
      onSwiper={(nestedSwiper) => {
        nestedSwiperRef.current = nestedSwiper;
      }}
      onActiveIndexChange={(story) => setActiveIndex(story.activeIndex)}
    >
      {story.stories.map((singleStory) => (
        <SwiperSlide key={singleStory.id} className="w-full h-full rounded-lg">
          <div className="flex flex-col relative w-full h-full">
            <StoryProgress count={story.stories.length} activeIndex={activeIndex} progress={progress} />
            <div className="absolute flex items-center justify-between gap-x-2 px-3 pt-5 rounded-full w-full z-50">
              <Link href={`/profile/${singleStory.profiles?.user_name}`} className="flex items-center gap-x-2">
                <Image
                  src={singleStory.profiles?.avatar_url ? singleStory.profiles?.avatar_url : '/anonymous.png'}
                  alt={`story of ${singleStory.profiles?.user_id}`}
                  width={40}
                  height={40}
                  className="rounded-full border-2 w-[35px] h-[35px]"
                />
                <h3 className="text-white">{singleStory.profiles?.user_name}</h3>
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
              src={singleStory.file_url}
              alt={singleStory.id}
              width={350}
              height={500}
              className="rounded-lg w-full desktop:w-[500px] h-full"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MultipleStories;
