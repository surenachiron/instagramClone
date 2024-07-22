'use client';

import { useEffect, useRef, useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import { useStoriesStore } from '@/store/stories';
import { UserStory } from '@/app/stories/page';
import StoryDetail from './StoryDetail';
import MultipleStories from './MultipleStories';
import SingleStory from './SingleStory';

const ShowStoriesMap = ({ story }: { story: UserStory[] | null }) => {
  const { initialStory, showStories } = useStoriesStore();
  const parentSwiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNestedPlaying, setIsNestedPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.className = showStories ? 'no-scroll' : '';
  }, [showStories]);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    if (isNestedPlaying) {
      parentSwiperRef.current?.autoplay.stop();
    } else {
      parentSwiperRef.current?.autoplay.start();
    }
  }, [isNestedPlaying]);
  // swiper.setProgress(progress, speed)
  // lock;

  return (
    <>
      {showStories && (
        <>
          <div className="bg-[#1a1a1a] fixed inset-0 opacity-100 z-40" />
          <div className="flex flex-col items-start justify-between gap-y-2 fixed inset-0 !z-50 tablet:m-2">
            <StoryDetail />
            <div className="flex items-center justify-center h-full w-full tablet:h-[95%]">
              <Swiper
                effect={'coverflow'}
                centeredSlides={true}
                slidesPerView={'auto'}
                slideToClickedSlide
                draggable
                coverflowEffect={{
                  rotate: 2,
                  stretch: -90,
                  depth: 200,
                  modifier: 1,
                  slideShadows: true,
                }}
                nested={true}
                autoplay={{ delay: 5000, stopOnLastSlide: true }}
                onAutoplayTimeLeft={(swiper, time, progress) => setProgress(progress)}
                modules={[EffectCoverflow, Autoplay]}
                initialSlide={initialStory ? initialStory - 1 : 0}
                onSwiper={(swiper) => (parentSwiperRef.current = swiper)}
                onSlideChange={handleSlideChange}
                className="h-full mySwiper"
              >
                {story &&
                  story.map((story, index) =>
                    story.stories.length > 1 ? (
                      <SwiperSlide className="w-full tablet:w-3/4 desktop:w-2/6 h-full rounded-lg" key={index}>
                        <MultipleStories
                          parentSwiper={parentSwiperRef.current}
                          story={story}
                          setIsNestedPlaying={setIsNestedPlaying}
                          active={index === activeIndex}
                        />
                      </SwiperSlide>
                    ) : (
                      <SwiperSlide
                        key={story.stories[0].id}
                        className="w-full tablet:w-3/4 desktop:w-2/6 h-full rounded-lg"
                      >
                        <SingleStory
                          key={index}
                          story={story}
                          active={index === activeIndex}
                          parentSwiper={parentSwiperRef.current}
                          progress={progress}
                        />
                      </SwiperSlide>
                    )
                  )}
              </Swiper>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ShowStoriesMap;
