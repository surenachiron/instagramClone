import { z } from 'zod';

export const EmailVerificationSchema = z.object({
  input1: z.coerce.number().min(1, { message: 'must be at least 1 number' }).max(1, { message: 'input maximum is 1' }),
  input2: z.coerce.number().min(1, { message: 'must be at least 1 number' }).max(1, { message: 'input maximum is 1' }),
  input3: z.coerce.number().min(1, { message: 'must be at least 1 number' }).max(1, { message: 'input maximum is 1' }),
  input4: z.coerce.number().min(1, { message: 'must be at least 1 number' }).max(1, { message: 'input maximum is 1' }),
  input5: z.coerce.number().min(1, { message: 'must be at least 1 number' }).max(1, { message: 'input maximum is 1' }),
  input6: z.coerce.number().min(1, { message: 'must be at least 1 number' }).max(1, { message: 'input maximum is 1' }),
});
