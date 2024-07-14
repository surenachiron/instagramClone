'use client';

import { IoIosMore } from 'react-icons/io';

import DropDown from '@/components/DropDown';
import CopyLink from '@/components/CopyLink';
import DeletePost from './tools/DeletePost';

type Props = { post_id: string };

const PostsUtils = ({ post_id }: Props) => {
  return (
    <DropDown
      dropText={<IoIosMore className="text-xl text-black" />}
      items={[{ element: <DeletePost postId={post_id} /> }, { element: <CopyLink /> }]}
    />
  );
};

export default PostsUtils;
