'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import FilePath from '@/hooks/FilePath';

import Box from '@/components/Box';
import GradientContainer from '@/components/GradientContainer';
import UtilProfileBut, { ButtonsProfileProps } from './UtilProfileBut';
import UploadAvatar from './UploadAvatar';
import FollowUser from './FollowUser';

export type ProfileInfoType = {
  profile: { name: string; username: string; bio: string; avatar: string; id: string; nowUserId: string };
  buttons: ButtonsProfileProps;
  privateProfile?: boolean;
};

const ProfileInfo = ({ profile, buttons, privateProfile = false }: ProfileInfoType) => {
  const fileName = FilePath(profile.avatar, 'avatars/');
  useEffect(() => {
    if (!privateProfile) localStorage.setItem('avatar', fileName);
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
        <div className="flex flex-col gap-4 w-full tablet:w-[60%] wide:w-1/2">
          <div className="text-center flex items-center desktop:text-start mt-10 desktop:mt-0">
            <h3 className="text-2xl font-bold text-black">{profile.username}</h3>
            <div className="hidden tablet:flex ml-2">
              {privateProfile && <FollowUser user_profile={profile.id} user_id={profile.nowUserId} />}
            </div>
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
            <div className="grid-cols-3 tablet:hidden">
              {privateProfile && <FollowUser user_profile={profile.id} user_id={profile.nowUserId} />}
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
