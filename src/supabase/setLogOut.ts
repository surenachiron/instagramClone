import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/supabase/utils/client';

export const useLogout = () => {
  const router = useRouter();

  const logOut = async () => {
    const supabase = supabaseClient();
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return;
      }
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return logOut;
};
