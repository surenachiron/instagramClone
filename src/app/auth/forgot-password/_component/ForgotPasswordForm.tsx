'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Box from '@/components/Box';
import Button from '@/components/Button';
import { sendResetEmail } from '../action';
import { useForm } from 'react-hook-form';
import { FormForgotPassword, ForgotPasswordSchema } from '@/types/auth/forgotPasswordType';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import FormInput from '@/components/FormInput';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormForgotPassword>({ resolver: zodResolver(ForgotPasswordSchema) });

  async function formSubmit(data: FormForgotPassword) {
    const result = await sendResetEmail(data);
    if (result === false) toast.error('Something went wrong. Please try again.');
  }

  return (
    <Box align="items-center" classes="w-full tablet:w-[70%] desktop:w-[42%] p-4 gap-3">
      <Image src={'/Icon.svg'} alt="icon" width={40} height={40} />
      <h3 className="text-2xl font-bold text-black">Reset Password</h3>
      <p>Enter your email to reset your password</p>
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
          Email me a reset link
        </Button>
      </form>
      <p className="flex items-center gap-x-2 mt-3">
        Remember your password?
        <Button classes="text-blue" onClick={() => router.back()}>
          Go Back
        </Button>
      </p>
    </Box>
  );
};

export default ForgotPasswordForm;
