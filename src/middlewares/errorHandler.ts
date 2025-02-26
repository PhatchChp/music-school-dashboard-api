import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

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

    res.status(500).json({
        message: err.message || "Internal Server Error",
    });
};
