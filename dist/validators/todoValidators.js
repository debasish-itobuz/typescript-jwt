"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoValidation = void 0;
const zod_1 = require("zod");
const options = ['ToDo', 'InProgress', 'Completed'];
exports.todoValidation = zod_1.z.object({
    title: zod_1.z.string({ message: "title is required" }).min(1, { message: "title is mandatory" }),
    // status: z.string({message: "status is required"}).enum(options, { message: "kindly provide correct status" })
    status: zod_1.z.enum(options, { message: "kindly provide correct status" })
}).required();
