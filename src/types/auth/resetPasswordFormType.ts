import { ZodType, z } from 'zod';

export const ResetPasswordSchema: ZodType<FormResetPasswordData> = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(42, { message: 'must be between 6-42 characters' }),
    rePassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(42, { message: 'must be between 6-42 characters' }),
  })
  .required()
  .refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match. Please try again.',
    path: ['rePassword'],
  });

export type FormResetPasswordData = {
  password: string;
  rePassword: string;
};
