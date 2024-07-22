type TStory =
  | {
      id: string;
      file_url?: string;
      profiles: {
        user_name: string | null;
        avatar_url: string | null;
      } | null;
    }[]
  | null;

type PreviewStoriesT = {
  data: TStory;
  userData: {
    id: string;
    email: string | undefined;
    fullName: string;
    username: string;
    avatar: string | undefined;
  } | null;
  userStoryData: TStory;
};
