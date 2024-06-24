'use client';

import { useUtilAction } from '@/store/util';
import Button from './Button';
import { useLogout } from '@/supabase/setLogOut';
import { PiSignOutFill } from 'react-icons/pi';
import { toast } from 'react-toastify';

const LogOutBut = () => {
  const { setLoading } = useUtilAction();
  const logOut = useLogout();

  async function onLogOut() {
    setLoading('main', true);
    await logOut();
    setLoading('main', false);
    toast.success('You have left your account.');
  }

  return (
    <Button classes="bg-white rounded-full h-fit p-2 order-4 desktop:order-1" onClick={onLogOut}>
      <PiSignOutFill className="text-black text-md text-lg" />
    </Button>
  );
};

export default LogOutBut;
