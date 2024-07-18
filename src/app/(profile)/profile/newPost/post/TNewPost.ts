import { z } from 'zod';

const Media_Types = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'];

export const NewPostSchema = z.object({
  caption: z
    .string()
    .min(5, { message: 'Must be more than 5 characters' })
    .max(2200, { message: 'Must be less than 2200 characters' }),
  media: z
    .any()
    .refine((files) => files && files.length > 0, 'File is required.')
    .refine((files) => files?.[0]?.size <= 5242880, `File size should be less than 5MB.`)
    .refine(
      (files) => Media_Types.includes(files?.[0]?.type),
      'Only formats of .jpg, .jpeg, and .png files are accepted.'
    ),
});

export type FormNewPostType = {
  caption: string;
  media: FileList | string;
};
