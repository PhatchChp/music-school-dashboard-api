import { User } from "@prisma/client";
import { prisma } from "../config/prisma";
import { UserRequest } from "../interfaces/user.interface";

export const getAllUser = async (): Promise<User[]> => {
    return await prisma.user.findMany({ orderBy: { id: "desc" } });
};

export const getUserById = async (id: number): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id } });
};

export const createUser = async (data: UserRequest): Promise<User> => {
    return await prisma.user.create({ data });
};

export const updateUser = async (
    id: number,
    data: UserRequest
): Promise<User> => {
    return await prisma.user.update({ where: { id }, data });
};

export const deleteUserById = async (id: number): Promise<User> => {
    return await prisma.user.delete({ where: { id } });
};

export const isUserExists = async (data: UserRequest): Promise<boolean> => {
    const user = await prisma.user.findFirst({
        where: { username: data.username },
    });

    return !!user; // ถ้าเจอ -> true ถ้าไม่เจอ -> false
};
