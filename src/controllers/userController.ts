import userModel from '../models/userModel'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { User, userValidation } from '../validators/userValidators'
import { ZodError } from 'zod'

const postUser = async (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        userValidation.parse(user);
        const data = await userModel.create(user)
        return res.status(200).send({ data: data, meassage: "User added successfully" })

    } catch (e: any | ZodError) {
        if (e instanceof ZodError) {
            return res.status(400).send({ errors: e.issues, message: "User not added" })
        }
        return res.status(400).send({ message: e.message })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        const { email, password } = user
        userValidation.parse(user);
        const data = await userModel.findOne({ email })
        if (data && password === data.password) {
            const token = jwt.sign(
                { user: { userId: data._id, email: data.email } },
                "qwerty1234", //secret_key
                { expiresIn: '10d' }
            )
            console.log(token)
            return res.status(200).send({data:{token, email:data.email}, message:"User logged in successfully"})
        }
        else{
            return res.status(400).send({ message:"Credentials not correct"})
        }

    }  catch (e: any | ZodError) {
        if (e instanceof ZodError) {
            return res.status(400).send({ errors: e.issues, message: "User not loged in" })
        }
        return res.status(400).send({ message: e.message })
    }
}

export { postUser, loginUser }