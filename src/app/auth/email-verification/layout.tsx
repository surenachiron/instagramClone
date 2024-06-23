import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Verification',
  description: 'Email Verification page',
};

const EmailVerificationLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default EmailVerificationLayout;
