import { Metadata } from 'next';
import BackPage from '@components/BackPage';

export const metadata: Metadata = {
  title: 'profile',
  description: 'a clone of Instagram',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-grayBack">
      <div className="text-start">
        <BackPage className="bg-white" />
      </div>
      {children}
    </div>
  );
}
