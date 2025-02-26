"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
/**
 * Wrapper function สำหรับจัดการ async route handler โดยอัตโนมัติ
 * @param fn - ฟังก์ชัน async (req, res, next)
 * @returns Middleware function ที่จัดการ error ให้โดยใช้ next()
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
