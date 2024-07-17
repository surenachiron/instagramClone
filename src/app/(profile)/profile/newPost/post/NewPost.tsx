'use client';

import React, { ReactElement, useRef, useState } from 'react';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IoMdAddCircleOutline } from 'react-icons/io';

import { createNewPost } from './action';

import { FormNewPostType, NewPostSchema } from './TNewPost';
import Modal from '@/components/Modal';
import UploadSvg from '@/components/Icons/UploadSvg';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
import Input from '@/components/Input';

type Props = { icon?: ReactElement };

const NewPost = ({ icon = <IoMdAddCircleOutline className="text-2xl" /> }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormNewPostType>({ resolver: zodResolver(NewPostSchema) });
  const newPostRef = useRef<HTMLDialogElement>(null);
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [showSelectedImage, setShowSelectedImage] = useState<string | null>(null);
  const [showBackAction, setShowBackAction] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitForm: SubmitHandler<FormNewPostType> = async (data) => {
    const formData = new FormData();
    formData.append('caption', data.caption);
    formData.append(`media`, data.media[0]!);
    setLoading(true);
    const res = await createNewPost(formData);
    if (res) toast.success('Post created');
    else toast.error(`Couldn't create post`);
    setLoading(false);
    newPostRef.current?.close();
    backAction();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileSelected(file);
      imageReader(file);
      setShowBackAction(true);
    }
  };

  function imageReader(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setShowSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function backAction() {
    reset();
    setShowBackAction(false);
    setFileSelected(null);
    setShowSelectedImage(null);
  }

  return (
    <Modal
      onOpen={() => newPostRef.current?.showModal()}
      onClose={() => backAction()}
      icon={icon}
      iconStyle={'w-full bg-blue gap-x-2 text-white font-light rounded-2xl p-2'}
      parentIconStyle="w-full"
      ref={newPostRef}
      title="Create new posts"
      showBackButton={showBackAction}
      onClickBackButton={backAction}
    >
      <form onSubmit={handleSubmit(submitForm)} className="mt-3 min-h-[50vh] flex flex-col items-center justify-center">
        {fileSelected?.name && showSelectedImage ? (
          <div className="flex flex-col items-end w-full h-full">
            <div className="h-[50vh] w-full">
              <Image src={showSelectedImage!} alt="selected image" width={350} height={350} className="w-full h-full" />
            </div>
            <TextArea
              name="caption"
              max="2200"
              rows={2}
              register={register}
              error={errors.caption?.message}
              placeholder="Write a caption"
            />
            <Button type="submit" classes="bg-blue p-2 w-1/2 rounded-lg text-white mt-3" loading={loading}>
              Publish
            </Button>
          </div>
        ) : (
          <>
            <UploadSvg />
            <Input
              type="file"
              name="media"
              register={register}
              accept="image/png, image/jpeg, image/jpg"
              classes="w-3/4 border px-3 py-2 mt-4 bg-blue text-white border-1 border-grayLight rounded-lg cursor-pointer"
              onChange={handleChange}
            />
          </>
        )}
        {errors.media?.message}
      </form>
    </Modal>
  );
};

export default NewPost;
