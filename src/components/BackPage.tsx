'use client';

import { useRouter } from 'next/navigation';

import { FaArrowLeft } from 'react-icons/fa6';

import Button from './Button';

type Props = {
  className?: string;
  link?: string;
};

const BackPage = ({ className, link }: Props) => {
  const router = useRouter();

  return (
    <Button
      classes={`p-1 rounded-lg w-fit justify-start items-start ${className}`}
      onClick={() => (link ? router.push(link) : router.back())}
    >
      <FaArrowLeft className="text-xl" />
    </Button>
  );
};

export default BackPage;
