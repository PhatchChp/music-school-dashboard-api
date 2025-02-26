import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcrypt";

export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({ orderBy: { id: "desc" } });
    res.status(200).json({ users });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password, name, role } = req.body;

    if (!username || !password || !name || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            name,
            role,
        },
    });
    res.status(201).json({ message: "Create User success!" });
});
