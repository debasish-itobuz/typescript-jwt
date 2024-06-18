import todoModel from "../models/todoModel";
import { Request, Response } from 'express'
import {CustomRequest} from '../middlewares/tokenVerify'
import { Todo, todoValidation } from "../validators/todoValidators";
import { ZodError } from "zod";

const postTodo = async (req: Request, res: Response) => {
    try {
        const todo: Todo = req.body;

        todoValidation.parse(todo);
        const userId = req.CustomRequest.userId;
        // console.log(userId)
        const data = await todoModel.create({todo, userId});
        return res.status(200).send({ data: data, message: "Data added successfully" })

    } catch (e: any | ZodError) {
        if (e instanceof ZodError) {
            return res.status(400).send({ errors: e.issues, message: "Data not added" })
        }
        return res.status(400).send({ message: e.message })
    }
}

const getTodo = async (req: Request, res: Response) => {
    try {
        const userId = req.CustomRequest.userId;
        const data: Todo[] = await todoModel.find({userId})
        return res.status(200).send({ data: data, message: "Data fetched successfully" })
    } catch (err) {
        console.log("Error", err)
        return res.status(400).send({ data: null, message: "Data not fetched" })
    }
}

const getTodoById = async (req: Request, res: Response) => {
    try {
        const data = await todoModel.findById(req.query.id)
        return res.status(200).send({ data: data, message: "Data fetched successfully" })
    } catch (err) {
        console.log("Error", err)
        return res.status(400).send({ data: null, message: "Data not fetched" })
    }
}

const updateTodo = async (req: Request, res: Response) => {
    try {
        const todo: Todo = req.body;
        todoValidation.parse(todo);
        const data = await todoModel.findByIdAndUpdate(req.query.id, todo)
        return res.status(200).send({ data: data, message: "Data updated successfully" })

    } catch (e: any | ZodError) {
        if (e instanceof ZodError) {
            return res.status(400).send({ errors: e.issues, message: "Data not updated" })
        }
        return res.status(400).send({ message: e.message })
    }
}

const deleteTodo = async (req: Request, res: Response) => {
    try {
        const data = await todoModel.findByIdAndDelete(req.query.id)
        return res.status(200).send({ data: data, message: "Data Deleted successfully" })
    } catch (err) {
        console.log("Error", err)
        return res.status(400).send({ data: null, message: "Data not deleted" })
    }
}

const filterTodo = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        const data = await todoModel.find({ status: status })
        return res.status(200).send({ data: data, message: "Data fetched successfully" })
    } catch (err) {
        console.log("Error", err)
        return res.status(400).send({ data: null, message: "Data not fetched" })

    }
}

export { postTodo, getTodo, getTodoById, updateTodo, deleteTodo, filterTodo }