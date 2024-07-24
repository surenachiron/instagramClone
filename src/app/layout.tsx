import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { cookies } from 'next/headers';

import { ToastContainer } from 'react-toastify';

import CookiesToLocal from '@/hooks/setCookiesToLocal';

import Spinner from '@/components/Spinner';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

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

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const username = cookies().get('username')?.value;

  return (
    <html lang="en" className={`${roboto.variable} bg-grayBack`}>
      <body>
        <div className="font-roboto mb-14">
          <Spinner />
          <CookiesToLocal namVal="username" val={username} />
          {modal && <div id="modal-root">{modal}</div>}
          {children}
          <ToastContainer autoClose={15000} bodyClassName={'z-[999999999]'} />
        </div>
      </body>
    </html>
  );
}
