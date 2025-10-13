import { useLogout } from "@/hooks/api/useAuth";
import Button from "@mui/material/Button";
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub?: string;
  userName?: string;
  userType?: string;
  given_name?: string;
  exp?: number;
}

function HomePage() {
  const logoutMutation = useLogout();
  const jwt_token = localStorage.getItem('token');
  
  // Decode token to get user info
  const getUserInfo = (): TokenPayload | null => {
    if (!jwt_token) return null;
    
    try {
      const decoded = jwtDecode<TokenPayload>(jwt_token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  }

  const userInfo = getUserInfo();
  console.table(userInfo);

  return (
    <div>
      <h1>HomePage</h1>
      {userInfo && <p>Welcome, {userInfo.given_name || userInfo.userName}!</p>}
      <p>Your type is: {userInfo?.userType}</p>
      <Button variant="contained" color="error" onClick={handleLogout}>
         Logout
      </Button>
    </div>
  );
}

export default HomePage;