'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import { useStoriesAction } from '@/store/stories';
import { GrClose } from 'react-icons/gr';

const StoryDetail = () => {
  const { changeShowStories } = useStoriesAction();

  return (
    <div className="hidden tablet:flex justify-between items-center w-full">
      <Image
        src={'/typography.svg'}
        alt="instagram typography"
        width={50}
        height={35}
        className="w-32 h-10 bg-white p-1 rounded-lg"
      />
      <Button classes="border-2 border-white rounded-full p-1">
        <Link href={'/'}>
          <GrClose className="text-white text-xl" onClick={() => changeShowStories()} />
        </Link>
      </Button>
    </div>
  );
};

export default StoryDetail;
