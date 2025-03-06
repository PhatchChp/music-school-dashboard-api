import { ensureUserExists } from "./../utils/entityUtils";
import { asyncHandler } from "./../utils/asyncHandler";
import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { toUserResponse } from "../utils/fomatUser";
import bcrypt from "bcrypt";
import { ExistingError, NotFoundError } from "../middlewares/errorHandler";
import { Role } from "../config/constants";

export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const itemsPerpage = parseInt(req.query.limit as string) || 10;
    const search = String(req.query.search || "");
    const role = Object.values(Role).includes(req.query.role as Role)
        ? (req.query.role as Role)
        : undefined;

    const { users, totalItem } = await userService.getAllUser(page, itemsPerpage, search, role);
    const userResponse = users.map((user) => toUserResponse(user));

    return res.status(200).json({
        page,
        itemsPerpage,
        totalItem,
        totalPage: Math.ceil(totalItem / itemsPerpage),
        users: userResponse,
    });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) throw new NotFoundError("User not found");

    const userResponse = toUserResponse(user);
    return res.status(200).json(userResponse);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const userExisting = await userService.isUserExists(req.body);
    if (userExisting) throw new ExistingError("User already exists");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userCreated = await userService.createUser({
        ...req.body,
        password: hashedPassword,
    });

    const userResponse = toUserResponse(userCreated);
    return res.status(201).json(userResponse);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    await ensureUserExists(Number(req.params.id));
    const usernameExists = await userService.isUserExists(req.body);
    if (usernameExists) throw new ExistingError("Username already exists");

    const userUpdated = await userService.updateUser(Number(req.params.id), req.body);
    const userResponse = toUserResponse(userUpdated);
    return res.status(200).json(userResponse);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    await ensureUserExists(Number(req.params.id));
    const deletedUser = await userService.deleteUserById(Number(req.params.id));
    return res.status(200).json(deletedUser);
});

export const checkUserExists = asyncHandler(async (req: Request, res: Response) => {
    const userExisting = await userService.isUserExists(req.body);
    if (userExisting) throw new ExistingError("Username already exists");
    return res.status(200).json({ exists: false });
});
