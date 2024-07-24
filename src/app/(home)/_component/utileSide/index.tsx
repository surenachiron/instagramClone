import Image from 'next/image';

import { IoMdAddCircleOutline } from 'react-icons/io';

import SearchBox from '@/components/search/SearchBox';
import Box from '@/components/Box';
import NewPost from '@/app/(profile)/profile/newPost/post/NewPost';
import DirectMassages from './DirectMassages';
import PagesList from './PagesList';

const UtileSide = () => {
  return (
    <div className="hidden desktop:flex flex-col col-span-1">
      <div className="sticky top-4">
        <div className="overflow-y-auto no-scrollbar max-h-[700px] pb-28">
          <Box classes="gap-8 px-6 py-8 mb-4">
            <div className="flex flex-col items-center w-full gap-5">
              <Image
                src={'/typography.svg'}
                alt="instagram typography"
                width={50}
                height={35}
                className="w-32 h-[35px]"
              />
              <SearchBox bg="Back" paddingH={6} />
            </div>
            <PagesList />
            <div className="w-full">
              <NewPost
                icon={
                  <div className="flex gap-x-1 justify-center">
                    <IoMdAddCircleOutline className="text-2xl" />
                    New post
                  </div>
                }
              />
            </div>
          </Box>
          <DirectMassages />
        </div>
      </div>
    </div>
  );
};

export default UtileSide;
