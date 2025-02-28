import { Router } from "express";
import { createUser, getAllUser } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { userSchema } from "../validations/user.validation";
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

export default router;
