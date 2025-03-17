import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { baseurl } from "../../../BaseUrl";
import { useSidebar } from "@/context/SidebarContext";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { FiMenu, FiCompass, FiList } from "react-icons/fi";
import {
  FiShield,
  FiGrid,
  FiLayers,
  FiSettings,
  FiTool,
  FiClipboard,
  FiSearch,
  FiUser,
  FiBookOpen,
  FiRefreshCw,
  FiCalendar,
  FiAlertTriangle,
  FiCheckCircle,
  FiClipboardCheck,
  FiAlertCircle,
  FiFile,
  FiTrendingUp,
  FiBook,
  FiDollarSign,
  FiBriefcase,
  FiGlobe,
  FiSun,
  FiThumbsUp,
  FiCpu,
  FiPlus,
  FiUsers,
  FiUserCheck,
  FiLock,
  FiDownload,
  FiCoffee,
  FiFlag,
  FiAlertOctagon,
  FiMail,
  FiFileText,
} from "react-icons/fi";

import { AiOutlineAudit } from "react-icons/ai";

const ClientDashboardMenu = [
  {
    id: uuid(),
    title: "Security / Compliance",
    icon: "FiShield",
    children: [
      {
        id: uuid(),
        link: "/contact/ContactUs",
        name: "Dashboard",
        icon: "FiGrid",
      },
      {
        id: uuid(),
        link: "/compliance/frameworks",
        name: "Framework",
        icon: "FiLayers",
      },
      {
        id: uuid(),
        link: "/contact/ContactUs",
        name: "Controls",
        icon: "FiSettings",
      },
      {
        id: uuid(),
        link: "/contact/ContactUs",
        name: "Evidence Task",
        icon: "FiClipboard",
      },
    ],
  },
  {
    id: uuid(),
    title: "Operations",
    icon: "FiTool",
    children: [
      {
        id: uuid(),
        link: "/operations/people-dashboard",
        name: "People",
        icon: "FiUser",
      },
      {
        id: uuid(),
        link: "/operations/policy",
        name: "Policy",
        icon: "FiFileText",
      },
      {
        id: uuid(),
        link: "/operations/procedure",
        name: "Procedure",
        icon: "FiClipboard",
      },
      {
        id: uuid(),
        link: "/operations/trainings",
        name: "Training",
        icon: "FiBookOpen",
      },
      {
        id: uuid(),
        link: "/finding-Management",
        name: "Finding Management",
        icon: "FiSearch",
      },
      {
        id: uuid(),
        link: "/contact/ContactUs",
        name: "Change Management",
        icon: "FiRefreshCw",
      },
      {
        id: uuid(),
        link: "/event-Management",
        name: "Event Management",
        icon: "FiCalendar",
      },
    
      {
        id: uuid(),
        name: "Incident Management",
        icon: "FiAlertTriangle",
        children: [
          {
            id: uuid(),
            name: "Incident Management Options",
            link: "/Incident-Management/",
            icon: "FiClipboard",
          },
          {
            id: uuid(),
            name: "NIS2",
            link: "/NIS2/Nis2",
            icon: "FiClipboardCheck",
          },
          {
            id: uuid(),
            name: "NIS2 Self Assesment",
            link: "/NIS2-self-assesment/Nis2",
            icon: "FiClipboardCheck",
          },
  
        ],
      },
    ],
  },

  {
    id: uuid(),
    title: "Test",
    icon: "FiClipboardCheck",
    children: [
      {
        id: uuid(),
        link: "/contact/ContactUs",
        name: "Test Of Design",
        icon: "FiCheckCircle",
      },
      {
        id: uuid(),
        link: "/contact/ContactUs",
        name: "Test of Effectiveness",
        icon: "FiShield",
      },
      {
        id: uuid(),
        link: "/contact/ContactUs",
        name: "Evidence Collection Task",
        icon: "FiClipboard",
      },
    ],
  },

  {
    id: uuid(),
    title: "Risk Management",
    icon: "FiAlertCircle",
    children: [
      {
        id: uuid(),
        link: "/risk-management/risk-assessment",
        name: "Risk Assessment",
        icon: "FiLayers",
      },
      {
        id: uuid(),
        link: "/risk-management/risk-assessment/cybersecurity",
        name: "Cybersecurity",
        icon: "FiShield",
      },
      {
        id: uuid(),
        link: "/risk-management/risk-assessment/project",
        name: "Project",
        icon: "FiFile",
      },
      {
        id: uuid(),
        link: "/risk-management/risk-assessment/contract",
        name: "Contract",
        icon: "FiFileText",
      },
      {
        id: uuid(),
        link: "/risk-management/risk-assessment/strategic",
        name: "Strategic",
        icon: "FiTrendingUp",
      },
      {
        id: uuid(),
        link: "/risk-management/risk-assessment/legal",
        name: "Legal",
        icon: "FiBook",
      },
      {
        id: uuid(),
        link: "/risk-management/risk-assessment/financial",
        name: "Financial",
        icon: "FiDollarSign",
      },
      {
        id: uuid(),
        link: "/risk-management/risk-assessment/operation",
        name: "Operation",
        icon: "FiBriefcase",
      },
      {
        id: uuid(),
        link: "/risk-management/risk-assessment/personal",
        name: "Personal",
        icon: "FiUser",
      },
      {
        id: uuid(),
        link: "/risk-management/risk-assessment/geopolitical",
        name: "Geopolitical",
        icon: "FiGlobe",
      },
      {
        id: uuid(),
        link: "/risk-management/risk-assessment/environmental",
        name: "Environmental",
        icon: "FiSun",
      },
      {
        id: uuid(),
        link: "/risk-management/add-new-menu",
        name: "Add New Menu",
        icon: "FiPlus",
      },
      {
        id: uuid(),
        link: "/risk-management/all-menu-list",
        name: "All Menu List",
        icon: "FiClipboard",
      },
    ],
  },

  {
    id: uuid(),
    title: "Vendor Trust",
    icon: "FiUsers",
    children: [
      {
        id: uuid(),
        link: "/vendor-trust/VendorDashboard",
        name: "Vendor Details",
        icon: "FiUsers",
      },
      {
        id: uuid(),
        link: "/vendor-trust/VendorQuestionnaire",
        name: "Vendor Questionnaire",
        icon: "FiCpu",
      },
      {
        id: uuid(),
        link: "/vendor-trust/VendorLogin",
        name: "Vendor Login ",
        icon: "FiShield",
      },
    ],
  },
  {
    id: uuid(),
    title: "Customer Trust",
    icon: "FiUserCheck",
    children: [
      {
        id: uuid(),
        link: "/client/ClientManagement",
        name: "Client Management",
        icon: "FiUsers",
      },
    ],
  },
  {
    id: uuid(),
    title: "Privacy",
    icon: "FiLock",
    children: [
      {
        id: uuid(),
        link: "/privacy/PrivacyPolicyData",
        name: "Privacy Policy",
        icon: "FiFileText",
      },
      {
        id: uuid(),
        link: "/privacy/right_management/CookiesDetail",
        name: "Cookies Policy",
        icon: "FiCoffee",
      },      {
        id: uuid(),
        link: "/privacy/ConsentBanner",
        name: "Consent Banner",
        icon: "FiFlag",
      },
      {
        id: uuid(),
        link: "/privacy/consentTracking",
        name: "Consent Tracking",
        icon: "FiShield",
      },
      {
        id: uuid(),
        link: "/privacy/right_management/RequestQueue",
        name: "Right Management",
        icon: "FiShield",
      },
      {
        id: uuid(),
        link: "/privacy/Scanner",
        name: "Scanner",
        icon: "FiSearch",
      },
      {
        id: uuid(),
        link: "/privacy/Install",
        name: "Install",
        icon: "FiDownload",
      }, 
      {
        id: uuid(),
        link: "/privacy/dpia",
        name: "DPIA",
        icon: "FiDownload",
      },
      {
        id: uuid(),
        link: "/privacy/appendix",
        name: "Appendix",
        icon: "FiBookOpen",
      },
    ],
  },
  {
    id: uuid(),
    title: "TISAX",
    icon: "FiShield",
    link: "/tisax",
    children: [
      {
        id: uuid(),
        link: "/tisax?vda_version=5.1",
        name: "5.1",
        icon: "FiLayers",
      },
      {
        id: uuid(),
        link: "/tisax?vda_version=6.0.3",
        name: "6.0.3",
        icon: "FiLayers",
      },
    ],
  },
  {
    id: uuid(),
    title: "TISAX AUDIT",
    icon: "AiOutlineAudit",
    link: "/tisax-audit/",
    children: [
      {
        id: uuid(),
        link: "/tisax-audit?vda_version=5.1",
        name: "5.1",
        icon: "FiLayers",
      },
      {
        id: uuid(),
        link: "/tisax-audit?vda_version=6.0.3",
        name: "6.0.3",
        icon: "FiLayers",
      },
    ],
  },
  {
    id: uuid(),
    title: "Industry",
    icon: "FiDollarSign",
    children: [
      {
        id: uuid(),
        link: "/banking-and-finance/Cra",
        name: "CRA",
        icon: "FiFileText",
      },
      {
        id: uuid(),
        link: "/banking-and-finance/Rbi",
        name: "RBI",
        icon: "FiFileText",
      },
      // { id: uuid(), link: "/NIS2/Nis2", name: "NIS2", icon: "FiFileText" },
    ],
  },
  {
    id: uuid(),
    title: "Malware / Ransomware",
    icon: "FiAlertOctagon",
    children: [],
  },
  {
    id: uuid(),
    title: "Assessment",
    icon: "FiClipboard",
    children: [],
  },
  {
    id: uuid(),
    title: "Contact Us",
    icon: "FiMail",
    link: "/contact/ContactUs",
  },
];

const AdminDashboardMenu = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: "FiUser",
    link: "/admin/AdminDashboard",
  },
  {
    id: uuid(),
    title: "Framework",
    icon: "FiCompass",
    link: "/admin/AdminFrameworks",
  },
  {
    id: uuid(),
    title: "Control",
    icon: "FiLayers",
    link: "/admin/AdminControl",
  },
];

const iconMap = {
  FiCompass: <FiCompass />,
  FiGrid: <FiGrid />,
  FiLayers: <FiLayers />,
  FiList: <FiList />,
  FiUser: <FiUser />,
  FiFileText: <FiFileText />,
  FiBookOpen: <FiBookOpen />,
  FiRefreshCw: <FiRefreshCw />,
  FiCalendar: <FiCalendar />,
  FiAlertTriangle: <FiAlertTriangle />,
  FiCheckCircle: <FiCheckCircle />,
  FiShield: <FiShield />,
  FiClipboard: <FiClipboard />,
  FiAlertCircle: <FiAlertCircle />,
  FiFile: <FiFile />,
  FiTrendingUp: <FiTrendingUp />,
  FiBook: <FiBook />,
  FiDollarSign: <FiDollarSign />,
  FiBriefcase: <FiBriefcase />,
  FiGlobe: <FiGlobe />,
  FiSun: <FiSun />,
  FiThumbsUp: <FiThumbsUp />,
  FiCpu: <FiCpu />,
  FiPlus: <FiPlus />,
  FiUsers: <FiUsers />,
  FiUserCheck: <FiUserCheck />,
  FiLock: <FiLock />,
  FiDownload: <FiDownload />,
  FiCoffee: <FiCoffee />,
  FiFlag: <FiFlag />,
  FiAlertOctagon: <FiAlertOctagon />,
  FiMail: <FiMail />,
  FiSettings: <FiSettings />,
  FiTool: <FiTool />,
  FiSearch: <FiSearch />,
  AiOutlineAudit: <AiOutlineAudit />,
};

const SideNavbar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const router = useRouter();
  const [userData, setUserData] = useState(null); // State to store user data
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [incidentDropdownOpen, setIncidentDropdownOpen] = useState(false);
  // Fetch user data from cookies
  useEffect(() => {
    const storedUserData = Cookies.get("user_data")
      ?.replace(/\\054/g, ",")
      .replace(/\\/g, "");
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      const response = await axios.get(`${baseurl}/apiv1/logout`, {
        withCredentials: true, // Send cookies with the request
      });
      if (response.status === 200) {
        Cookies.remove("user_data");
        setUserData(null);
        router.push("/login");
        toast.success("Signed out successfully.");
      }
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const toggleMenu = (menuId) => {
    setExpandedMenu((prevMenu) => (prevMenu === menuId ? null : menuId));
  };

  const toggleIncidentDropdown = () => {
    setIncidentDropdownOpen((prevState) => !prevState);
  };

  // Extract user initials
  const initials = userData?.user_designation?.charAt(0)?.toUpperCase() || "?";
  const profileImg = userData?.profile_img;
  const currentMenu = ClientDashboardMenu;

  return (
    <div
      className={`bg-[#050038] text-white h-screen ${
        isOpen ? "w-1/5" : "w-16"
      } flex flex-col font-semibold transition-all duration-300`}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between h-20 px-4 border-b border-gray-700">
        {isOpen && <FiSettings size={24} className="text-white" />}
        <button onClick={toggleSidebar} className="text-white">
          <FiMenu size={24} />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow overflow-y-auto px-4 py-6 space-y-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-[#1E335A]">
        {currentMenu.map((menu) => (
          <div key={menu.id}>
            <div
              onClick={() => toggleMenu(menu.id)}
              className="flex items-center justify-between p-2 hover:bg-[#1E335A] rounded-md cursor-pointer"
            >
              <div className="flex items-center">
                <div className="font-semibold text-lg">
                  {iconMap[menu.icon] || <FiGrid />}
                </div>
                {isOpen && <span className="ml-3">{menu.title}</span>}
              </div>
              {menu.children && isOpen && (
                <span>
                  {expandedMenu === menu.id ? (
                    <FiChevronDown />
                  ) : (
                    <FiChevronRight />
                  )}
                </span>
              )}
            </div>

            {/* Render children if they exist and the menu is expanded */}
            {menu.children && expandedMenu === menu.id && (
              <div className={`pl-6 space-y-1 ${isOpen ? "" : "hidden"}`}>
                {menu.children.map((child) => (
                  <div key={child.id}>
                    {child.name === "Incident Management" ? (
                      <>
                        <div
                          onClick={toggleIncidentDropdown}
                          className="flex items-center justify-between p-2 hover:bg-[#1E335A] rounded-md cursor-pointer"
                        >
                          <div className="flex items-center">
                            {iconMap[child.icon] || <FiGrid />}
                            {isOpen && (
                              <span className="ml-3">{child.name}</span>
                            )}
                          </div>
                          <span>
                            {incidentDropdownOpen ? (
                              <FiChevronDown />
                            ) : (
                              <FiChevronRight />
                            )}
                          </span>
                        </div>
                        {incidentDropdownOpen && (
                          <div className="pl-6">
                            {child.children.map((nestedChild) => (
                              <Link
                                href={nestedChild.link}
                                key={nestedChild.id}
                                passHref
                              >
                                <div className="flex items-center p-2 hover:bg-[#1E335A] rounded-md cursor-pointer">
                                  {iconMap[nestedChild.icon] || <FiGrid />}
                                  {isOpen && (
                                    <span className="ml-3">
                                      {nestedChild.name}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link href={child.link} passHref>
                        <div className="flex items-center p-2 hover:bg-[#1E335A] rounded-md cursor-pointer">
                          {iconMap[child.icon] || <FiGrid />}
                          {isOpen && <span className="ml-3">{child.name}</span>}
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User profile section */}
      <div className="flex items-center justify-between p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          {/* Profile Image or Initials */}
          {profileImg ? (
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-500 overflow-hidden">
              <Image
                src={profileImg}
                alt="User Profile"
                objectFit="cover" // Ensures the image scales correctly
                width={50}
                height={50}
              />
            </div>
          ) : (
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-lg font-bold text-white">
              {initials}
            </div>
          )}

          {/* User Info */}
          {isOpen && (
            <div>
              <p className="text-sm font-medium">
                Hi, {userData?.user_name || "User"}
              </p>
              <p className="text-xs text-gray-400">
                {userData?.user_designation || "User"}
              </p>
            </div>
          )}
        </div>

        {/* Sign Out Button */}
        {isOpen && (
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-400 hover:text-white"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
