import { cookies } from 'next/headers';
import Verification from './_component/Verification';

const EmailVerificationPage = () => {
  const user_email = cookies().get('user_email')?.value;
  return (
    <div className="w-full h-fit rounded-xl flex justify-center items-center gap-3 px-3 tablet:px-1 desktop:px-6 backdrop-blur-lg">
      <Verification user_email={user_email} />
    </div>
  );
};

export default EmailVerificationPage;
