'use client';

import React, { useRef } from 'react';
import Button from '@/components/Button';
import { CiCirclePlus } from 'react-icons/ci';
import UploadSvg from '@/components/Icons/UploadSvg';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import { RegistrationImageAvatarSchema, ImageAvatarData } from '@/types/storage/avatarImage';
import { zodResolver } from '@hookform/resolvers/zod';
import { setAvatar } from '@/supabase/useAvatar';
import Modal from '@/components/Modals/Modal';

const AddStoryModal = () => {
  const myModal = useRef<HTMLDialogElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ImageAvatarData>({
    resolver: zodResolver(RegistrationImageAvatarSchema),
  });

  const uploadImage: SubmitHandler<ImageAvatarData> = async (formData) => {
    const file = formData.imageAvatar?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('imageAvatar', file);
      await setAvatar(formData);
      reset();
      localStorage.setItem('avatar', localStorage.getItem('avatar')!);
    }
  };

  return (
    <div className="z-50">
      <Modal
        onOpen={() => myModal.current?.showModal()}
        icon={<CiCirclePlus className="text-white text-md" />}
        ref={myModal}
        title="Upload Avatar"
      >
        <form
          className="flex flex-col items-center justify-center w-full py-8 gap-6"
          onSubmit={handleSubmit(uploadImage)}
        >
          <UploadSvg />
          <FormInput
            type="file"
            name="imageAvatar"
            register={register}
            error={errors.imageAvatar?.message}
            accept="image/png, image/jpeg, image/jpg"
          />
          <Button type="submit" classes="bg-blue text-white px-3 py-2 rounded-lg w-2/4" loading={isSubmitting}>
            Upload avatar
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AddStoryModal;
