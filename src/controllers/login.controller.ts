import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../config/prisma";
import { JWT_SECRET } from "../config/constants";
import { toUserResponse } from "../utils/fomatUser";

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
            .status(400)
            .json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
        { userId: user.id, username: user.name, role: user.role },
        JWT_SECRET,
        { expiresIn: "4h" }
    );

    const userResponse = toUserResponse(user);
    return res.status(200).json({
        message: "Login Success",
        token,
        user: userResponse,
    });
});
