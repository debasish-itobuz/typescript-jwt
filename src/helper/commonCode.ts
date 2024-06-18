import { Response } from "express"
import { ZodError } from 'zod'
function catchBlock(e: any , res:Response, message:string){
    if (e instanceof ZodError) {
        return res.status(400).send({ errors: e.issues, message: message })
    }
    return res.status(400).send({ message: e.message })
}

export {catchBlock}