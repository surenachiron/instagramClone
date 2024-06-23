import { ZodType, z } from 'zod';

export const ForgotPasswordSchema: ZodType<FormForgotPassword> = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export type FormForgotPassword = {
  email: string;
};
