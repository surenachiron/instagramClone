'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FollowUser from '@/app/(profile)/profile/[username]/_component/info/FollowUser';
import Skeleton from '@/components/Skeleton';
import textReducer from '@/hooks/textReducer';
import { mostPopularUserType, PostType } from './TShowPosts';
import { supabaseClient } from '@/supabase/utils/client';

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
        <div className="flex items-center overflow-x-auto customScroll py-4">
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
                  <FollowUser user_profile={popularUser.user_id as string} user_id={ownUserId} />
                </div>
              </div>
            ))
          ) : (
            <>
              {Array.from({ length: 3 }, (_, storyIndex) => (
                <div
                  className="min-w-[120px] flex flex-col w-full justify-center items-center gap-y-4 mx-4"
                  key={storyIndex}
                >
                  <Skeleton classes="w-[60px] h-[60px]" radius="full" />
                  <Skeleton classes="py-0.5 w-[60px]" radius="full" />
                  <Skeleton classes="py-3 px-2 w-[120px]" radius="md" />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SuggestUsers;
