import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'reset Password page',
};

const ResetPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ResetPasswordLayout;
