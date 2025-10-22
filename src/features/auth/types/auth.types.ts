export interface TokenPayload {
  user_id: string;
  given_name: string;
  family_name: string;
  userType: string;
  nbf: number; // Not Before timestamp
  exp: number; // Expiration timestamp
  iss: string; // Issuer
}

export interface LoginCredentials {
  userName: string;
  password: string;
}

export interface AuthResponse {
  authentication: string;
  userType: 'Admin' | 'User';
}