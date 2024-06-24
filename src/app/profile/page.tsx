import ProfileInfo from './_component/ProfileInfo';
import Box from '@/components/Box';
import { getUser } from '@/supabase/getUser';

export const revalidate = 30;

const ProfilePage = async () => {
  const userProfile = await getUser();

  return (
    <Box classes="h-fit">
      {userProfile ? (
        <ProfileInfo
          key={userProfile.id}
          profile={{ name: userProfile.fullName, username: userProfile.username, avatar: userProfile.avatar }}
          buttons={[
            { primaryText: '0', secondaryText: 'Posts' },
            { primaryText: '0', secondaryText: 'Followers' },
            { primaryText: '0', secondaryText: 'Following' },
          ]}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">something went wrong, please try again.</div>
      )}
    </Box>
  );
};

export default ProfilePage;
