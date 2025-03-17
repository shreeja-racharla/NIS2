import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  User,
  Shield,
  Globe,
} from "lucide-react";
import { baseurl, initURL } from "../../../BaseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const NisGovernance = ({
  companydata,
  sequencedata,
  userdata,
  preSubmited,
}) => {
  const [user, setUser] = useState(userdata);
  const [submited, setSubmited] = useState(false);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState({
    seniorManagement: true,
    incidentTeam: false,
    externalAuthorities: false,
  });

  const toggleSection = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

 const [seniorManagement, setSeniorManagement] = useState([
   {
     title: "Chief Executive Officer (CEO)",
     name: "Michael Brown",
     location: "Amsterdam, Netherlands",
     contactNumber: "+31 20 123 4567",
     emailId: "michael.brown@einnosec.com",
     responsibility: "Oversee overall business strategy and operations",
     address: "Keizersgracht 123, 1015 CJ Amsterdam",
   },
 ]);


 const [incidentTeam, setIncidentTeam] = useState([
   {
     title: "Incident Response Lead",
     name: "David Green",
     location: "London, UK",
     contactNumber: "+44 20 7984 5678",
     emailId: "david.green@einnosec.com",
     responsibility: "Manage and coordinate cybersecurity incident responses",
     address: "10 Downing Street, London",
   },
 ]);

 const [externalAuthorities, setExternalAuthorities] = useState([
   {
     title: "National Reporting Coordinator",
     name: "Anna Parker",
     location: "Rome, Italy",
     contactNumber: "+39 06 123 4567",
     emailId: "anna.parker@einnosec.com",
     responsibility:
       "Ensure timely reporting of incidents to national authorities",
     address: "Via Nazionale 150, Rome",
   },
 ]);


  const [errors, setErrors] = useState({});

  const handleFieldChange = (setSectionData, index, field, value) => {
    setSectionData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][field] = value;
      return updatedData;
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${field}-${index}`]: "", // Clear specific error when typing
    }));
  };

  const addNewRow = (setSectionData) => {
    setSectionData((prevData) => [
      ...prevData,
      {
        title: "",
        name: "",
        location: "",
        contactNumber: "",
        emailId: "",
        responsibility: "",
        address: "",
      },
    ]);
  };

  const validateForm = () => {
    const newErrors = {};

    const validateRows = (data, prefix) => {
      data.forEach((row, index) => {
        Object.entries(row).forEach(([field, value]) => {
          // Check if the field is empty
          if (!value.trim()) {
            newErrors[`${prefix}-${field}-${index}`] = `${field} is required`;
          }
          // Specific validation for email format
          if (field === "emailId" && value && !/\S+@\S+\.\S+/.test(value)) {
            newErrors[`${prefix}-${field}-${index}`] = "Invalid email format";
          }
          // Specific validation for contact number format
          if (
            field === "contactNumber" &&
            value &&
            !/^\d{10,20}$/.test(value)
          ) {
            newErrors[`${prefix}-${field}-${index}`] =
              "Contact number should be 10-20 digits";
          }
        });
      });
    };

    validateRows(seniorManagement, "seniorManagement");
    validateRows(incidentTeam, "incidentTeam");
    validateRows(externalAuthorities, "externalAuthorities");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const formData = {
      seniorManagement,
      incidentTeam,
      externalAuthorities,
    };
    // console.log(sequencedata);
    try {
      const response = await axios.post(
        `${baseurl}/${initURL}/nis2/create-governance`,
        {
          sequenceId: sequencedata,
          companyId: companydata,
          user: userdata.user_uuid,
          ...formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSubmited(true);
      toast.success("Governance data saved successfully!");
    } catch (error) {
      // console.error("Error saving governance data:", error);
      // toast.error("Failed to save governance data.");
      // Check if error response and message exist, and fall back to a default message
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";

      // Display the error message using toast
      toast.error(errorMessage);
    }
  };

  const SectionHeader = ({ title, icon: Icon, isOpen, onClick }) => (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-blue-50 border-b cursor-pointer hover:bg-blue-100 transition-all"
    >
      <div className="flex items-center">
        <Icon className="text-blue-600 mr-3" size={24} />
        <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
      </div>
      {isOpen ? (
        <ChevronUp className="text-blue-900" size={24} />
      ) : (
        <ChevronDown className="text-blue-900" size={24} />
      )}
    </div>
  );

  const renderFormRow = (data, setData, prefix) => (
    <>
      {data.map((item, index) => (
        <div key={index} className="flex flex-wrap gap-3 mb-3">
          <div className="flex flex-col space-y-1.5">
            <input
              className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors[`${prefix}-name-${index}`]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Title *"
              value={item.title}
              onChange={(e) =>
                handleFieldChange(setData, index, "title", e.target.value)
              }
            />
            {errors[`${prefix}-title-${index}`] && (
              <p className=" text-red-500 text-xs">
                {errors[`${prefix}-title-${index}`]}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <input
              className={`p-3  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors[`${prefix}-name-${index}`]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Name *"
              value={item.name}
              onChange={(e) =>
                handleFieldChange(setData, index, "name", e.target.value)
              }
            />
            {errors[`${prefix}-name-${index}`] && (
              <p className=" text-red-500 text-xs">
                {errors[`${prefix}-name-${index}`]}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <input
              className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors[`${prefix}-location-${index}`]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Location *"
              value={item.location}
              onChange={(e) =>
                handleFieldChange(setData, index, "location", e.target.value)
              }
            />
            {errors[`${prefix}-location-${index}`] && (
              <p className="text-red-500 text-xs">
                {errors[`${prefix}-location-${index}`]}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <input
              className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors[`${prefix}-contactNumber-${index}`]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Contact *"
              value={item.contactNumber}
              style={{
                appearance: "none",
              }}
              onChange={(e) =>
                handleFieldChange(
                  setData,
                  index,
                  "contactNumber",
                  e.target.value
                )
              }
            />
            {errors[`${prefix}-contactNumber-${index}`] && (
              <p className="text-red-500 text-xs">
                {errors[`${prefix}-contactNumber-${index}`]}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <input
              className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors[`${prefix}-emailId-${index}`]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Email ID *"
              value={item.emailId}
              onChange={(e) =>
                handleFieldChange(setData, index, "emailId", e.target.value)
              }
            />
            {errors[`${prefix}-emailId-${index}`] && (
              <p className="text-red-500 text-xs">
                {errors[`${prefix}-emailId-${index}`]}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <input
              className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors[`${prefix}-responsibility-${index}`]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Responsibility *"
              value={item.responsibility}
              onChange={(e) =>
                handleFieldChange(
                  setData,
                  index,
                  "responsibility",
                  e.target.value
                )
              }
            />
            {errors[`${prefix}-responsibility-${index}`] && (
              <p className="text-red-500 text-xs">
                {errors[`${prefix}-responsibility-${index}`]}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <input
              className={` p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors[`${prefix}-address-${index}`]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Address *"
              value={item.address}
              onChange={(e) =>
                handleFieldChange(setData, index, "address", e.target.value)
              }
            />
            {errors[`${prefix}-address-${index}`] && (
              <p className=" text-red-500 text-xs">
                {errors[`${prefix}-address-${index}`]}
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
  // console.log(preSubmited);
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-blue-900">Governance</h2>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <SectionHeader
          title="Senior Management"
          icon={User}
          isOpen={isOpen.seniorManagement}
          onClick={() => toggleSection("seniorManagement")}
        />
        {isOpen.seniorManagement && (
          <div className="p-6">
            {renderFormRow(
              seniorManagement,
              setSeniorManagement,
              "seniorManagement"
            )}
            <button
              onClick={() => addNewRow(setSeniorManagement)}
              className="mt-4 flex items-center text-blue-600 hover:text-blue-700 transition"
            >
              <Plus size={18} className="mr-2" />
              Add New Row
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <SectionHeader
          title="Incident Management Team - CSIRT"
          icon={Shield}
          isOpen={isOpen.incidentTeam}
          onClick={() => toggleSection("incidentTeam")}
        />
        {isOpen.incidentTeam && (
          <div className="p-6">
            {renderFormRow(incidentTeam, setIncidentTeam, "incidentTeam")}
            <button
              onClick={() => addNewRow(setIncidentTeam)}
              className="mt-4 flex items-center text-blue-600 hover:text-blue-700 transition"
            >
              <Plus size={18} className="mr-2" />
              Add New Row
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <SectionHeader
          title="Incident Report to External Authorities- Country CSIRT"
          icon={Globe}
          isOpen={isOpen.externalAuthorities}
          onClick={() => toggleSection("externalAuthorities")}
        />
        {isOpen.externalAuthorities && (
          <div className="p-6">
            {renderFormRow(
              externalAuthorities,
              setExternalAuthorities,
              "externalAuthorities"
            )}
            <button
              onClick={() => addNewRow(setExternalAuthorities)}
              className="mt-4 flex items-center text-blue-600 hover:text-blue-700 transition"
            >
              <Plus size={18} className="mr-2" />
              Add New Row
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={
            submited
              ? null
              : preSubmited?.includes("Governance")
              ? null
              : handleSubmit
          }
          className={`px-6 py-2 ${
            submited || preSubmited?.includes("Governance")
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-lg transition-colors duration-200`}
        >
          {submited
            ? "Saved Changes"
            : preSubmited?.includes("Governance")
            ? "Changes Already Saved"
            : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default NisGovernance;
