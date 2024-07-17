import Image from 'next/image';
import Link from 'next/link';

import textReducer from '@/hooks/textReducer';

import Box from '@/components/Box';
import GradientContainer from '@/components/GradientContainer';
import UtilProfileBut, { ButtonsProfileProps } from '@/app/(profile)/profile/[username]/_component/info/UtilProfileBut';

type profileHomeInfoProps = {
  profile: { name: string; username: string; bio: string; avatar: string };
  posts?: { id: string; media_url: string }[];
  buttons: ButtonsProfileProps;
};

const ProfileInfo = ({ profile, buttons, posts }: profileHomeInfoProps) => {
  const bio = textReducer({ text: profile.bio, min: 0, max: 60, additionally: '...' });

  return (
    <Box classes="relative px-6 gap-2 pt-8 pb-4 rounded-md w-full">
      <div className="absolute top-[-45px]">
        <GradientContainer classes="p-0.5" childClasses="p-0.5" borderGradient={true}>
          <Image
            src={profile.avatar ? profile.avatar : '/anonymous.png'}
            alt="test image"
            width={70}
            height={70}
            className="rounded-full"
          />
        </GradientContainer>
      </div>
      <div className="text-center my-2">
        <h3 className="text-xl font-bold text-black">{profile.username}</h3>
        <div className="w-full text-start mt-1">
          <p className="text-sm">{bio}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-start gap-2 w-full">
        <UtilProfileBut buttons={buttons} />
      </div>
      {posts && posts.length > 0 && (
        <div className="flex flex-col gap-2 my-4 w-full">
          <p className="text-sm font-bold text-grayMiddle">posts - {posts?.length}</p>
          <div className="grid grid-cols-12 gap-2">
            {posts.map((post) => (
              <Link
                href={`/posts/${post.id}`}
                key={post.id}
                className="col-span-3 mobile:col-span-3 tablet:col-span-2 desktop:col-span-4"
              >
                <Image
                  src={post.media_url}
                  alt={`image for post of ${post.id}`}
                  className="rounded-lg w-[100px] h-[100px] bg-grayMiddle"
                  width={70}
                  height={70}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </Box>
  );
};

export default ProfileInfo;
