"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.ExistingError = exports.NotFoundError = void 0;
const zod_1 = require("zod");
class NotFoundError extends Error {
    constructor(message = "Resource not found") {
        super(message);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
class ExistingError extends Error {
    constructor(message = "Resource already exists") {
        super(message);
        this.name = "ExistingError";
    }
}
exports.ExistingError = ExistingError;
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
    if (err instanceof NotFoundError) {
        res.status(404).json({ message: err.message });
        return;
    }
    if (err instanceof ExistingError) {
        res.status(409).json({ message: err.message });
        return;
    }
    res.status(500).json({
        message: err.message || "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
