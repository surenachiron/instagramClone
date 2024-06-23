import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Forgot Password page',
};

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ForgotPasswordLayout;
