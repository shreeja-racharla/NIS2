import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SideNavbar from "@/globalcomponents/layouts/SideNavbar";
import 'tailwindcss/tailwind.css';
import Cookies from 'js-cookie';
 
function DefaultDashboard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const isExcludedPage = ["/login", "/", "/vendor-trust/VendorLogin" ,"vendor-trust/VendorPass" ,"/vendor-trust/VendorResponseInput ,"].includes(router.pathname); // Exclude sidebar on login and home pages
 
  // useEffect(() => {
  //   const userData = Cookies.get('user_data');
  //   if (userData) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);
 
  return (
    <div className="flex w-full h-screen transition-transform">
      {/* Conditionally render the Sidebar only if not on the login page */}
      {!isExcludedPage && <SideNavbar />}
 
      {/* Main content */}
      <div className="w-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
 
export default DefaultDashboard;