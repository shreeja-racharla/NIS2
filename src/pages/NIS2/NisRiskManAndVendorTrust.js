import React, { useState } from "react";
import { ChevronDown, ChevronUp, ShieldCheck, Users } from "lucide-react";

const NisRiskManAndVendorTrust = () => {
  const [isOpen, setIsOpen] = useState({
    riskManagement: true,
    vendorTrust: false,
  });

  const toggleSection = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const SectionHeader = ({ title, description, icon: Icon, isOpen, onClick }) => (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-blue-50 border-b cursor-pointer hover:bg-blue-100 transition-all"
    >
      <div className="flex items-center">
        <Icon className="text-blue-600 mr-3" size={24} />
        <div>
          <h3 className="text-xl font-semibold text-blue-900">{title}</h3>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      </div>
      {isOpen ? (
        <ChevronUp className="text-blue-900" size={24} />
      ) : (
        <ChevronDown className="text-blue-900" size={24} />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <SectionHeader
          title="Risk Management"
          description="Implement measures to prevent and mitigate cybersecurity incidents"
          icon={ShieldCheck}
          isOpen={isOpen.riskManagement}
          onClick={() => toggleSection("riskManagement")}
        />
        {isOpen.riskManagement && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Risk Management Policy
                </label>
                <input
                  type="text"
                  className="px-3 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-colors duration-150"
                  placeholder="Name & Version"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Approval Date
                </label>
                <input
                  type="date"
                  className="px-3 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-colors duration-150"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Approved By
                </label>
                <input
                  type="text"
                  className="px-3 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-colors duration-150"
                  placeholder="Enter approver's name"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="px-3 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-colors duration-150"
                  placeholder="Enter title"
                />
              </div>
            </div>
            <div className="mt-14 flex justify-center">
              <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition">
                Go To the RISK ASSESSMENT Module
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <SectionHeader
          title="Vendor Trust"
          icon={Users}
          isOpen={isOpen.vendorTrust}
          onClick={() => toggleSection("vendorTrust")}
        />
        {isOpen.vendorTrust && (
          <div className="p-6">
            <div className="mt-8 flex justify-center">
              <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition">
                Go To the Vendor Trust Module
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NisRiskManAndVendorTrust;
