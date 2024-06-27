'ues client';

import Box from '@/components/Box';
import { ProfileTable } from '@/supabase/models/database';
import Image from 'next/image';
import UploadAvatar from '../../[username]/_component/UploadAvatar';
import FormEdit from './FormEdit';

type Props = { profile: ProfileTable };

const EditProfile = ({ profile }: Props) => {
  return (
    <Box classes="rounded-md w-full py-4 gap-2" backGround="bg-grayBack">
      <Box classes="p-3 desktop:p-6 justify-start w-full tablet:w-3/4 gap-y-6" align="items-start">
        <h3 className="text-xl font-bold text-black">Edit Profile</h3>
        <Box classes="flex justify-between items-center w-full p-3" flexDirection="flex-row" backGround="bg-grayBack">
          <div className="flex items-center gap-x-3">
            <div className="relative w-[65px] h-[65px]">
              <div className="absolute w-full h-full">
                <Image
                  src={profile.avatar_url ? profile.avatar_url : '/anonymous.png'}
                  alt={`user avatar ${profile.user_name}`}
                  width={150}
                  height={150}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-lg text-black">{profile.user_name}</h3>
              <p className="text-sm">{profile.full_name}</p>
            </div>
          </div>
          <UploadAvatar
            key={'uploadAvatarInEditWithButton'}
            icon={'Change photo'}
            iconStyle="rounded-lg bg-blue text-white px-3 py-1"
            parentIconStyle="px-1"
          />
        </Box>
        <FormEdit profile={profile} />
      </Box>
    </Box>
  );
};

export default EditProfile;
