'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { signUp } from '../action';

import Button from '@/components/Button';
import GradientContainer from '@/components/GradientContainer';
import FormInput from '@/components/FormInput';
import { FormSingUpData, SignUpDataSchema } from '@/types/auth/signUpFormType';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSingUpData>({ resolver: zodResolver(SignUpDataSchema), mode: 'onChange' });
  const [checkEmailUsername, setCheckEmailUsername] = useState({ emailMessage: '', usernameMessage: '' });

  async function formSubmit(data: FormSingUpData) {
    setCheckEmailUsername({ emailMessage: '', usernameMessage: '' });
    const result = await signUp(data);
    if (result?.path === 'user_name')
      setCheckEmailUsername({
        emailMessage: checkEmailUsername.emailMessage,
        usernameMessage: 'username already exists please enter a different username.',
      });
    if (result?.path === 'email')
      setCheckEmailUsername({ emailMessage: result.message, usernameMessage: checkEmailUsername.usernameMessage });
    if (!result?.path && result?.status === false) toast.error('Something went wrong. Please try again.');
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 h-full w-[90%] tablet:w-full desktop:w-3/4">
      <Image src={'/typography.svg'} alt="instagram typography logo" width={185} height={100} />
      <form className="flex flex-col justify-center items-center gap-4 w-full" onSubmit={handleSubmit(formSubmit)}>
        <div className="flex flex-col items-center gap-3 w-full">
          <FormInput
            type="text"
            name="firstName"
            placeholder="Enter your name"
            register={register}
            error={errors.firstName?.message}
            autoComplete="given-name"
          />
          <FormInput
            type="text"
            name="userName"
            placeholder="Enter your username"
            register={register}
            error={errors.userName?.message}
          />
          <FormInput
            type="email"
            name="email"
            placeholder="Enter your email address"
            register={register}
            error={errors.email?.message}
            autoComplete="username"
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Enter your password"
            register={register}
            error={errors.password?.message}
            autoComplete="new-password"
          />
          <span className="text-red-600">{checkEmailUsername.emailMessage}</span>
          <span className="text-red-600">{checkEmailUsername.usernameMessage}</span>
        </div>
        <GradientContainer classes="w-full">
          <Button classes="text-xl text-white w-full py-2 px-4" type="submit" loading={isSubmitting}>
            Sign Up
          </Button>
        </GradientContainer>
      </form>
      <span>
        Do you have an account?
        <Link href={'/auth/login'} className="text-blue mx-1 font-roboto">
          Log In
        </Link>
      </span>
    </div>
  );
};

export default SignUpForm;
