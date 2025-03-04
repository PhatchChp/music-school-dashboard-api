import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class NotFoundError extends Error {
    constructor(message: string = "Resource not found") {
        super(message);
        this.name = "NotFoundError";
    }
}

export class ExistingError extends Error {
    constructor(message: string = "Resource already exists") {
        super(message);
        this.name = "ExistingError";
    }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof ZodError) {
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
