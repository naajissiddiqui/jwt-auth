import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { JwtPayload } from "../types/auth.types";

export const generateAccessToken = (userId: string): string => {
    return jwt.sign(
        { userId },
        env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
    );
};

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign(
        { userId },
        env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as JwtPayload;
};