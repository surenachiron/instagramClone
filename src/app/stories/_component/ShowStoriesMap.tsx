'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { FaRegCirclePause } from 'react-icons/fa6';

import { useStoriesStore } from '@/store/stories';
import Button from '@/components/Button';
import { UserStory } from '@/app/stories/page';
import StoryDetail from './StoryDetail';
import StoryProgress from './StoryProgress';

const ShowStoriesMap = ({ story }: { story: UserStory[] | null }) => {
  const { initialStory, showStories } = useStoriesStore();

  useEffect(() => {
    document.body.className = showStories ? 'no-scroll' : '';
  }, [showStories]);

  return (
    <>
      {showStories && (
        <>
          <div className="bg-[#1a1a1a] fixed inset-0 opacity-100 z-40" />
          <div className="flex flex-col items-start justify-between gap-y-2 fixed inset-0 !z-50 tablet:m-2">
            <StoryDetail />
            <div className="flex items-center justify-center h-full tablet:h-[95%]">
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                pagination={true}
                slideToClickedSlide={true}
                draggable
                mousewheel
                coverflowEffect={{
                  rotate: 2,
                  stretch: -90,
                  depth: 200,
                  modifier: 1,
                  slideShadows: true,
                }}
                // autoplay={{
                //   delay: 5000,
                //   disableOnInteraction: false,
                //   pauseOnMouseEnter: true,
                //   stopOnLastSlide: true,
                // }}
                // onAutoplayTimeLeft={progressCount.current ? progressCount.current.value : 0}
                modules={[EffectCoverflow, Autoplay]}
                initialSlide={initialStory ? initialStory - 1 : 0}
                className="h-full mySwiper"
              >
                {story &&
                  story.map((story, index) => (
                    <>
                      {story.stories.length > 1 ? (
                        <SwiperSlide className="w-full tablet:w-3/4 desktop:w-2/6 h-fit rounded-lg" key={index}>
                          <Swiper
                            className="mySwiper h-fit postNav"
                            pagination={false}
                            mousewheel={true}
                            cssMode={true}
                            spaceBetween={50}
                            navigation={true}
                            modules={[Navigation, Mousewheel]}
                          >
                            {story.stories.map((story) => (
                              <SwiperSlide key={story.id} className="w-full h-full rounded-lg">
                                <div className="flex flex-col relative w-full h-full">
                                  <StoryProgress />
                                  <div className="absolute flex items-center justify-between gap-x-2 p-3 rounded-full w-full">
                                    <Link
                                      href={`/profile/${story.profiles?.user_name}`}
                                      className="flex items-center gap-x-2"
                                    >
                                      <Image
                                        src={story.profiles?.avatar_url ? story.profiles?.avatar_url : '/anonymous.png'}
                                        alt={`story of ${story.profiles?.user_id}`}
                                        width={40}
                                        height={40}
                                        className="rounded-full border-2 w-[35px] h-[35px]"
                                      />
                                      <h3 className="text-white">{story.profiles?.user_name}</h3>
                                    </Link>
                                    <Button classes="cursor-pointer">
                                      <FaRegCirclePause className="text-xl text-white" />
                                    </Button>
                                  </div>
                                  <Image
                                    src={story.file_url}
                                    alt={story.id}
                                    width={350}
                                    height={500}
                                    className="rounded-lg w-full desktop:w-[500px] h-full"
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </SwiperSlide>
                      ) : (
                        <SwiperSlide
                          key={story.stories[0].id}
                          className="w-full tablet:w-3/4 desktop:w-2/6 h-full rounded-lg"
                        >
                          <div className="flex flex-col relative w-full h-full">
                            <StoryProgress />
                            <div className="absolute flex items-center justify-between gap-x-2 p-3 rounded-full w-full">
                              <Link
                                href={`/profile/${story.stories[0].profiles?.user_name}`}
                                className="flex items-center gap-x-2"
                              >
                                <Image
                                  src={
                                    story.stories[0].profiles?.avatar_url
                                      ? story.stories[0].profiles?.avatar_url
                                      : '/anonymous.png'
                                  }
                                  alt={`story of ${story.stories[0].profiles?.user_id}`}
                                  width={40}
                                  height={40}
                                  className="rounded-full border-2 w-[35px] h-[35px]"
                                />
                                <h3 className="text-white">{story.stories[0].profiles?.user_name}</h3>
                              </Link>
                              <Button classes="cursor-pointer">
                                <FaRegCirclePause className="text-xl text-white" />
                              </Button>
                            </div>
                            <Image
                              src={story.stories[0].file_url}
                              alt={story.stories[0].id}
                              width={350}
                              height={500}
                              className="rounded-lg w-full desktop:w-[500px] h-full"
                            />
                          </div>
                        </SwiperSlide>
                      )}
                    </>
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
