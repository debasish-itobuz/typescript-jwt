"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todoRoute_1 = __importDefault(require("./routes/todoRoute"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
(0, dbConnection_1.default)();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4005;
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use('/todo', todoRoute_1.default);
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
};
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
