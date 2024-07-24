'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CiCirclePlus } from 'react-icons/ci';
import { toast } from 'react-toastify';

import setStory from './action';
import { useUtilAction } from '@/store/util';

import { RegStoryMediaDataSchema, StoryMediaData } from '@/types/storage/storyMedia';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import FileInput from '@/components/FileInput';
import Spinner from '@/components/Spinner';

const AddStoryModal = () => {
  const [showSelectedImage, setShowSelectedImage] = useState<string | null>(null);
  const [showBackAction, setShowBackAction] = useState(false);
  const myModal = useRef<HTMLDialogElement>(null);
  const { setLoading } = useUtilAction();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<StoryMediaData>({
    resolver: zodResolver(RegStoryMediaDataSchema),
    mode: 'onChange',
  });

  const uploadImage: SubmitHandler<StoryMediaData> = async (formData) => {
    setLoading('main', isSubmitting);
    const file = formData.storyMedia?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('storyImage', file);
      const res = await setStory(formData);
      if (res) toast.success('Story uploaded.');
      else toast.error('Something went wrong, please try again.');
      myModal.current?.close();
      backAction();
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setValue('storyMedia', e.target.files!);
      myModal.current?.showModal();
      imageReader(file);
      setShowBackAction(true);
    }
  }

  function imageReader(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setShowSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function backAction() {
    setShowSelectedImage(null);
    reset();
  }

  function closeModal() {
    myModal.current?.close();
    backAction();
  }

  return (
    <>
      <FileInput
        text={
          <Button className="flex items-center">
            <div className="rounded-full bg-blue p-1">
              <CiCirclePlus className="text-white desktop:text-xl text-lg" />
            </div>
          </Button>
        }
        classes="border px-1 py-1 bg-blue text-white border-1 border-grayLight rounded-full absolute bottom-[15px] right-0"
        onChangeEvent={handleChange}
        error={errors.storyMedia?.message}
        accept="image/png, image/jpeg, image/jpg"
      />
      <Modal
        onOpen={() => myModal.current?.show()}
        ref={myModal}
        showClose={false}
        showBackButton={showBackAction}
        onClickBackButton={() => closeModal()}
        parentIconStyle="hidden"
        dialogContentClasses="rounded-none tablet:rounded-lg h-full max-h-full tablet:max-h-[90%] p-0 tablet:border w-full max-w-none tablet:w-auto tablet:max-w-[32rem]"
        modalClass="w-[92vh] w-full justify-items-start tablet:justify-items-center"
        divideClose
      >
        <form
          className="flex flex-col items-center justify-center w-full gap-6 h-full"
          onSubmit={handleSubmit(uploadImage)}
        >
          <div className="flex flex-col items-end w-full h-full">
            <Image
              src={showSelectedImage ? showSelectedImage : '/anonymous.png'}
              alt={`selected avatar`}
              width={150}
              height={150}
              className="w-full h-full"
            />
            <Button
              type="submit"
              classes="absolute bottom-0 left-[25%] bg-none text-white p-3 mb-2 rounded-lg w-2/4 shadow-2xl mix-blend-difference"
              disabled={isSubmitting}
            >
              Create Story
            </Button>
            {isSubmitting && <Spinner />}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddStoryModal;
