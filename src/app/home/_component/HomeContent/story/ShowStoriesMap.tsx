'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GrClose } from 'react-icons/gr';
import Button from '@/components/Button';
import { useStoriesStore } from '@/store/stories';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { FaRegCirclePause } from 'react-icons/fa6';
import StoryDetail from './StoryDetail';
import StoryProgress from './StoryProgress';
import { useEffect } from 'react';

// type Props = { data: { username: string; stories: { media: string }[] }[] };
export type DataStoriesType = {
  data: {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }[];
};

const ShowStoriesMap = ({ data }: DataStoriesType) => {
  const { initialStory, showStories } = useStoriesStore();

  useEffect(() => {
    document.body.className = showStories && 'no-scroll';
  }, [showStories]);

  return (
    <>
      {showStories && (
        <>
          <div className="bg-[#1a1a1a] fixed inset-0 opacity-100 z-40" />
          <div className="flex flex-col items-start justify-between gap-y-2 fixed inset-0 !z-50 m-2 mobile:m-8">
            <StoryDetail />
            <div className="flex items-center justify-center h-[95%]">
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                draggable
                mousewheel
                coverflowEffect={{
                  rotate: 2,
                  stretch: -90,
                  depth: 200,
                  modifier: 1,
                  slideShadows: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  stopOnLastSlide: true,
                }}
                modules={[EffectCoverflow, Autoplay]}
                // onAutoplayTimeLeft={progressCount.current ? progressCount.current.value : 0}
                initialSlide={initialStory - 1}
                className="h-full"
              >
                {data.slice(0, 10).map((story) => (
                  <SwiperSlide key={story.id} className="w-full tablet:w-3/4 desktop:w-2/6 h-full">
                    <div className="flex flex-col rounded-lg relative w-full h-full">
                      <StoryProgress />
                      <div className="absolute flex items-center justify-between gap-x-2 p-3 rounded-full w-full">
                        <div className="flex items-center gap-x-2">
                          <Image
                            src={'/anonymous.png'}
                            alt={`story of ${story.title}`}
                            width={40}
                            height={40}
                            className="rounded-full border-2"
                          />
                          <h3 className="text-white">{story.title}</h3>
                        </div>
                        <Button classes="cursor-pointer">
                          <FaRegCirclePause className="text-xl text-white" />
                        </Button>
                      </div>
                      <Image
                        src={story.url}
                        alt={story.title}
                        width={350}
                        height={500}
                        className="rounded-lg w-full h-full"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ShowStoriesMap;
