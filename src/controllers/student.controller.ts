import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../config/prisma";

export const getAllStudent = asyncHandler(
    async (req: Request, res: Response) => {
        const students = await prisma.student.findMany({
            orderBy: { id: "desc" },
        });
        res.status(200).json({ students });
    }
);

export const createStudent = asyncHandler(
    async (req: Request, res: Response) => {
        const { firstName, lastName, nickName, age } = req.body;
        const student = await prisma.student.create({
            data: { firstName, lastName, nickName, age },
        });
        res.status(201).json({ student });
    }
);
