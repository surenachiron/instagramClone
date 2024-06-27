'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import UploadSvg from '@/components/Icons/UploadSvg';
import Button from '@/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { removeAvatar, setAvatar } from '@/supabase/useAvatar';
import { useUtilAction, useUtilStore } from '@/store/util';
import { ImageAvatarData, RegistrationImageAvatarSchema } from '@/types/storage/avatarImage';

type Props = { icon?: React.ReactElement | string; iconStyle?: string; parentIconStyle?: string };

const UploadAvatar = ({
  icon = <MdOutlineCameraAlt className="text-white desktop:text-2xl text-lg" />,
  iconStyle = 'rounded-full bg-blue desktop:p-2 p-1',
  parentIconStyle = 'pt-2 pl-3 absolute bottom-0 right-0',
}: Props) => {
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
  const [uploadStatus, setUploadStatus] = useState('');
  const [removeStatus, setRemoveStatus] = useState({ text: '', status: true });
  const [showSelectedImage, setShowSelectedImage] = useState<string | null>(null);

  const uploadImage: SubmitHandler<ImageAvatarData> = async (formData) => {
    const file = formData.imageAvatar?.[0];
    const avatar_url = localStorage.getItem('avatar')!;
    setUploadStatus('');

    if (file) {
      const formData = new FormData();
      formData.append('imageAvatar', file);
      formData.append('oldAvatarUrl', avatar_url);
      const result = await setAvatar(formData);
      reset();
      if (result?.response) {
        setUploadStatus('avatar changed. please refresh page to load your avatar');
        localStorage.setItem('avatar', result.newFile!);
      }
    }
  };

  const removeAvatarUrl = async () => {
    reset();
    setShowSelectedImage(null);
    setLoading('removingAvatar', true);
    setRemoveStatus({ text: '', status: false });
    const avatar_url = localStorage.getItem('avatar')!;
    if (avatar_url.length > 1) {
      const result = await removeAvatar(avatar_url);
      if (result) {
        setRemoveStatus({ text: 'your avatar removed.', status: true });
        localStorage.removeItem('avatar');
      }
    } else setRemoveStatus({ text: 'you have no avatar.', status: false });
    setLoading('removingAvatar', false);
  };

  function showSelectedImageFun(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setShowSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function closeModal() {
    setUploadStatus('');
    setRemoveStatus({ text: '', status: false });
    setShowSelectedImage(null);
    reset();
  }

  return (
    <Modal
      onOpen={() => uploadAvatarRef.current?.showModal()}
      onClose={() => closeModal()}
      icon={icon}
      iconStyle={iconStyle}
      parentIconStyle={parentIconStyle}
      ref={uploadAvatarRef}
      title="Upload Avatar"
    >
      <form
        className="flex flex-col items-center justify-center w-full py-8 gap-6"
        onSubmit={handleSubmit(uploadImage)}
      >
        {showSelectedImage ? (
          <div className="w-[100px] desktop:w-[150px] h-[100px] desktop:h-[150px]">
            <Image
              src={showSelectedImage}
              alt={`selected avatar`}
              width={150}
              height={150}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        ) : (
          <UploadSvg />
        )}
        <div className="w-4/5">
          <Input
            type="file"
            name="imageAvatar"
            register={register}
            accept="image/png, image/jpeg, image/jpg"
            classes="w-full border px-3 py-2 mb-2 border-1 border-grayLight rounded-lg cursor-pointer"
            onChange={showSelectedImageFun}
          />
          {errors.imageAvatar && <span className="text-red-600 w-full">{errors.imageAvatar.message}</span>}
          {uploadStatus.length > 1 && <span className="text-green-700">{uploadStatus}</span>}
        </div>
        <div className="w-4/5 flex flex-col gap-y-2">
          <Button type="submit" classes="bg-blue text-white px-3 py-2 rounded-lg w-full" loading={isSubmitting}>
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
          {removeStatus.text.length > 1 && (
            <span className={`${removeStatus.status ? 'text-green-700' : 'text-red-600'}`}>{removeStatus.text}</span>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default UploadAvatar;
