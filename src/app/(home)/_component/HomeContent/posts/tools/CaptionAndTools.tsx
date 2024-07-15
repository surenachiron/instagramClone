'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CiBookmark } from 'react-icons/ci';
import { FaRegComment } from 'react-icons/fa6';
import { RiSendPlaneLine } from 'react-icons/ri';
import ShowLike from '@/app/posts/[post]/_components/tools/ShowLike';
import Button from '@/components/Button';
import textReducer from '@/hooks/textReducer';

type Props = {
  caption: string;
  postId: string;
  user: {
    username: string;
    avatar_url: string;
    user_id: string;
  };
};

const CaptionAndTools = ({ caption, postId, user }: Props) => {
  const [showContent, setShowContent] = useState(false);
  function showFullCaption() {
    setShowContent(!showContent);
  }

  return (
    <div className="absolute bottom-0 w-full px-4 py-3 text-white flex justify-between items-center bg-[#80808014]">
      <p className="text-white text-sm" onClick={showFullCaption}>
        {showContent ? (
          <div className="max-h-[100px] overflow-auto customScroll fade-in">{caption}</div>
        ) : (
          textReducer({ text: caption, min: 0, max: 100, additionally: '...' })
        )}
      </p>
      <div className="flex justify-center items-center gap-2">
        <ShowLike
          username={user.username as string}
          avatarUrl={user.avatar_url as string}
          postId={postId}
          userId={user.user_id.toString() as string}
          isShowCount={false}
          parentClasses="p-[6px] tablet:p-2 rounded-full bg-[#c3c3c3cf] backdrop-blur-lg"
          unLikedClasses="text-inherit text-md tablet:text-xl"
          likedClasses="text-md tablet:text-xl"
        />
        <div>
          <Link href={`/posts/comments/${postId}`} className="tablet:hidden">
            <Button classes="p-[6px] tablet:p-2 rounded-full bg-[#c3c3c3cf] backdrop-blur-lg">
              <FaRegComment color="inherit" className="text-md tablet:text-xl" />
            </Button>
          </Link>
          <Link href={`/posts/${postId}`} className="hidden tablet:block">
            <Button classes="p-[6px] tablet:p-2 rounded-full bg-[#c3c3c3cf] backdrop-blur-lg">
              <FaRegComment color="inherit" className="text-md tablet:text-xl" />
            </Button>
          </Link>
        </div>
        <Button classes="p-[6px] tablet:p-2 rounded-full bg-[#c3c3c3cf] backdrop-blur-lg">
          <RiSendPlaneLine color="inherit" className="text-md tablet:text-xl" />
        </Button>
        <Button classes="p-[6px] tablet:p-2 rounded-full bg-[#c3c3c3cf] backdrop-blur-lg">
          <CiBookmark color="inherit" className="text-md tablet:text-xl" />
        </Button>
      </div>
    </div>
  );
};

export default CaptionAndTools;
