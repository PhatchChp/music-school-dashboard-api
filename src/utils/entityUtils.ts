import { NotFoundError } from "../middlewares/errorHandler";
import * as studentService from "../services/student.service";
import * as userService from "../services/user.service";

// Student
export const ensureStudentExists = async (id: number) => {
    const student = await studentService.getStudentById(id);
    if (!student) throw new NotFoundError("Student not found");
    return student;
};

// User
export const ensureUserExists = async (id: number) => {
    const user = await userService.getUserById(id);
    if (!user) throw new NotFoundError("User not found");
    return user;
};
