import { z } from 'zod';

const options = ['ToDo', 'InProgress', 'Completed'] as const;

export const todoValidation = z.object({
    title: z.string({ message: "title is required" }).min(1, { message: "title is mandatory" }),
    status: z.enum(options, { message: "kindly provide correct status" })

}).required()

export type Todo = z.infer<typeof todoValidation>;