import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { authorize } from "../middlewares/authorize";
import { validate } from "../middlewares/validate";
import {
    createStudent,
    getAllStudent,
} from "../controllers/student.controller";
import { studentSchema } from "../validations/studentSchema";

const router = Router();

router.get("/", verifyToken, authorize(["ADMIN"]), getAllStudent);

router.post(
    "/create",
    verifyToken,
    authorize(["ADMIN"]),
    validate(studentSchema),
    createStudent
);

export default router;
