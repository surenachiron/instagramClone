import Image from 'next/image';
import SearchBox from '@/components/SearchBox';
import PagesList from './PagesList';
import Button from '@/components/Button';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Box from '@/components/Box';
import DirectMassages from './DirectMassages';

const UtileSide = () => {
  return (
    <div className="hidden desktop:flex flex-col col-span-1 gap-y-7">
      <Box classes="gap-8 px-6 py-8">
        <div className="flex flex-col items-center w-full gap-5">
          <Image src={'typography.svg'} alt="instagram typography" width={100} height={35} className="w-32" />
          <SearchBox bg="Back" padingH={6} />
        </div>
        <PagesList />
        <div className="w-full">
          <Button classes="w-full bg-blue gap-x-2 text-white font-light rounded-2xl p-2">
            <IoMdAddCircleOutline className="text-2xl" />
            New post
          </Button>
        </div>
      </Box>
      <DirectMassages />
    </div>
  );
};

export default UtileSide;
