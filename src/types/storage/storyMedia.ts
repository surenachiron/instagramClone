import { z } from 'zod';

const Image_Types = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'];

export const RegStoryMediaDataSchema = z.object({
  storyMedia: z
    .any()
    .refine((files) => files && files.length > 0, 'File is required.')
    .refine((files) => files?.[0]?.size <= 5242880, `File size should be less than 5MB.`)
    .refine(
      (files) => Image_Types.includes(files?.[0]?.type),
      'only format of .jpg, .jpeg, .png and mp4 files are accepted.'
    ),
});

export type StoryMediaData = {
  storyMedia: FileList;
};
