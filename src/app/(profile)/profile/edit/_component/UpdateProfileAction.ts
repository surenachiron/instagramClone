'use server';

import { revalidatePath } from 'next/cache';

import { supabaseServer } from '@/supabase/utils/server';

type updateProfileType = {
  full_name: string;
  bio: string;
  gender: string;
};

export async function updateProfile(updatedFields: Partial<updateProfileType>) {
  const supabase = supabaseServer();
  const filteredUpdatedFields = Object.fromEntries(
    Object.entries(updatedFields).filter(([_, value]) => value !== undefined && value !== '')
  );

  if (Object.keys(filteredUpdatedFields).length > 0) {
    const { error } = await supabase.auth.updateUser({
      data: filteredUpdatedFields,
    });
    if (error) return { status: false, message: 'something went wrong, please try again.' };
    else {
      revalidatePath('/profile/edit');
      return { status: true, message: 'your profile updated.' };
    }
  }
}
