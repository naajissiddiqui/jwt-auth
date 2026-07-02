import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 5,

    message: {
        success: false,
        message: "try again after 15 minutes...",
    },

    standardHeaders: true,

    legacyHeaders: false,
});