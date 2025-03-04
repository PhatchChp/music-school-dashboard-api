import { Student } from "@prisma/client";
import { prisma } from "../config/prisma";
import { StudentRequest } from "../interfaces/student.interface";

export const getAllStudent = async (): Promise<Student[]> => {
    return await prisma.student.findMany({ orderBy: { id: "desc" } });
};

export const getStudentById = async (id: number): Promise<Student | null> => {
    return await prisma.student.findUnique({ where: { id } });
};

export const createStudent = async (data: StudentRequest): Promise<Student> => {
    return await prisma.student.create({ data });
};

export const updateStudent = async (
    id: number,
    data: StudentRequest
): Promise<Student> => {
    return await prisma.student.update({ where: { id }, data });
};

export const deleteStudentById = async (id: number) => {
    return await prisma.student.delete({ where: { id } });
};

export const isStudentExists = async (
    data: StudentRequest
): Promise<boolean> => {
    const studentExists = await prisma.student.findFirst({
        where: {
            firstName: data.firstName,
            lastName: data.lastName,
            nickName: data.nickName,
        },
    });
    return !!studentExists; // ถ้ามี student -> true ถ้าไม่มี -> false
};
