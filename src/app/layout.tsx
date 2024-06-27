import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '@/components/Spinner';
import CookiesToLocal from '@/hooks/setCookiesToLocal';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Instagram clone',
  description: 'a clone of Instagram',
  icons: '/Icon.svg',
  authors: [{ name: 'mohammad' }, { name: 'mohammad', url: 'https://github.com/surenachiron' }],
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const username = cookies().get('username')?.value;

  return (
    <html lang="en" className={`${roboto.variable} bg-grayBack`}>
      <body>
        <div className="font-roboto">
          <Spinner />
          <CookiesToLocal namVal="username" val={username} />
          {children}
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
