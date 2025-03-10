import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { authorize } from "../middlewares/authorize";
import { validate } from "../middlewares/validate";
import {
    createStudent,
    getAllStudent,
    updateStudent,
    getStudentById,
    deleteStudent,
} from "../controllers/student.controller";
import { studentSchema } from "../validations/studentSchema";
import { Role } from "../config/constants";

const router = Router();

router.get("/", verifyToken, authorize([Role.ADMIN]), getAllStudent);
router.get("/:id", verifyToken, authorize([Role.ADMIN]), getStudentById);

router.post(
    "/create",
    verifyToken,
    authorize([Role.ADMIN]),
    validate(studentSchema),
    createStudent
);

router.put(
    "/update/:id",
    verifyToken,
    authorize([Role.ADMIN]),
    validate(studentSchema),
    updateStudent
);

router.delete(
    "/delete/:id",
    verifyToken,
    authorize([Role.ADMIN]),
    deleteStudent
);

export default router;
