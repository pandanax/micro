import { z } from 'zod';

export const signInSchema = z
    .object({
        username: z.string(),
        password: z.string(),
    })
    .required()
    .strict();

export type SignInDto = z.infer<typeof signInSchema>;
