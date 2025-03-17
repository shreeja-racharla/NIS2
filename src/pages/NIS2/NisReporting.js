import React, { useEffect, useState } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";
import axios from "axios";
import { baseurl, initURL } from "../../../BaseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const NisReporting = ({ sid, cid }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userdata = Cookies.get("user_data");
    const userparse = userdata && JSON.parse(userdata);
    if (userparse) {
      setUser(userparse);
    }
  }, []);

  const [formData, setFormData] = useState({
    user: user.id,
    govtAgencyName: "",
    firstName: "",
    lastName: "",
    emailId: "",
    agencyContactNumber: "77777777777",
    reportSubmitDate: "",
    reportSubmitTime: "",
    escalateTo: "",
    reportSubmitted24Hours: "No",
  });

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error on change
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.govtAgencyName) newErrors.govtAgencyName = "Required";
    if (!formData.firstName) newErrors.firstName = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";
    if (!formData.emailId) newErrors.emailId = "Required";
    if (!formData.reportSubmitDate) newErrors.reportSubmitDate = "Required";
    if (!formData.reportSubmitTime) newErrors.reportSubmitTime = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${baseurl}/${initURL}/nis2/create-report`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Report submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit report");
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="border rounded-lg shadow-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-t-lg transition-colors"
        >
          <div className="flex items-center space-x-3">
            <AlertCircle className="text-blue-600 mr-3" size={24} />
            <h2 className="text-xl font-bold text-blue-900">
              Incident Report - NIS 2 Submission
            </h2>
          </div>
          <ChevronDown
            className={`w-5 h-5 transform transition-transform duration-200 text-blue-900 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`transition-all duration-200 ease-in-out ${
            isOpen
              ? "max-h-[2000px] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="govtAgencyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <span className="text-red-500 mr-1">*</span> Submit Report
                    To
                  </label>
                  <input
                    id="govtAgencyName"
                    name="govtAgencyName"
                    placeholder="Govt Agency Name"
                    value={formData.govtAgencyName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.govtAgencyName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.govtAgencyName && (
                    <p className="text-red-500 text-sm">
                      {errors.govtAgencyName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <span className="text-red-500 mr-1">*</span> Submit To
                  </label>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-2">
                      <input
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <input
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="emailId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Submit Report to Contact
                  </label>
                  <input
                    id="emailId"
                    name="emailId"
                    type="email"
                    placeholder="Email ID"
                    value={formData.emailId}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.emailId ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.emailId && (
                    <p className="text-red-500 text-sm">{errors.emailId}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="reportSubmitDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <span className="text-red-500 mr-1">*</span> Report Submit
                    Date
                  </label>
                  <input
                    id="reportSubmitDate"
                    name="reportSubmitDate"
                    type="date"
                    value={formData.reportSubmitDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.reportSubmitDate
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.reportSubmitDate && (
                    <p className="text-red-500 text-sm">
                      {errors.reportSubmitDate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="reportSubmitTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <span className="text-red-500 mr-1">*</span> Report Submit
                    Time
                  </label>
                  <input
                    id="reportSubmitTime"
                    name="reportSubmitTime"
                    type="time"
                    value={formData.reportSubmitTime}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.reportSubmitTime
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.reportSubmitTime && (
                    <p className="text-red-500 text-sm">
                      {errors.reportSubmitTime}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Report Submitted in 24 Hours
                  </label>
                  <select
                    name="reportSubmitted24Hours"
                    value={formData.reportSubmitted24Hours}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No - Escalate">No - Escalate</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="escalateTo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Escalate To
                  </label>
                  <input
                    id="escalateTo"
                    name="escalateTo"
                    placeholder="Name"
                    value={formData.escalateTo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NisReporting;
