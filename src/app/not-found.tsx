import { Metadata } from 'next';

import GradientText from '@/components/GradientText';

export const metadata: Metadata = {
  title: 'Not Found',
  description: `this page isn't available`,
};

const NotFound = () => {
  return (
    <div className="font-roboto font-bold text-xl w-full h-[90vh] flex justify-center items-center text-black">
      Sorry, this page
      <GradientText Wrapper="span" text="isn't" classes="font-roboto font-bold mx-1" />
      available.
    </div>
  );
};

export default NotFound;
