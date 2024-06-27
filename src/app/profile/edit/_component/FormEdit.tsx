'use client';

import FormInput from '@/components/FormInput';
import { ProfileTable } from '@/supabase/models/database';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EditProfileSchema, FormEditProfileType } from './editProfileType';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
import { updateProfile } from '../action';
import { toast } from 'react-toastify';

type Props = { profile: ProfileTable };

const FormEdit = ({ profile }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    trigger,
  } = useForm<FormEditProfileType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: { name: profile.full_name!, bio: profile.bio!, gender: profile.gender! },
  });

  async function submitEditProfile(data: FormEditProfileType) {
    let name = '';
    let bio = '';
    let gender = '';
    if (data.name !== profile.full_name) name = data.name;
    if (data.bio !== profile.bio) bio = data.bio;
    if (data.gender !== profile.gender) gender = data.gender;
    if (gender.length > 0 || name.length > 0 || bio.length > 0) {
      const result = await updateProfile({ full_name: name, bio, gender });
      if (result?.status) toast.success(result?.message);
      else toast.error(result?.message);
    }
  }

  return (
    <form className="flex flex-col gap-y-6 w-full" onSubmit={handleSubmit(submitEditProfile)}>
      <FormInput
        type="text"
        name="name"
        id="full_name"
        max={30}
        placeholder="Enter your Name"
        classes="w-full py-3 px-2 mt-2 bg-white font-light border border-grayBack rounded-xl"
        register={register}
        error={errors.name?.message}
        labelContent="Name"
        labelClasses="text-lg text-black font-bold"
      />
      <TextArea
        name="bio"
        error={errors.bio?.message}
        register={register}
        valueDefault={profile.bio!}
        max="150"
        rows={3}
        placeholder="Bio"
        labelContent="Bio"
        labelClasses="text-xl font-bold text-black"
      />
      <div>
        <label htmlFor="genderTypeTe" className="text-xl font-bold text-black">
          Gender
        </label>
        <select
          id="genderTypeTe"
          {...(register && { ...register('gender') })}
          className="rounded-xl border border-grayBack w-full py-3 px-2 mt-2 bg-white text-black font-light"
        >
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="no">Prefer not to say</option>
        </select>
      </div>
      <div className="flex justify-end w-full">
        <Button
          classes="px-2 py-2 bg-blue rounded-xl w-1/2 desktop:w-1/3 text-white"
          loading={isSubmitting}
          disabled={!isDirty}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FormEdit;
