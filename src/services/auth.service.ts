import { v4 as uuidv4 } from "uuid";

import { users, refreshTokens } from "../models/user.model";
import { RegisterRequest, LoginRequest } from "../types/auth.types";
import { hashPassword, comparePassword } from "../utils/hash";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../utils/jwt";
import jwt from "jsonwebtoken";

export class AuthService {
    async register(data: RegisterRequest) {
        const { email, password } = data;

        if (!email || !password) {
        throw new Error("Email and password are required");
    }

    if (email.trim() === "" || password.trim() === "") {
        throw new Error("Email and password cannot be empty");
    }

        const existingUser = users.find((user) => user.email === email);

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hashPassword(password);

        const newUser = {
            id: uuidv4(),
            email,
            password: hashedPassword,
            role: "user" as const,
        };

        users.push(newUser);

        console.log("Users:", users);

        return {
            message: "User registered successfully",
        };
    }

    async login(data: LoginRequest) {
        const { email, password } = data;

        if (!email || !password) {
    throw new Error("Email and password are required");
}

if (email.trim() === "" || password.trim() === "") {
    throw new Error("Email and password cannot be empty");
}

        const user = users.find((user) => user.email === email);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        console.log("Token Payload:");
        console.log(jwt.decode(accessToken));

        refreshTokens.set(user.id, refreshToken);

        return {
            message: "Login successful",
            accessToken,
            refreshToken,
        };
    }

    async refresh(token: string) {
        const payload = verifyRefreshToken(token);

        const storedToken = refreshTokens.get(payload.userId);

        if (!storedToken || storedToken !== token) {
            throw new Error("Invalid refresh token");
        }

        const newAccessToken = generateAccessToken(payload.userId);
        const newRefreshToken = generateRefreshToken(payload.userId);

        refreshTokens.set(payload.userId, newRefreshToken);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }

    async logout(userId: string) {
        refreshTokens.delete(userId);

        return {
            message: "Logged out successfully",
        };
    }

}
