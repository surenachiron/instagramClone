'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { supabaseClient } from '@/supabase/utils/client';

const DeletePost = ({ postId }: { postId: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function deletePost() {
    const supabase = supabaseClient();
    setLoading(true);
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
    >
      Delete post
    </Button>
  );
};

export default DeletePost;
