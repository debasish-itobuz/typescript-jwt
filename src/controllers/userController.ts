import userModel from '../models/userModel'
import bcrypt  from "bcryptjs";
import { config } from 'dotenv'
config()
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { User, userValidation } from '../validators/userValidators'
import { catchBlock } from '../helper/commonCode'
import { ZodError } from 'zod'

const postUser = async (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        userValidation.parse(user);
        const alreadyExistUser = await userModel.findOne({email:user.email})
        if(alreadyExistUser) return res.status(400).send({message: "User already exists"})
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user.password, salt);
        const data = await userModel.create({...user, password:hashedPassword})
        return res.status(200).send({ data: data, message: "User added successfully" })

    } catch (e: any | ZodError) {
        return catchBlock(e, res, "User not added")
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        const { email, password } = user
        userValidation.parse(user);
        const data = await userModel.findOne({ email });
        if(!data) return res.status(400).send({ message:"User doesnot exists"})
            
        const isCorrectPassword = bcrypt.compareSync(password, data.password)
        if (data && isCorrectPassword) {
            const token = jwt.sign(
                { user: { userId: data._id, email: data.email } },
                `${process.env.SECRET_KEY}`,
                { expiresIn: '10d' }
            )
            return res.status(200).send({data:{token, email:data.email}, message:"User logged in successfully"})
        }
        else{
            return res.status(400).send({ message:"Credentials not correct"})
        }

    }  catch (e: any | ZodError) {
        return catchBlock(e, res, "User not loged in")
    }
}

export { postUser, loginUser }