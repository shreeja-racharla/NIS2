import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function DynamicTabsWithRouter({ tabItems, reportModalComponent }) {
  const router = useRouter();
  const { vda_type = "", assessment_level = "" } = router.query;

  // Filter tabs based on assessment level
  const filteredTabs =
    assessment_level === "AL2"
      ? tabItems.filter((tab) => tab.label !== "Prototype Protection")
      : tabItems;

  const [activeTab, setActiveTab] = useState(() => filteredTabs?.[0]?.component || null);

  // Update the default tab when filteredTabs change
  useEffect(() => {
    if (filteredTabs.length > 0 && !activeTab) {
      setActiveTab(filteredTabs[0].component);
    }
  }, [filteredTabs, activeTab]);

  const handleNavSelect = (component) => {
    setActiveTab(() => component);
  };

  const ActiveComponent = activeTab;

  if (!router.isReady) {
    return <p>Loading...</p>; // Loading state while waiting for router data
  }

  return (
    <div className="p-6 bg-[#F4F4F9] min-h-screen">
      <div className="flex justify-end items-end mb-6">
        {vda_type ? (
          reportModalComponent || <p></p>
        ) : (
          <button className="bg-blue-600 text-white px-6 py-2 rounded shadow-md text-sm hover:bg-blue-700 transition duration-300">
            Save all
          </button>
        )}
      </div>

      <div className="border rounded-lg shadow-md bg-white">
        {/* Tab Navigation */}
        <div className="border-b p-2 bg-gray-100">
          <div className="flex justify-center md:justify-start space-x-4">
            {filteredTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => handleNavSelect(tab.component)}
                className={`relative py-2 px-4 text-md font-semibold transition duration-300 ${
                  activeTab === tab.component
                    ? "text-blue-600 font-bold"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.component && (
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {ActiveComponent ? <ActiveComponent key={ActiveComponent.name} /> : <p>No component selected</p>}
        </div>
      </div>
    </div>
  );
}

export default DynamicTabsWithRouter;
