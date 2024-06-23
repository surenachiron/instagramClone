import { ZodType, z } from 'zod';

export const LoginDataSchema: ZodType<FormLoginData> = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(42, { message: 'must be between 6-42 characters' }),
  })
  .required();

export type FormLoginData = {
  email: string;
  password: string;
};
