import Box from '@components/Box';
import ProfileInfo from './ProfileInfo';

const ProfileSide = () => {
  return (
    <Box classes="col-span-1 h-fit rounded-md desktop:flex hidden">
      <ProfileInfo buttons={[{ primaryText: 'Edit Profile' }, { primaryText: 'Share profile' }]} />
    </Box>
  );
};

export default ProfileSide;
