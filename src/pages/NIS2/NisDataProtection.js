import React, { useEffect, useState } from "react";
import { ShieldCheck, Plus } from "lucide-react";
import { useRouter } from "next/router";
import axios from "axios";
import { baseurl, initURL } from "../../../BaseUrl";
import { toast } from "react-toastify";

const NisDataProtection = () => {
  const router = useRouter();
  const [user, setcompanyId] = useState(null); // Add state to store user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [policies, setPolicies] = useState([
    {
      policyName: "Incident Management Policy",
      nameVersion: "",
      date: "",
      approvedBy: "",
      title: "",
    },
    {
      policyName: "User Access Management Policy",
      nameVersion: "",
      date: "",
      approvedBy: "",
      title: "",
    },
    {
      policyName: "Data Protection Policy",
      nameVersion: "",
      date: "",
      approvedBy: "",
      title: "",
    },
    {
      policyName: "Asset Management Policy",
      nameVersion: "",
      date: "",
      approvedBy: "",
      title: "",
    },
    {
      policyName: "Policy Name",
      nameVersion: "",
      date: "",
      approvedBy: "",
      title: "",
    },
  ]);

  useEffect(() => {
    if (router.isReady) {
      // console.log("Router query:", router.query); // Log the entire query object
      // console.log("CompanyId:", router.query.user); // Log user specifically
      setcompanyId(router.query.user);
      setLoading(false);
    }
  }, [router.isReady, router.query.user]);

  const handleSubmit = async () => {
    console.log("user before submission:", user); // Check user before submitting
    try {
      const response = await axios.post(
        `${baseurl}/${initURL}/nis2/create-data-protection`,
        {
          user: user,
          policies,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Data protection policies saved successfully!");
    } catch (error) {
      // console.error("Error saving data protection policies:", error);
      toast.error("Failed to save data protection policies");
    }
  };

  const handleInputChange = (index, field, value) => {
    setPolicies((prevPolicies) =>
      prevPolicies.map((policy, i) =>
        i === index ? { ...policy, [field]: value } : policy
      )
    );
  };

  // Add new policy row
  const addNewPolicy = () => {
    setPolicies((prevPolicies) => [
      ...prevPolicies,
      {
        policyName: "",
        nameVersion: "",
        date: "",
        approvedBy: "",
        title: "",
      },
    ]);
  };

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <div className="bg-red-50 p-4 rounded-lg text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ShieldCheck className="text-blue-600 mr-3" size={24} />
          <div>
            <h3 className="text-2xl font-semibold text-blue-900">
              Data Protection and Security
            </h3>
            <p className="text-sm text-gray-600">
              Protect data integrity, availability, and confidentiality
            </p>
          </div>
        </div>
      </div>

      {/* Headers */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Policy Name
          </label>
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Name & Version
          </label>
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-700">Date</label>
        </div>
        <div className="col-span-3">
          <label className="text-sm font-medium text-gray-700">
            Approved By
          </label>
        </div>
        <div className="col-span-3">
          <label className="text-sm font-medium text-gray-700">Title</label>
        </div>
      </div>

      {/* Policy Rows */}
      <div className="space-y-4">
        {policies.map((policy, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2">
              <input
                type="text"
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition"
                placeholder="Policy Name"
                value={policy.policyName}
                onChange={(e) =>
                  handleInputChange(index, "policyName", e.target.value)
                }
              />
            </div>
            <div className="col-span-2">
              <input
                type="text"
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition"
                placeholder="Name & Version"
                value={policy.nameVersion}
                onChange={(e) =>
                  handleInputChange(index, "nameVersion", e.target.value)
                }
              />
            </div>
            <div className="col-span-2">
              <input
                type="date"
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition"
                value={policy.date}
                onChange={(e) =>
                  handleInputChange(index, "date", e.target.value)
                }
              />
            </div>
            <div className="col-span-3">
              <input
                type="text"
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition"
                placeholder="Approved By"
                value={policy.approvedBy}
                onChange={(e) =>
                  handleInputChange(index, "approvedBy", e.target.value)
                }
              />
            </div>
            <div className="col-span-3">
              <input
                type="text"
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition"
                placeholder="Title"
                value={policy.title}
                onChange={(e) =>
                  handleInputChange(index, "title", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add New Policy Button */}
      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={addNewPolicy}
          className="flex items-center text-blue-600 hover:text-blue-700 transition"
        >
          <Plus size={18} className="mr-2" />
          Add New Policy
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-900 transition"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default NisDataProtection;
