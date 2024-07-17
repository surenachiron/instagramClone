'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { supabaseClient } from '@/supabase/utils/client';
import FilePath from '@/hooks/FilePath';

const DeletePost = ({ postId, avatar }: { postId: string; avatar?: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function deletePost() {
    const supabase = supabaseClient();
    setLoading(true);
    console.log(avatar, FilePath(avatar!, 'posts/'));
    await supabase.storage.from('posts').remove([FilePath(avatar!, 'posts/')]);
    await supabase.from('posts').delete().eq('id', postId);
    router.refresh();
    setLoading(false);
  }
  return (
    <Button
      onClick={deletePost}
      classes="py-1 px-2 rounded-lg block text-red-600"
      direction="row"
      justify="start"
      loading={loading}
      Spinner={{ color: 'black', w: '20px', h: '20px' }}
    >
      Delete post
    </Button>
  );
};

export default DeletePost;
