import Navbar from "@/components/Navbar";
import { useUserInfo } from '@/hooks/api/useUserInfo';


function HomePage() {


  const { userInfo, fullName } = useUserInfo();
  console.table(userInfo);

  return (
    <div className="min-h-screen bg-teal-100 dark:bg-teal-700">
      <Navbar />
      <h1>HomePage</h1>
      {userInfo && <p>Welcome, {fullName}!</p>}
      <p>Your type is: {userInfo?.userType}</p>

    </div>
  );
}

export default HomePage;