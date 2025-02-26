import { NextFunction, Response } from "express";
import { AuthRequest } from "./verifyToken";

export const authorize = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: "Forbidden: Access denied" });
            return;
        }
        next();
    };
};
