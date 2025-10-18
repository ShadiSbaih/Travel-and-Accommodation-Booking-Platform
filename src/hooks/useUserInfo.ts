import { jwtDecode } from 'jwt-decode';
import type { TokenPayload } from '@/types/api/auth.types';

export function useUserInfo() {

  const getUserInfo = (): TokenPayload | null => {
    const jwt_token = localStorage.getItem('token');
    
    if (!jwt_token) return null;
    
    try {
      const decoded = jwtDecode<TokenPayload>(jwt_token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const userInfo = getUserInfo();
  
  return {
    userInfo,
    isAuthenticated: !!userInfo,
    firstName: userInfo?.given_name,
    lastName: userInfo?.family_name,
    fullName: userInfo ? `${userInfo.given_name} ${userInfo.family_name}` : undefined,
    userType: userInfo?.userType,
    userId: userInfo?.user_id,
  };
}