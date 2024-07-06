export type ShowSingePosts = {
  content: string;
  created_at: string | null;
  id: string;
  media_url: string;
  updated_at: string | null;
  user_id: string | null;
  profiles: {
    user_name: string | null;
    full_name: string | null;
    avatar_url: string | null;
    user_id: string;
  } | null;
  comments: {
    avatar_url: string | null;
    comment_text: string;
    created_at: string | null;
    id: string;
    post_id: string | null;
    user_id: string | null;
    user_name: string;
  }[];
  likes: {
    count: number;
  }[];
}[];

export type UserData = any;

export type ContentProps = {
  id: string;
  index: number;
  media_url: string;
  likesCount: number;
  commentsCount: number;
};
