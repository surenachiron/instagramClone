import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import NavigateMobile from './home/_component/utileSide/NavigateMobile';
import UtileSide from './home/_component/utileSide';
import '@styles/globals.css';

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
  return (
    <html lang="en" className={`${roboto.variable} bg-grayBack`}>
      <body>
        <div className="font-roboto grid gap-3 grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 container py-5">
          <UtileSide />
          <div className="col-span-1 tablet:col-span-3">
            {children}
            <NavigateMobile />
          </div>
        </div>
      </body>
    </html>
  );
}
