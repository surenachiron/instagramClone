'use client';

import { useRef } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import UploadSvg from '@/components/Icons/UploadSvg';
import Button from '@/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { removeAvatar, setAvatar } from '@/supabase/useAvatar';
import { useUtilAction, useUtilStore } from '@/store/util';
import { ImageAvatarData, RegistrationImageAvatarSchema } from '@/types/storage/avatarImage';

const UploadAvatar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ImageAvatarData>({
    resolver: zodResolver(RegistrationImageAvatarSchema),
  });
  const uploadAvatarRef = useRef<HTMLDialogElement>(null);
  const { setLoading } = useUtilAction();
  const { loading } = useUtilStore();

  const uploadImage: SubmitHandler<ImageAvatarData> = async (formData) => {
    const file = formData.imageAvatar?.[0];
    const avatar_url = localStorage.getItem('avatar')!;

    if (file) {
      const formData = new FormData();
      formData.append('imageAvatar', file);
      formData.append('oldAvatarUrl', avatar_url);
      const result = await setAvatar(formData);
      reset();
      if (result?.response) localStorage.setItem('avatar', result.newFile!);
    }
  };

  const removeAvatarUrl = async () => {
    setLoading('removingAvatar', true);
    const avatar_url = localStorage.getItem('avatar')!;
    const result = await removeAvatar(avatar_url);
    if (result) localStorage.removeItem('avatar');
    setLoading('removingAvatar', false);
  };

  return (
    <Modal
      onOpen={() => uploadAvatarRef.current?.showModal()}
      icon={<CiCirclePlus className="text-white desktop:text-2xl text-lg" />}
      iconStyle="bg-blue desktop:p-2 p-1"
      ref={uploadAvatarRef}
      title="Upload Avatar"
    >
      <form
        className="flex flex-col items-center justify-center w-full py-8 gap-6"
        onSubmit={handleSubmit(uploadImage)}
      >
        <UploadSvg />
        <Input
          type="file"
          name="imageAvatar"
          register={register}
          accept="image/png, image/jpeg, image/jpg, vi"
          classes="w-4/5 border px-3 py-2 border-1 border-grayLight rounded-lg cursor-pointer"
        />
        {errors.imageAvatar && <span className="text-red-600">{errors.imageAvatar.message}</span>}
        <div className="w-4/5">
          <Button type="submit" classes="bg-blue text-white px-3 py-2 rounded-lg w-full mb-1" loading={isSubmitting}>
            Upload avatar
          </Button>
          <Button
            type="button"
            onClick={removeAvatarUrl}
            classes="bg-red-600 text-white px-3 py-2 rounded-lg w-full"
            loading={loading.removingAvatar}
          >
            Remove current avatar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UploadAvatar;
