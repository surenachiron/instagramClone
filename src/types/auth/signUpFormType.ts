import { ZodType, z } from 'zod';

export const SignUpDataSchema: ZodType<FormSingUpData> = z
  .object({
    firstName: z.string().min(2, { message: 'must be at least 2 characters' }),
    userName: z.string().min(2, { message: 'must be at least 3 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(42, { message: 'must be between 6-42 characters' }),
  })
  .required();

export type FormSingUpData = {
  firstName: string;
  userName: string;
  email: string;
  password: string;
};
