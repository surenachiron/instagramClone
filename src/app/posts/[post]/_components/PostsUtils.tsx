'use client';

import { IoIosMore } from 'react-icons/io';

import Dropdown from '@/components/Dropdown';
import CopyLink from '@/components/CopyLink';
import DeletePost from './tools/DeletePost';

type Props = { post_id: string; avatar: string };

const PostsUtils = ({ post_id, avatar }: Props) => {
  return (
    <Dropdown
      dropText={<IoIosMore className="text-xl text-black" />}
      items={[{ element: <DeletePost postId={post_id} avatar={avatar} /> }, { element: <CopyLink /> }]}
    />
  );
};

export default PostsUtils;
