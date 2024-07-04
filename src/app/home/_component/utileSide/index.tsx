import Image from 'next/image';
import SearchBox from '@/components/SearchBox';
import PagesList from './PagesList';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Box from '@/components/Box';
import DirectMassages from './DirectMassages';
import NewPost from '@/app/profile/newPost/post/NewPost';

const UtileSide = () => {
  return (
    <div className="hidden desktop:flex flex-col col-span-1 gap-y-7">
      <Box classes="gap-8 px-6 py-8">
        <div className="flex flex-col items-center w-full gap-5">
          <Image src={'/typography.svg'} alt="instagram typography" width={100} height={35} className="w-32" />
          <SearchBox bg="Back" paddingH={6} />
        </div>
        <PagesList />
        <div className="w-full">
          <NewPost
            icon={
              <div className="flex gap-x-1 justify-center">
                New post
                <IoMdAddCircleOutline className="text-2xl" />
              </div>
            }
          />
        </div>
      </Box>
      <DirectMassages />
    </div>
  );
};

export default UtileSide;
