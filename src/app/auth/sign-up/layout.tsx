import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sing Up',
  description: 'Sing Up page',
};

const SingUpLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SingUpLayout;
