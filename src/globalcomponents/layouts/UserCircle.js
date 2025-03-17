import { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const UserCircle = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUserData = Cookies.get("user_data") ? JSON.parse(Cookies.get("user_data")) : null;
    setUserData(storedUserData);
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await axios.get("http://34.235.207.221/apiv1/logout");
      if (response.status === 200) {
        router.push("/authentication/sign-in");
        Cookies.remove("user_data");
        setUserData(null);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const initials = userData?.firstname ? userData.firstname.charAt(0).toUpperCase() : "";

  return (
    <div className="relative">
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer"
      >
        {initials}
      </div>
      
      {showDropdown && (
        <div className="absolute top-12 right-0 w-32 bg-white shadow-md rounded-md py-2 text-gray-700">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-100"
          >
            <FiLogOut className="text-blue-600" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCircle;
