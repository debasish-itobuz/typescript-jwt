import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';

export function validateDataMiddleware(schema: z.ZodObject<any, any>) {
    console.log("hi")
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => issue.message);
                return res.status(StatusCodes.BAD_GATEWAY).send(
                    { error: 'Invalid data', details: errorMessages }
                )
            } else {
               return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Internal Server Error" })
            }

        }
    }
}