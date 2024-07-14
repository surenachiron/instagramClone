export type PostType = {
  data:
    | {
        id: string;
        content: string;
        media_url: string;
        profiles: {
          user_name: string | null;
          avatar_url: string | null;
          user_id: string;
          full_name: string | null;
        } | null;
      }[]
    | null;
  ownUserId: string;
};

export type mostPopularUserType = {
  user_id: string | number;
  user_name: string;
  avatar_url: string;
  follower_count: number;
};
