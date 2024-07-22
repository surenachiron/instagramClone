import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stories',
  description: 'Instagram Clone',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
