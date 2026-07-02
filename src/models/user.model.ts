import { User } from "../types/auth.types";

export const users: User[] = [];

export const refreshTokens = new Map<string, string>();