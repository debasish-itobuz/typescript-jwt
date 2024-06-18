import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
    userId: string;
}

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        // const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log(req.headers)
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (authHeader && authHeader.startsWith("Bearer")) {
            const token = authHeader.split(" ")[1];

            if (!token) {
                throw new Error("Token is missing");
            }
            // const decoded = jwt.verify(token, "qwerty1234");

            jwt.verify(token, "qwerty1234", (err, decoded) => {
                if (err) {
                    throw new Error("Wrong Token");
                }

                req.userId = decoded.user.userId;
                // console.log(decoded)
                next();
            });
        }
        else{
            res.status(401).send("Token is missing");
        }
    } catch (err) {
        res.status(401).send("Please authenticate");
    }
}

export default verifyToken;