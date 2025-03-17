import React, { useEffect, useState } from "react";
import NisRiskManAndVendorTrust from "./NisRiskManAndVendorTrust";
import NisDataProtection from "./NisDataProtection";
import NisIncidentReporting from "./NisIncidentReporting";
import NisReporting from "./NisReporting";
import NisGovernance from "./NisGovernance";
import NisCorporateDetails from "./NisCorporateDetails";
import axios from "axios";
import { baseurl, initURL } from "../../../BaseUrl";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NisDashboard from "./NisDashboard";

const Nis2 = () => {
  const [activeTab, setActiveTab] = useState("Nis Dashboard");
  const [user, setUser] = useState({});
  const [company, setCompany] = useState("");
  const [sequence, setSequence] = useState("");
  const [loading, setLoading] = useState(true);
  const [preSubmited, setPreSubmited] = useState([]);
  const router = useRouter();
  const { cid: urlCompanyId, sid: urlSequenceId } = router.query; // Extract `cid` from the URL query
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const setnewCompanyid = (data) => {
    setCompany(data);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, cid: data },
    });
  };

  // use cookies to get user data and passed as props
  useEffect(() => {
    const users = Cookies.get("user_data");

    const userparse = users && JSON.parse(users);
    if (!users || !userparse?.user_uuid) {
      router.push("/");
      return;
    }
    if (userparse) {
      return setUser(userparse);
    }
  }, []);

  // use user data get from cookies to get company data and passed as props
  useEffect(() => {
    const fetchCompanyId = async () => {
      if (!router.isReady || !user) return; // Wait for the router to be ready

      if (!user || !user.user_uuid) {
        return;
      }
      try {
        const response = await axios.get(
          `${baseurl}/${initURL}/nis2/get-company-detail-by-id?user=${user.user_uuid}`
        );
        // console.log("company id", response.data);
        // console.log(
        //   "company id query",
        //   urlCompanyId,
        //   urlSequenceId,
        //   router.query
        // );
        // If `cid` exists in the URL, validate it against the backend data
        if (urlCompanyId) {
          if (urlCompanyId !== response.data._id) {
            return (
              router.push({
                pathname: router.pathname,
                query: { ...router.query, cid: response.data._id },
              }),
              setCompany(response.data._id),
              setLoading(false)
            );
          }
        }
        // If no `cid` in the URL, add it
        setCompany(response.data._id);
        setLoading(false);
        // Push the company ID (cid) to the URL (Query parameter)
        router.push({
          pathname: router.pathname,
          query: { ...router.query, cid: response.data._id },
        });
        return response;
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Error fetching company data"
        );
        setLoading(false);
      }
    };
    fetchCompanyId();
  }, [router.isReady, user]);

  const setnewSequenceid = (data) => {
    setSequence(data);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sid: data },
    });
  };

  useEffect(() => {
    if (!router.isReady) return; // Wait for the router to be ready

    if (urlSequenceId) {
      // router.push({
      //   pathname: router.pathname,
      //   query: { ...router.query, cid: response.data._id },
      // }),

      return setSequence(urlSequenceId);
    }
  }, [router.isReady]);

  useEffect(() => {
    const fetchFormCompletion = async () => {
      if (!router.isReady || !company || !urlCompanyId || !user) return; // Wait for the router to be ready
      try {
        // Prepare query string with only the existing values
        const queryParams = new URLSearchParams();
        if (user) queryParams.append("user", user.user_uuid);
        if (company) queryParams.append("companyId", company);
        if (sequence) queryParams.append("sequenceId", sequence);

        // Define the API endpoint
        const endpoint = `${baseurl}/${initURL}/nis2/validate-completion?${queryParams.toString()}`;

        // Make the GET request using Axios
        const response = await axios.get(endpoint);
        // console.log("response", response);
        // Handle the response
        if (response?.data) {
          if (response.data?.data.isCompleted == true) {
            // Get the current URL query parameters
            const { pathname, query } = router; // // Remove `sid` from the query parameters
            delete query.sid;
            // // Update the URL without reloading the page
            urlSequenceId &&
              router.replace({ pathname, query }, undefined, {
                shallow: true,
              });
            setSequence("");
            return setLoading(false);
          }
          if (response.data?.data.corporateDetailId == null) {
            handleTabChange("Corporate Details");
          } else if (response.data?.data.governanceId == null) {
            handleTabChange("Governance");
            setPreSubmited((prev) => [
              ...new Set([...prev, "Corporate Details"]),
            ]);
          } else if (response.data?.data.incidentReportId == null) {
            handleTabChange("Incident Reporting");
            setPreSubmited((prev) => [
              ...new Set([...prev, "Governance", "Corporate Details"]),
            ]);
          }
          // Add new query parameter
          router.push({
            pathname: router.pathname,
            query: { ...router.query, sid: response.data?.data._id },
          });
          setSequence(response.data?.data._id);
          // console.log(preSubmited);

          return setLoading(false);
        } else {
          toast.error("Unexpected response from the server.");
        }
      } catch (err) {
        // Get the current URL query parameters
        const { pathname, query } = router;

        // // Remove `sid` from the query parameters
        delete query.sid;
        if (err.response?.data?.status == 404) {
          urlSequenceId &&
            router.replace({ pathname, query }, undefined, { shallow: true });
        }
        setLoading(false);
        // Handle errors

        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch data. Please try again later."
        );
      }
    };

    // Call the function only if at least one parameter exists
    fetchFormCompletion();
  }, [router.isReady, user, urlCompanyId, company]); // Re-run when these dependencies change

  const deleteSequenceid = async () => {
    setLoading(true);
    if (!user || !company || !sequence) {
      setLoading(false);
      return toast.error("Try Again");
    }

    try {
      const response = await axios.delete(
        `${baseurl}/${initURL}/nis2/delete-formgroup?user=${user.user_uuid}&companyId=${company}&sequenceId=${sequence}`
      );
      if (response && response.data?.statusCode == 200) {
        // Get the current URL query parameters
        const { pathname, query } = router;

        // // Remove `sid` from the query parameters
        delete query.sid;
        urlSequenceId &&
          router.replace({ pathname, query }, undefined, { shallow: true });

        setPreSubmited([]);
        setActiveTab("Nis Dashboard");
        return setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch data. Please try again later."
      );
    }
  };
  const tabs = [
    {
      id: "Nis Dashboard",
      label: "Nis Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
          <path d="M9 9h6v6H9z"></path>
        </svg>
      ),
      component: (
        <NisDashboard
          userdata={user}
          companydata={company}
          sequencedata={sequence}
          setsid={setnewSequenceid}
          setcid={setnewCompanyid}
          deleteseq={() => deleteSequenceid()}
          preSubmited={preSubmited}
          isActive={activeTab === "Nis Dashboard"}
        />
      ),
    },
    {
      id: "Corporate Details",
      label: "Corporate Details",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      component: user ? (
        <NisCorporateDetails
          userdata={user || {}}
          companydata={company || ""}
          setsid={setnewSequenceid}
          setcid={setnewCompanyid}
          preSubmited={preSubmited || []}
          isActive={activeTab === "Corporate Details"}
        />
      ) : (
        ""
      ),
    },
    {
      id: "Governance",
      label: "Governance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
      component: (
        <NisGovernance
          userdata={user}
          companydata={company}
          sequencedata={sequence}
          preSubmited={preSubmited}
          isActive={activeTab === "importaccount"}
          onScheduleAudit={() => handleTabChange("reviewaccount")}
        />
      ),
    },

    {
      id: "Incident Reporting",
      label: "Incident Reporting",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      component: (
        <NisIncidentReporting
          userdata={user}
          companydata={company}
          sequencedata={sequence}
          preSubmited={() => setPreSubmited([])}
          isActive={activeTab === "reviewauditcomments"}
        />
      ),
    },

    {
      id: "NIS2 Reporting",
      label: "NIS2 Reporting",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
      component: (
        <NisReporting
          isActive={activeTab === "RbiReview"}
          onScheduleAudit={() => handleTabChange("reviewaccount")}
        />
      ),
    },
    {
      id: "Risk Management & Vendor Trust",
      label: "Risk Management & Vendor Trust",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      component: (
        <NisRiskManAndVendorTrust
          isActive={activeTab === "RbiAccountSummary"}
          onScheduleAudit={() => handleTabChange("reviewaccount")}
        />
      ),
    },
    {
      id: "Data Protection",
      label: "Data Protection",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      component: (
        <NisDataProtection
          isActive={activeTab === "RbiReview"}
          onScheduleAudit={() => handleTabChange("reviewaccount")}
        />
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f1f5f9]">
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}

      <div className="mx-auto p-6">
        <div className="bg-[#f1f5f9] rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium
                  transition-all duration-200 border-r border-gray-200
                  ${
                    activeTab === tab.id
                      ? "text-blue-600 bg-white border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }
                `}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-200" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`
                transition-all duration-200 transform
                ${
                  activeTab === tab.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 hidden"
                }
              `}
              >
                {!loading ? (
                  preSubmited.length > 0 &&
                  !preSubmited.includes("skip") &&
                  activeTab !== "Nis Dashboard" ? (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                      <span className="text-lg font-medium text-gray-800 mb-4">
                        You have left an incident report incomplete.
                      </span>
                      <div className=" p-4 rounded-md flex space-x-4">
                        <button
                          className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                          onClick={deleteSequenceid}
                        >
                          Delete and continue with new
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                          onClick={() =>
                            setPreSubmited((prev) => [...prev, "skip"])
                          }
                        >
                          Continue with this
                        </button>
                      </div>
                    </div>
                  ) : (
                    tab.component
                  )
                ) : (
                  <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nis2;
