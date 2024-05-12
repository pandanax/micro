import { z } from 'zod';

export const createUserSchema = z
    .object({
        username: z.string(),
        password: z.string(),
        role: z.enum(['admin', 'user']),
    })
    .required()
    .strict();

export type CreateUserDto = z.infer<typeof createUserSchema>;
