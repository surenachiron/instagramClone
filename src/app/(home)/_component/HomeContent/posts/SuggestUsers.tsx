'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { supabaseClient } from '@/supabase/utils/client';
import FollowUser from '@/app/(profile)/profile/[username]/_component/info/FollowUser';
import Skeleton from '@/components/Skeleton';
import textReducer from '@/hooks/textReducer';
import { mostPopularUserType, PostType } from './TShowPosts';

const SuggestUsers = ({ data, ownUserId }: PostType) => {
  const [mostPopularUsers, setMostPopularUsers] = useState<mostPopularUserType[] | null>();

  const supabase = supabaseClient();
  async function getMostPopularUsers() {
    const { data } = await supabase.rpc('get_most_popular_users', { user_id_to_exclude: ownUserId });
    setMostPopularUsers(data);
  }
  if ((data?.length as number) < 1) {
    getMostPopularUsers();
  }

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center bg-white rounded-lg">
        <div className="h-[130px] flex flex-col items-center justify-center">
          <h3 className="text-xl text-bold text-black">{`You don't follow anyone.`}</h3>
          <p className="text-sm">Follow users to see their latest posts and stories.</p>
        </div>
        <div className="flex items-center justify-center overflow-x-auto customScroll py-4 w-full">
          {mostPopularUsers ? (
            mostPopularUsers?.map((popularUser) => (
              <div key={popularUser.user_id} className="min-w-[120px]">
                <div className="flex flex-col items-center justify-between mx-4 gap-y-4">
                  <Link href={`/profile/${popularUser.user_name}`} className="flex flex-col items-center gap-y-4">
                    <Image
                      src={popularUser.avatar_url ? popularUser.avatar_url : '/anonymous.png'}
                      alt={`avatar of ${popularUser.user_name}`}
                      width={100}
                      height={100}
                      className="w-[60px] h-[60px] rounded-full border"
                    />
                    <p className="text-sm text-bold text-black">
                      {textReducer({ text: popularUser.user_name, max: 20, additionally: '...' })}
                    </p>
                  </Link>
                  <FollowUser user_profile={popularUser.user_id as string} user_id={ownUserId} defaultValue={false} />
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-between items-center w-full gap-2 overflow-x-auto customScroll">
              {Array.from({ length: 3 }, (_, storyIndex) => (
                <div className="flex flex-col w-full justify-center items-center gap-y-4" key={storyIndex}>
                  <Skeleton classes="w-[60px] h-[60px] desktop:w-[60px] desktop:h-[60px]" radius="full" />
                  <Skeleton classes="py-0.5 w-[50px] desktop:w-[60px]" radius="full" />
                  <Skeleton classes="py-2 desktop:py-3 px-2 w-[80px] desktop:w-[120px]" radius="md" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SuggestUsers;
