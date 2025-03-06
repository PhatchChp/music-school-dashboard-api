import { Prisma, User } from "@prisma/client";
import { prisma } from "../config/prisma";
import { UserRequest } from "../interfaces/user.interface";
import { Role } from "../config/constants";

export const getAllUser = async (
    page: number,
    itemsPerpage: number,
    search?: string,
    role?: Role
): Promise<{ users: User[]; totalItem: number }> => {
    const skip = (page - 1) * itemsPerpage;
    const where: Prisma.UserWhereInput = {
        ...(search?.trim() !== "" ? { name: { contains: search, mode: "insensitive" } } : {}),
        ...(role ? { role } : {}),
    };

    const users = await prisma.user.findMany({
        orderBy: { id: "desc" },
        skip,
        take: itemsPerpage,
        where,
    });

    const totalItem = await prisma.user.count({ where }); // for totalPage

    return { users, totalItem };
};

export const getUserById = async (id: number): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id } });
};

export const createUser = async (data: UserRequest): Promise<User> => {
    return await prisma.user.create({ data });
};

export const updateUser = async (id: number, data: UserRequest): Promise<User> => {
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
