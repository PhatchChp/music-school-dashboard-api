import { User } from "@prisma/client";
import { UserResponse } from "../interfaces/user.interface";

export const toUserResponse = (user: User): UserResponse => ({
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});
