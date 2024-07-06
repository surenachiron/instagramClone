import { ZodType, z } from 'zod';

export const EditProfileSchema: ZodType<FormEditProfileType> = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(42, { message: 'Must be between 6-42 characters' }),
  bio: z.string().max(150, { message: 'It should be less than 150 characters' }),
  gender: z.string(),
});

export type FormEditProfileType = {
  name: string;
  bio: string;
  gender: string;
};
