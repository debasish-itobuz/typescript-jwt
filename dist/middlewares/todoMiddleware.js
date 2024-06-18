"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDataMiddleware = void 0;
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
function validateDataMiddleware(schema) {
    console.log("hi");
    return (req, res, next) => {
        console.log(req.body);
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => issue.message);
                return res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).send({ error: 'Invalid data', details: errorMessages });
            }
            else {
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Internal Server Error" });
            }
        }
    };
}
exports.validateDataMiddleware = validateDataMiddleware;
