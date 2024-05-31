import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Instagram Clone',
  authors: [{ name: 'mohammad' }, { name: 'mohammad', url: 'https://github.com/surenachiron' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="text-grayMiddle">{children}</div>;
}
