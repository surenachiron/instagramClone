'use client';

import { IoIosMore } from 'react-icons/io';
import CopyLink from '@/components/CopyLink';
import Dropdown from '@/components/Dropdown';
import FollowUser from '@/app/(profile)/profile/[username]/_component/info/FollowUser';
import DeletePost from '@/app/posts/[post]/_components/tools/DeletePost';

type Props = {
  postId: string;
  privateUser: boolean;
  userID: string;
  profileID: string;
};

const PostDropdown = ({ postId, userID, profileID, privateUser = false }: Props) => {
  return (
    <>
      {privateUser === false ? (
        <Dropdown
          dropText={<IoIosMore className="text-2xl text-white mix-blend-difference" />}
          items={[
            { element: <DeletePost postId={postId} /> },
            { element: <CopyLink customPath={`/posts/${postId}`} /> },
          ]}
        />
      ) : (
        <Dropdown
          dropText={<IoIosMore className="text-2xl text-white mix-blend-difference" />}
          items={[
            { element: <CopyLink customPath={`/posts/${postId}`} /> },
            {
              element: <FollowUser user_id={userID} user_profile={profileID} />,
            },
          ]}
        />
      )}
    </>
  );
};

export default PostDropdown;
