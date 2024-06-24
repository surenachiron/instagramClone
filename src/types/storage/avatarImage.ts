import { z } from 'zod';

const Image_Types = ['image/jpeg', 'image/jpg', 'image/png'];

export const RegistrationImageAvatarSchema = z.object({
  imageAvatar: z
    .any()
    .refine((files) => files && files.length > 0, 'File is required.')
    .refine((files) => files?.[0]?.size <= 5242880, `File size should be less than 5MB.`)
    .refine(
      (files) => Image_Types.includes(files?.[0]?.type),
      'Only formats of .jpg, .jpeg, and .png files are accepted.'
    ),
});

export type ImageAvatarData = {
  imageAvatar: FileList;
};
