import {z} from 'zod'

export const postSchema = {
    POST: z.object(
        {
            title: z.string().min(1).max(200),
            content: z.string().min(1).max(5000),
            authorId: z.number().int().positive()
        }
    ),
    PUT: z.object(
        {
            title: z.string().min(1).max(200).optional(),
            content: z.string().min(1).max(5000).optional(),
            authorId: z.number().int().positive().optional()
        }   

    )
};