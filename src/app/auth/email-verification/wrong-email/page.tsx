'use client';

import Image from 'next/image';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import Box from '@/components/Box';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import { changeWrongEmailAction } from '../_component/action';

type WrongEmailType = { email: string };

const ChangeWrongEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WrongEmailType>({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
      })
    ),
  });

  async function formSubmit(data: WrongEmailType) {
    const result = await changeWrongEmailAction(data);
    if (result === false) toast.error('Something went wrong, please try again.');
  }

  return (
    <Box align="items-center" classes="w-full tablet:w-[70%] desktop:w-[42%] p-4 gap-3">
      <Image src={'/Icon.svg'} alt="icon" width={40} height={40} />
      <h3 className="text-2xl font-bold text-black">Change your wrong email</h3>
      <form onSubmit={handleSubmit(formSubmit)} className="w-full">
        <div className="text-start w-full mb-6">
          <label htmlFor="resetEmail" className="text-black font-medium">
            Email
          </label>
          <FormInput
            type="email"
            name="email"
            placeholder="example@gmail.com"
            register={register}
            error={errors.email?.message}
          />
        </div>
        <Button classes="bg-blue text-white w-full py-3 px-2 rounded-xl font-medium" loading={isSubmitting}>
          Verification
        </Button>
      </form>
    </Box>
  );
};

export default ChangeWrongEmail;
