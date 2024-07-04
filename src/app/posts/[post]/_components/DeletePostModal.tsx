'use client';

import { useRef, useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/supabase/utils/client';
import { toast } from 'react-toastify';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

type Props = { post_id: string; user_name: string };

const DeletePostModal = ({ post_id, user_name }: Props) => {
  const deletePostRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function deletePost() {
    const supabase = supabaseClient();
    setLoading(true);
    await supabase.from('posts').delete().eq('id', post_id);
    setLoading(false);
    deletePostRef.current?.close();
    router.push(`/profile/${user_name}`);
    toast.success('Post deleted.');
  }

  return (
    <Modal
      onOpen={() => deletePostRef.current?.showModal()}
      icon={<IoIosMore className="text-xl text-black" />}
      iconStyle="text-black"
      ref={deletePostRef}
    >
      <div className="w-full text-center border-b pb-2">
        <h3 className="text-xl text-black mb-2">Delete Post?</h3>
        <p className="text-sm">Are you sure you want to delete this post?</p>
      </div>
      <Button
        classes="text-red-600 w-full pt-5"
        onClick={deletePost}
        loading={loading}
        Spinner={{
          color: '#3797ef',
        }}
      >
        Delete
      </Button>
    </Modal>
  );
};

export default DeletePostModal;
