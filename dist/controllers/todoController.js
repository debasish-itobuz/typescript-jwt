"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTodo = exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.getTodo = exports.postTodo = void 0;
const todoModel_1 = __importDefault(require("../models/todoModel"));
const todoValidators_1 = require("../validators/todoValidators");
const postTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = todoValidators_1.todoValidation.safeParse(req.body);
        if (!parsedData.success) {
            const messages = parsedData.error.issues.map((err) => err.message);
            return res.status(400).send({ errors: messages, message: "error" });
        }
        const data = yield todoModel_1.default.create(parsedData.data);
        return res.status(200).send({ data: data, success: "200", message: "Data added successfully" });
    }
    catch (err) {
        console.log("Error", err);
        return res.status(400).send({ data: err, success: "400", message: "Data not added" });
    }
});
exports.postTodo = postTodo;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield todoModel_1.default.find();
        return res.status(200).send({ data: data, success: "200", message: "Data fetched successfully" });
    }
    catch (err) {
        console.log("Error", err);
        return res.status(400).send({ data: null, success: "400", message: "Data not fetched" });
    }
});
exports.getTodo = getTodo;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield todoModel_1.default.findById(req.query.id);
        return res.status(200).send({ data: data, success: "200", message: "Data fetched successfully" });
    }
    catch (err) {
        console.log("Error", err);
        return res.status(400).send({ data: null, success: "400", message: "Data not fetched" });
    }
});
exports.getTodoById = getTodoById;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = todoValidators_1.todoValidation.safeParse(req.body);
        if (!parsedData.success) {
            const messages = parsedData.error.issues.map((err) => err.message);
            return res.status(400).send({ errors: messages, message: "error" });
        }
        const data = yield todoModel_1.default.findByIdAndUpdate(req.query.id, parsedData.data);
        return res.status(200).send({ data: data, success: "200", message: "Data updated successfully" });
    }
    catch (err) {
        console.log("Error", err);
        return res.status(400).send({ data: err, success: "400", message: "Data not updated" });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield todoModel_1.default.findByIdAndDelete(req.query.id);
        return res.status(200).send({ data: data, success: "200", message: "Data Deleted successfully" });
    }
    catch (err) {
        console.log("Error", err);
        return res.status(400).send({ data: null, success: "400", message: "Data not deleted" });
    }
});
exports.deleteTodo = deleteTodo;
const filterTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.query;
        const data = yield todoModel_1.default.find({ status: status });
        return res.status(200).send({ data: data, success: "200", message: "Data fetched successfully" });
    }
    catch (err) {
        console.log("Error", err);
        return res.status(400).send({ data: null, success: "400", message: "Data not fetched" });
    }
});
exports.filterTodo = filterTodo;
