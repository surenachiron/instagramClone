'use client';

import Link from 'next/link';
import { FaRegComment } from 'react-icons/fa6';
import Button from '@/components/Button';
import useDate from '@/hooks/useDate';
import AddComment from './AddComment';
import ShowLike from './ShowLike';

type CommentProps = {
  avatar: string;
  username: string;
  post_id: string;
  user_id: string;
  createdAt: string;
  caption?: { user_name: string; id: string; content: string };
};

const PostTools = ({ avatar, username, post_id, user_id, createdAt, caption }: CommentProps) => {
  const formattedDate = useDate(createdAt);

  return (
    <div className="flex flex-col py-2 gap-y-3">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-4">
          <ShowLike postId={post_id} avatarUrl={avatar} username={username} userId={user_id} />
          <Link href={`/posts/comments/${post_id}`} className="tablet:hidden">
            <Button>
              <FaRegComment className="text-2xl rotate-y-180 text-black" />
            </Button>
          </Link>
        </div>
        <span>{formattedDate}</span>
      </div>
      {caption && (
        <div className="flex gap-x-2 tablet:hidden">
          <Link href={`/profile/${caption.user_name}`}>
            <p className="font-bold text-black text-sm">{caption?.user_name}</p>
          </Link>
          <p className="text-sm">{caption?.content}</p>
        </div>
      )}
      <AddComment avatar={avatar} username={username} post_id={post_id} user_id={user_id} />
    </div>
  );
};

export default PostTools;
