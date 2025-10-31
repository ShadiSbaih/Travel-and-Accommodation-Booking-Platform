// src/features/auth/api/auth.api.ts
import api from "@/core/api/axios";
import type { LoginCredentials, AuthResponse } from "../types";

// call backend
export const loginRequest = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/authenticate", credentials);
  return data;
};


