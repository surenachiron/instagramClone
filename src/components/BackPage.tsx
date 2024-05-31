'use client';

import Button from './Button';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';

type Props = {
  className?: string;
};

const BackPage = ({ className }: Props) => {
  const router = useRouter();

  return (
    <Button classes={`p-1 rounded-lg w-fit justify-start items-start ${className}`} onClick={() => router.back()}>
      <FaArrowLeft className="text-xl" />
    </Button>
  );
};

export default BackPage;
