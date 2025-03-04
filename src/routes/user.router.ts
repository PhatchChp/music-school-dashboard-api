import { Router } from "express";
import {
    createUser,
    deleteUser,
    getAllUser,
    updateUser,
    checkUserExists,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { userExistsSchema, userSchema } from "../validations/userSchema";
import { verifyToken } from "../middlewares/verifyToken";
import { authorize } from "../middlewares/authorize";
import { Role } from "../config/constants";

const router = Router();

router.get("/", verifyToken, authorize([Role.ADMIN]), getAllUser);
router.post(
    "/create",
    verifyToken,
    authorize([Role.ADMIN]),
    validate(userSchema),
    createUser
);
router.put(
    "/update/:id",
    verifyToken,
    authorize([Role.ADMIN]),
    validate(userSchema),
    updateUser
);
router.delete("/delete/:id", verifyToken, authorize([Role.ADMIN]), deleteUser);
router.post(
    "/check",
    verifyToken,
    authorize([Role.ADMIN]),
    validate(userExistsSchema),
    checkUserExists
);

export default router;
