// src/features/auth/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth.api";
import type { LoginCredentials } from "../types";
import { persistAuth, clearAuth } from "../utils/auth.utils";

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
