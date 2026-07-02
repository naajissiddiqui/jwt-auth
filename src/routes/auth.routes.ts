import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { loginLimiter } from "../middleware/rateLimit.middleware";

const router = Router();

router.post("/register", authController.register);

router.post("/login", loginLimiter, authController.login);

router.post("/refresh", authController.refresh);

router.post("/logout", authenticate, authController.logout);

export default router;