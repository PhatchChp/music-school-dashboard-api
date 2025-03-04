import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as studentService from "../services/student.service";
import { ensureStudentExists } from "../utils/entityUtils";
import { ExistingError, NotFoundError } from "../middlewares/errorHandler";

export const getAllStudent = asyncHandler(
    async (req: Request, res: Response) => {
        const students = await studentService.getAllStudent();
        return res.status(200).json({ students });
    }
);

export const getStudentById = asyncHandler(
    async (req: Request, res: Response) => {
        const student = await studentService.getStudentById(
            Number(req.params.id)
        );
        if (!student) throw new NotFoundError("Student not found");

        return res.status(200).json({ student });
    }
);

export const createStudent = asyncHandler(
    async (req: Request, res: Response) => {
        const existed = await studentService.isStudentExists(req.body);
        if (existed) {
            return res.status(409).json({ message: "Student already exists" });
        }

        const student = await studentService.createStudent(req.body);
        return res.status(201).json({ student });
    }
);

export const updateStudent = asyncHandler(
    async (req: Request, res: Response) => {
        await ensureStudentExists(Number(req.params.id));
        const nameExists = await studentService.isStudentExists(req.body);
        if (nameExists) throw new ExistingError("Student already exists");

        const studentUpdated = await studentService.updateStudent(
            Number(req.params.id),
            req.body
        );

        return res.status(200).json({ studentUpdated });
    }
);

export const deleteStudent = asyncHandler(
    async (req: Request, res: Response) => {
        await ensureStudentExists(Number(req.params.id));
        const studentDeleted = await studentService.deleteStudentById(
            Number(req.params.id)
        );
        return res.status(200).json({ studentDeleted });
    }
);
