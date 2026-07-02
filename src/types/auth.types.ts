export interface User {
    id: string;
    email: string;
    password: string;
    role: "user" | "admin";
}

export interface JwtPayload {
    userId: string;
    iat?: number;
    exp?: number;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}