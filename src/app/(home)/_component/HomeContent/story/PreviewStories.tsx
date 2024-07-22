import { cache } from 'react';

import { supabaseServer } from '@/supabase/utils/server';
import { getUser } from '@/supabase/getUser';

import PreviewStoryMap from './PreviewStoryMap';

type Story = {
  id: string;
  user_id: string | null;
  created_at: string | null;
  profiles: {
    user_name: string | null;
    avatar_url: string | null;
  } | null;
};

const getPreviewStories = cache(async (followingIDs: (string | null)[]) => {
  const validateFollowingIds = followingIDs.filter((id) => id !== null);
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('stories')
    .select(`id, user_id,created_at, profiles(user_name, avatar_url)`)
    .in('user_id', validateFollowingIds)
    .order('created_at', { ascending: false });

  if (error) {
    return { data: null, error };
  }

  const mostRecentStories: { [key: string]: Story } = {};
  for (const story of data) {
    if (!mostRecentStories[story.user_id!]) {
      mostRecentStories[story.user_id!] = story;
    }
  }

  const uniqueStories = Object.values(mostRecentStories);

  return { data: uniqueStories, error: null };
});

const getUserStories = cache(async (user_id: string) => {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('stories')
    .select(`id, profiles(user_name, avatar_url)`)
    .eq('user_id', user_id);
  return { data, error };
});

const getFollowings = cache(async (userId: string) => {
  const supabase = supabaseServer();
  const { data } = await supabase.from('follows').select('followed_id').eq('follower_id', userId);
  return data;
});

const PreviewStories = async () => {
  const userData = await getUser();
  if (!userData) return 'Something went wrong, please check your internet connection';
  const userId = userData.id;
  const following = await getFollowings(userId);

  if (!following) return <PreviewStoryMap data={null} userData={null} userStoryData={null} />;
  const followingIds = following.map((follow) => follow.followed_id);
  const { data, error } = await getPreviewStories(followingIds);
  const { data: userStories } = await getUserStories(userData.id);

  return (
    <>
      {data && !error && (
        <>
          <PreviewStoryMap data={data} userData={userData} userStoryData={userStories} />
          <div className="flex justify-center">
            <hr className="w-4/5 h-0.5 my-3 bg-[#e2e2e2]" />
          </div>
        </>
      )}
    </>
  );
};

export default PreviewStories;
