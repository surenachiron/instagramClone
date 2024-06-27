'use client';

import Image from 'next/image';
import Box from '@/components/Box';
import Button from '@/components/Button';
import GradientContainer from '@/components/GradientContainer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import UtilProfileBut, { ButtonsProfileProps } from './UtilProfileBut';
import UploadAvatar from './UploadAvatar';

import 'swiper/css/pagination';
import 'swiper/css';
import { useEffect } from 'react';
import useFilePath from '@/hooks/useFilePath';
import Link from 'next/link';

type Props = {
  profile: { name: string; username: string; bio: string; avatar: string };
  buttons: ButtonsProfileProps;
  privateProfile?: boolean;
};

const ProfileInfo = ({ profile, buttons, privateProfile = false }: Props) => {
  const fileName = useFilePath(profile.avatar, 'avatars/');
  useEffect(() => {
    localStorage.setItem('avatar', fileName);
  }, []);

  return (
    <Box classes="rounded-md w-full relative py-4 gap-2" backGround="bg-grayBack">
      <Box
        classes="relative p-3 desktop:p-6 justify-start items-center w-full gap-4 gap-x-8"
        flexDirection="flex-col desktop:flex-row"
        align="items-center"
      >
        <div className="absolute desktop:static top-[-30px]">
          <GradientContainer
            classes="p-0.5 w-[80px] desktop:w-[150px] h-[80px] desktop:h-[150px]"
            childClasses="p-0.5 w-full h-full relative"
            borderGradient={true}
          >
            <div className="absolute w-full h-full p-[2px] left-0 bottom-0">
              <Image
                src={profile.avatar ? profile.avatar : '/anonymous.png'}
                alt={`avatar of ${profile.name}`}
                width={150}
                height={150}
                className="rounded-full w-full h-full object-cover"
              />
              {!privateProfile && <UploadAvatar />}
            </div>
          </GradientContainer>
        </div>
        <div className="flex flex-col gap-4 tablet:w-[60%] wide:w-1/2">
          <div className="text-center desktop:text-start mt-10 desktop:mt-0">
            <h3 className="text-2xl font-bold text-black">{profile.username}</h3>
          </div>
          <div>
            <p className="text-sm text-black">{profile.name}</p>
            <p className="text-sm">{profile.bio}</p>
          </div>
          <div className="grid grid-cols-3 justify-start gap-2">
            <UtilProfileBut buttons={buttons} />
            {!privateProfile && (
              <Link
                href={'/profile/edit'}
                className="text-sm text-center col-span-1 bg-[#f1f1f1] text-black px-7 py-2 rounded-lg w-full"
              >
                Edit Profile
              </Link>
            )}
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

export default ProfileInfo;
