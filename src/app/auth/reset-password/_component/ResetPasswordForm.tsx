'use client';

import Box from '@/components/Box';
import Button from '@/components/Button';
import { useSearchParams } from 'next/navigation';
import { setResetPassword } from '../action';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormResetPasswordData, ResetPasswordSchema } from '@/types/auth/resetPasswordFormType';
import { toast } from 'react-toastify';
import FormInput from '@/components/FormInput';

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormResetPasswordData>({ resolver: zodResolver(ResetPasswordSchema) });

  async function formSubmit(data: FormResetPasswordData) {
    const result = await setResetPassword(data.password, searchParams.get('code')!);
    if (result === false) toast.error('Something went wrong. Please try again.');
    if (result !== false) toast.success('Your Password has successfully changed.');
  }

  return (
    <Box align="items-center" classes="w-full tablet:w-[70%] desktop:w-[42%] p-4 gap-3">
      <h3 className="text-2xl font-bold text-black">Enter Your New Password</h3>
      <hr className="w-full mb-3" />
      <form onSubmit={handleSubmit(formSubmit)} className="w-full" name="resetPasswordForm">
        <div className="flex flex-col gap-2 text-start w-full mb-6">
          <label htmlFor="passwordPrimary" className="text-slate-700 font-medium">
            Password (required)
          </label>
          <FormInput
            type="password"
            name="password"
            placeholder="Must have at least 6 characters"
            register={register}
            error={errors.password}
            autoComplete="new-password"
          />
          <label htmlFor="passwordSecondary" className="text-slate-700 font-medium mt-3">
            Re-enter Password
          </label>
          <FormInput
            type="password"
            name="rePassword"
            placeholder="Must have at least 6 characters"
            register={register}
            error={errors.rePassword}
            autoComplete="new-password"
          />
        </div>
        <Button classes="bg-blue text-white w-full py-3 px-2 rounded-xl font-medium" loading={isSubmitting}>
          Reset Password
        </Button>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
