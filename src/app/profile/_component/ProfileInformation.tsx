'use client';

import Image from 'next/image';
import Box from '@components/Box';
import Button from '@components/Button';
import GradientContainer from '@components/GradientContainer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css/pagination';
import 'swiper/css';

type Props = {
  profile: { name: string; description: string };
  buttons: { primaryText: string; secondaryText?: string; bgColor?: string; colorText?: string }[];
};

const ProfileInformation = ({ profile, buttons }: Props) => {
  return (
    <Box classes="rounded-md w-full relative py-4 gap-2" backGround="bg-grayBack">
      <Box
        classes="relative p-3 desktop:p-6 justify-center items-start w-full gap-4 gap-x-8"
        flexDirection="flex-col desktop:flex-row"
        align="items-center desktop:items-start"
      >
        <div className="absolute desktop:static top-[-30px]">
          <GradientContainer classes="p-0.5 w-[80px] desktop:w-[150px]" childClasses="p-0.5">
            <Image src={'/anonymous.png'} alt="test image" width={90} height={90} className="rounded-full w-full" />
          </GradientContainer>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-center desktop:text-start mt-10 desktop:mt-0">
            <h3 className="text-xl font-bold text-black">{profile.name}</h3>
            <p className="text-sm">{profile.description}</p>
            <p className="text-sm w-full desktop:w-[326px] h-16 desktop:h-20 mt-2 overflow-hidden text-ellipsis text-start">
              Lorem ipsum dolor sit. Lorem ipsum dolor sit. Lorem ipsum dolor sit. Lorem ipsum dolor sit. Lorem ipsum
              dolor sit.Lorem ipsum dolor sit .Lorem ipsum dolor sit .Lorem ipsum dolor sit .Lorem ipsum dolor sit
              .Lorem ipsum dolor sit
            </p>
          </div>
          <div className="grid grid-cols-3 justify-start gap-2">
            {buttons.map((but) => (
              <Button
                key={but.primaryText}
                classes={`col-span-1 ${but?.bgColor ? but.bgColor : 'bg-grayLight'} text-black px-3 py-1 rounded-lg w-full`}
              >
                {but.secondaryText ? (
                  <div className="flex flex-col items-center justify-center">
                    <h4 className="text-md font-bold">{but.primaryText}</h4>
                    <p className="text-sm text-[#a1a1a1]">{but.secondaryText}</p>
                  </div>
                ) : (
                  <p className={`text-sm ${but?.colorText ? but.colorText : 'text-[#a1a1a1] py-1'}`}>
                    {but.primaryText}
                  </p>
                )}
              </Button>
            ))}
          </div>
        </div>
      </Box>

      <div className="flex flex-col gap-2 my-4 w-full">
        <p className="text-sm font-bold text-grayMiddle">Highlights - 8</p>
        <Swiper
          slidesPerView={'auto'}
          grabCursor={true}
          spaceBetween={10}
          modules={[Pagination]}
          className="z-0 m-0 flex w-full"
        >
          {buttons.map((butTest) => (
            <SwiperSlide key={butTest.primaryText} className="cursor-pointer w-[5.5rem] h-28 m-0">
              <Image src={'/anonymous.png'} alt="test" height={100} width={100} className="rounded-lg h-full" />
            </SwiperSlide>
          ))}
          {buttons.map((butTest) => (
            <SwiperSlide key={butTest.primaryText} className="cursor-pointer w-[5.5rem] h-28 m-0">
              <Image src={'/anonymous.png'} alt="test" height={100} width={100} className="rounded-lg h-full" />
            </SwiperSlide>
          ))}
          {buttons.map((butTest) => (
            <SwiperSlide key={butTest.primaryText} className="cursor-pointer w-[5.5rem] h-28 m-0">
              <Image src={'/anonymous.png'} alt="test" height={100} width={100} className="rounded-lg h-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col gap-2 my-4 w-full">
        <p className="text-sm font-bold text-grayMiddle">Posts - 29</p>
        <div className="grid grid-cols-12 gap-2">
          {buttons.map((butTest) => (
            <div key={butTest.primaryText} className="col-span-4">
              <Image src={'/anonymous.png'} alt="test" className="rounded-lg w-full" width={70} height={70} />
            </div>
          ))}
        </div>
        <div className="flex justify-center my-2">
          <Button classes="text-sm rounded-lg bg-grayLight w-fit px-2 py-1">Hide your posts</Button>
        </div>
      </div>
    </Box>
  );
};

export default ProfileInformation;
