import { supabaseServer } from '@/supabase/utils/server';
import { getUser } from '@/supabase/getUser';

import ShowStoriesMap from './_component/ShowStoriesMap';

interface Profile {
  user_name: string | null;
  avatar_url: string | null;
  user_id: string;
  full_name: string | null;
}

interface Story {
  id: string;
  file_url: string;
  profiles: Profile | null;
}

export interface UserStory {
  userId: string;
  stories: Story[];
}

const getStories = async (userId: string, followingIDs: (string | null)[]): Promise<UserStory[] | null> => {
  const validateFollowingIds = followingIDs.filter((id) => id !== null);
  const supabase = supabaseServer();
  const { data } = await supabase
    .from('stories')
    .select(`id, file_url, profiles(user_name, avatar_url, user_id, full_name)`)
    .in('user_id', [userId, ...validateFollowingIds])
    .order('created_at', { ascending: false });

  if (!data) {
    return null;
  }

  const groupedStories = data.reduce<Record<string, Story[]>>((acc, story) => {
    const userId = story.profiles?.user_id;
    if (!userId) {
      return acc;
    }
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(story);
    return acc;
  }, {});

  const userStoriesArray: UserStory[] = Object.keys(groupedStories).map((userId) => ({
    userId,
    stories: groupedStories[userId],
  }));

  return userStoriesArray;
};

const getFollowings = async (userId: string) => {
  const supabase = supabaseServer();
  const { data } = await supabase.from('follows').select('followed_id').eq('follower_id', userId);
  return data;
};

const ShowStoriesPage = async () => {
  const userInfo = await getUser();
  if (!userInfo) return 'Something went wrong, please check your internet connection';
  const userId = userInfo.id as string;
  const following = await getFollowings(userId);

  if (!following) return <ShowStoriesMap story={null} />;
  const followingIds = following.map((follow) => follow.followed_id);
  const stories = await getStories(userId, followingIds);

  return <ShowStoriesMap story={stories} />;
};

export default ShowStoriesPage;
