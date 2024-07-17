'use client';

import Image from 'next/image';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { UserEmailVerification, reSendEmailVerification } from './action';
import { useUtilAction, useUtilStore } from '@/store/util';

import Box from '@/components/Box';
import Button from '@/components/Button';
import GradientContainer from '@/components/GradientContainer';
import InputVerificationT from './InputVerificationT';

type Props = { user_email: string | undefined };

const Verification = ({ user_email }: Props) => {
  const router = useRouter();
  const { setLoading } = useUtilAction();
  const { loading } = useUtilStore();

  async function formSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading('verificationSubmit', true);
    const result = await UserEmailVerification(formData);
    setLoading('verificationSubmit', false);
    if (result === false) toast.error('Something went wrong. Please try again.');
    if (result !== false) toast.success('Welcome to the Instagram Clone.');
  }

  async function reSendEmail() {
    setLoading('resendEmail', true);
    const result = await reSendEmailVerification();
    setLoading('resendEmail', false);
    if (result === false) toast.error('Something went wrong. Please try again.');
    if (result !== false) toast.success('Email sent again.');
  }

  return (
    <Box align="items-start" classes="w-full tablet:w-[70%] desktop:w-[42%] p-4 gap-5">
      <div className="flex items-center justify-center gap-2">
        <Image src={'/Icon.svg'} alt="main logo" width={50} height={50} />
        <h3 className="text-xl">Instagram Clone</h3>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-black">Verify Your Email</h3>
        <p>A 6-digit code has been sent to {user_email ? user_email : 'your email'}.</p>
        <Button
          classes="text-blue cursor-pointer"
          type="submit"
          onClick={() => router.push('/auth/email-verification/wrong-email')}
        >
          (Entered the wrong email? Change it here.)
        </Button>
        <p>Please enter it within the next 30 minutes.</p>
      </div>
      <form className="w-full" onSubmit={formSubmit}>
        <InputVerificationT numberOfInputs={6} />
        <GradientContainer classes="w-full mt-3">
          <Button classes="text-xl text-white w-full py-2 px-4" type="submit" loading={loading.verificationSubmit}>
            Register
          </Button>
        </GradientContainer>
      </form>
      <Button
        classes="text-blue mx-1 font-roboto text-center w-full"
        onClick={reSendEmail}
        loading={loading.resendEmail}
        direction="row"
        Spinner={{ color: '#3797ef', w: '20px', h: '20px' }}
      >
        Didn’t receive a code ?
      </Button>
    </Box>
  );
};

export default Verification;
