import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '@/api/axios';

interface LoginCredentials {
  userName: string;
  password: string;
}

interface AuthResponse {
  authentication: string;
  userType: 'Admin' | 'User';
}

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      const { data } = await api.post('/auth/authenticate', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.authentication);
      localStorage.setItem('user', JSON.stringify({ role: data.userType.toLowerCase() }));

      if (data.userType === 'Admin') {
        navigate('/admin/hotels');
      } else {
        navigate('/home');
      }
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // Call logout endpoint if you have one
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    onSuccess: () => {
      navigate('/login');
    },
  });
};