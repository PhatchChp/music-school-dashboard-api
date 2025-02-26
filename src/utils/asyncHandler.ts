import { NextFunction, Request, Response } from "express";

/**
 * Wrapper function สำหรับจัดการ async route handler โดยอัตโนมัติ
 * @param fn - ฟังก์ชัน async (req, res, next)
 * @returns Middleware function ที่จัดการ error ให้โดยใช้ next()
 */

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};
