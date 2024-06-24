'use client';

import { useRouter } from 'next/navigation';
import { createClientSupabaseClient } from '@/supabase/utils/client';

export const useLogout = () => {
  const router = useRouter();

  const logOut = async () => {
    const supabase = createClientSupabaseClient();
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return;
      }
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return logOut;
};
