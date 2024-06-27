import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Profile',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
