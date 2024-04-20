import { z } from 'zod';

export const createCatSchema = z
    .object({
      name: z.string(),
      age: z.number(),
      breed: z.string(),
    })
    .required()
    .strict();

export type CreateCatDto = z.infer<typeof createCatSchema>;
