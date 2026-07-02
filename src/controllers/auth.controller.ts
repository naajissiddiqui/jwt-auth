import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { successResponse, errorResponse } from "../utils/response";

const authService = new AuthService();

export class AuthController {

    async register(req: Request, res: Response) {
        try {
            const result = await authService.register(req.body);

            return successResponse(res, 201, result.message);
        } catch (error) {
            return errorResponse(
                res,
                400,
                error instanceof Error ? error.message : "Registration failed"
            );
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await authService.login(req.body);

            return successResponse(res, 200, result.message, {
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
            });
        } catch (error) {
            return errorResponse(
                res,
                401,
                error instanceof Error ? error.message : "Login failed"
            );
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;

            const result = await authService.refresh(refreshToken);

            return successResponse(
                res,
                200,
                "Token refreshed successfully",
                result
            );
        } catch (error) {
            return errorResponse(
                res,
                401,
                error instanceof Error ? error.message : "Refresh failed"
            );
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const userId = req.user!.userId;

            const result = await authService.logout(userId);

            return successResponse(res, 200, result.message);
        } catch (error) {
            return errorResponse(
                res,
                400,
                error instanceof Error ? error.message : "Logout failed"
            );
        }
    }

}
export const authController = new AuthController();