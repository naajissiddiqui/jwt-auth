import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { users } from "../models/user.model";

const router = Router();

router.get("/", authenticate, (req, res) => {
    const user = users.find((u) => u.id === req.user?.userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    return res.json({
        success: true,
        data: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    });
});

export default router;