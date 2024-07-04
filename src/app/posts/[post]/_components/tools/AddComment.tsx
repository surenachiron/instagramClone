'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { postComment } from './commentAction';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';

type Form = { commentInput: string };
type TAddComment = {
  avatar: string;
  username: string;
  post_id: string;
  user_id: string;
};

const AddComment = ({ avatar, username, post_id, user_id }: TAddComment) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
    reset,
  } = useForm<Form>({ defaultValues: { commentInput: '' } });

  async function sendComment(data: Form) {
    const fullData = {
      comment: data.commentInput,
      avatar,
      username,
      post_id,
      user_id,
    };
    const res = await postComment(fullData);
    if (res === true) toast.success('Comment added.');
    else toast.error(`Couldn't add comment.`);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(sendComment)} className="flex gap-x-2 mt-6 tablet:mt-0 border-t pt-2">
      <Image
        src={avatar}
        alt={`avatar of ${username}`}
        width={150}
        height={150}
        className="w-[35px] h-[35px] rounded-full"
      />
      <TextArea
        name="commentInput"
        placeholder="Add a comment..."
        register={register}
        className="bg-transparent outline-none w-full resize-none"
      />
      {isDirty && (
        <Button loading={isSubmitting} classes="text-blue" Spinner={{ color: '#3797ef' }}>
          Post
        </Button>
      )}
    </form>
  );
};

export default AddComment;
