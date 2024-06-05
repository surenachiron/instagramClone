import ProfileInformation from './_component/ProfileInformation';
import Box from '@/components/Box';
import { createServerSupabaseClient } from '@/supabase/utils/server';

const ProfilePage = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from('profiles').select('*');

  console.log(data, error);

  return (
    <Box classes="h-fit">
      {data?.map((pro) => (
        <ProfileInformation
          key={pro.id}
          profile={{ name: pro.name, description: pro.description }}
          buttons={[
            { primaryText: '29', secondaryText: 'Posts' },
            { primaryText: '13 960', secondaryText: 'Followers' },
            { primaryText: '10 350', secondaryText: 'Following' },
            { primaryText: 'Follow', bgColor: 'bg-blue', colorText: 'text-white' },
            { primaryText: 'Message' },
            { primaryText: 'Share profile' },
          ]}
        />
      ))}
    </Box>
  );
};

export default ProfilePage;
