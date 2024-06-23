'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import GradientContainer from '@/components/GradientContainer';
import { login } from '../action';
import { useForm } from 'react-hook-form';
import { FormLoginData, LoginDataSchema } from '@/types/auth/loginFormType';
import FormInput from '@/components/FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { reSendEmailVerification } from '../../email-verification/action';
import { useRouter } from 'next/navigation';
import { useUtilAction, useUtilStore } from '@/store/util';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginData>({
    resolver: zodResolver(LoginDataSchema),
  });

  const [checkError, setCheckError] = useState('');
  const { loading } = useUtilStore();
  const { setLoading } = useUtilAction();
  const router = useRouter();

  const formSubmit = async (data: FormLoginData) => {
    setCheckError('');
    const result = await login(data);
    if (result?.message) {
      setCheckError(result?.message);
    }
    if (result?.status === false && !result?.message) toast.error('Something went wrong. Please try again.');
    if (result?.status !== false) toast.success('Welcome to the Instagram Clone.');
  };

  const EmailVerify = async () => {
    setLoading('emailNotConfirmedLogin', true);
    const result = await reSendEmailVerification();
    if (result) router.push('/auth/email-verification');
    setLoading('emailNotConfirmedLogin', false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 h-full w-[90%] tablet:w-full desktop:w-3/4 font-roboto">
      <Image src={'/typography.svg'} alt="instagram typography logo" width={185} height={100} />
      <form className="flex flex-col justify-center items-center gap-4 w-full" onSubmit={handleSubmit(formSubmit)}>
        <div className="flex flex-col items-start gap-3 w-full">
          <FormInput
            type="email"
            name="email"
            placeholder="Enter your email address"
            register={register}
            error={errors.email}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="password"
            register={register}
            error={errors.password}
            autoComplete="new-password"
          />
          {checkError.length > 1 && (
            <span className="text-red-600 flex">
              {checkError}:
              <Button
                classes="text-blue ml-1"
                onClick={EmailVerify}
                type="button"
                loading={loading.emailNotConfirmedLogin}
                direction="row"
                Spinner={{ color: '#3797ef', w: '20px', h: '20px' }}
              >
                go to verification
              </Button>
            </span>
          )}
        </div>
        <div className="w-full">
          <Link href={'/auth/forgot-password'} className="text-blue">
            Forgot password ?
          </Link>
        </div>
        <GradientContainer classes="w-full">
          <Button classes="text-xl text-white w-full py-2 px-4" type="submit" loading={isSubmitting}>
            Log In
          </Button>
        </GradientContainer>
      </form>
      <span>
        Don&apos;t have an account?
        <Link href={'/auth/sign-up'} className="text-blue mx-1 font-roboto">
          Sign up
        </Link>
      </span>
    </div>
  );
};

export default LoginForm;
