import {z} from 'zod'

export const userSchema = {
  POST: z.object({
    username: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100)
  }),
  PUT: z.object({
    username: z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(100).optional()
  }),
};
