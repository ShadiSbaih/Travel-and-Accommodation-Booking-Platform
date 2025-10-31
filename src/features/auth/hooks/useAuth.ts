// src/features/auth/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth.api";
import type { LoginCredentials, AuthResponse } from "../types";

const AUTH_TOKEN_KEY = "token";
const AUTH_USER_KEY = "user";

const persistAuth = (data: AuthResponse) => {
  localStorage.setItem(AUTH_TOKEN_KEY, data.authentication);
  localStorage.setItem(
    AUTH_USER_KEY,
    JSON.stringify({ role: data.userType.toLowerCase() })
  );
};

const clearAuth = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginRequest(credentials),
    onSuccess: (data) => {
      // 1) save
      persistAuth(data);

      // 2) route by role
      if (data.userType === "Admin") {
        navigate("/admin/hotels");
      } else {
        navigate("/home");
      }
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      clearAuth();
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
};
