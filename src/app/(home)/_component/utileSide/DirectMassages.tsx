import Image from 'next/image';

import { AiOutlineDash } from 'react-icons/ai';

import Button from '@/components/Button';
import textReducer from '@/hooks/textReducer';
import Box from '@/components/Box';

const directs: { pic: string; username: string; massage: string; link: string }[] = [
  { pic: '/anonymous.png', username: '@surenachiron', massage: "hello bro, i'm waiting here for you", link: '/fdg' },
  { pic: '/anonymous.png', username: '@parsa*84', massage: "i can't see you today", link: '/df' },
  { pic: '/anonymous.png', username: '@aliking', massage: "hahha, that's funny, now go away", link: '/fd' },
];

const DirectMassages = () => {
  return (
    <Box classes="flex flex-col gap-y-5 px-6 py-8 items-start w-full">
      <h3 className="text-grayMiddle font-bold w-full flex items-center justify-start">
        Direct Massages <AiOutlineDash className="mx-2" /> 03
      </h3>
      {directs.map((direct) => (
        <div className="flex items-center gap-x-3 border-b border-grayBack pb-2 w-full" key={direct.link}>
          <Image
            src={direct.pic}
            alt={`avatar of ${direct.username}`}
            width={30}
            height={10}
            className="rounded-full h-3/4"
          />
          <div className="flex flex-col">
            <p className="font-medium text-sm text-[#c8c8c8]">{direct.username}</p>
            <p className="text-sm">{textReducer({ text: direct.massage, max: 25, additionally: '...' })}</p>
          </div>
        </div>
      ))}
      <div className="w-full flex justify-center">
        <Button classes="px-9 py-1 bg-grayBack rounded-xl font-regular text-sm">New chat</Button>
      </div>
    </Box>
  );
};

export default DirectMassages;
