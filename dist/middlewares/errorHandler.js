"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            errors: err.errors.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            })),
        });
        return;
    }
    res.status(500).json({
        message: err.message || "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
