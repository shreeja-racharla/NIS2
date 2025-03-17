import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Building2,
  Users,
  Shield,
  Briefcase,
  Plus,
  X,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseurl, initURL } from "../../../BaseUrl";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const NisCorporateDetails = ({
  companydata,
  userdata,
  setsid,
  setcid,
  preSubmited,
}) => {
  const [isOpen, setIsOpen] = useState({
    companyDetails: true,
    managementContact: false,
    cybersecurityContact: false,
    companyBusiness: false,
  });

  const [companyDetails, setCompanyDetails] = useState({
    user: userdata || {},
    address: userdata?.address || "",
    companyName: userdata?.user_name || "",
    contactNumber: userdata?.contact_number || "",
  });
  const [managementRows, setManagementRows] = useState([
    {
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@einnosec.com",
      title: "CEO",
      responsibility: "Oversee overall business strategy and operations",
    },
  ]);

  const [cybersecurityRows, setCybersecurityRows] = useState([
    {
      firstName: "David",
      lastName: "Green",
      email: "david.green@einnosec.com",
      title: "CISO",
      responsibility: "Manage and coordinate cybersecurity measures",
    },
  ]);

  const [businessRows, setBusinessRows] = useState([
    {
      firstName: "Anna",
      lastName: "Parker",
      title: "National Reporting Coordinator",
      contactNumber: "+39061234567",
      email: "anna.parker@einnosec.com",
    },
  ]);

  const [compliance, setCompliance] = useState(null);
  const [complianceDescription, setComplianceDescription] = useState("test");
  const [essentialEntities, setEssentialEntities] = useState("test");
  const [importantEntities, setImportantEntities] = useState("test");
  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(false);
  const router = useRouter();

  const toggleSection = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInputChange = (e, setStateFunction) => {
    const { name, value } = e.target;
    if (name == "contactNumber" && isNaN(value)) {
      return;
    }
    setStateFunction((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error when typing
    }));
  };

  const handleRowChange = (e, index, setRows) => {
    const { name, value } = e.target;
    if (name == "contactNumber" && isNaN(value)) {
      return;
    }
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = { ...newRows[index], [name]: value };
      return newRows;
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}-${index}`]: "", // Clear row-specific error
    }));
  };

  const addNewRow = (setRows, defaultRow) => {
    setRows((prevRows) => [...prevRows, defaultRow]);
  };

  const removeRow = (index, setRows) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    // if (!companyDetails.title) newErrors.title = "Title is required";
    // if (!companyDetails.companyName)
    //   newErrors.companyName = "Company name is required";
    // if (!companyDetails.location) newErrors.location = "Location is required";
    // if (!companyDetails.contactNumber) {
    //   newErrors.contactNumber = "Contact number is required";
    // } else if (!/^\d{10,15}$/.test(companyDetails.contactNumber)) {
    //   newErrors.contactNumber = "Contact number should be 10-15 digits";
    // }
    // if (!companyDetails.address) newErrors.address = "Address is required";

    managementRows.forEach((row, index) => {
      if (!row.firstName)
        newErrors[`firstName-${index}`] = "First name is required";
      if (!row.lastName)
        newErrors[`lastName-${index}`] = "Last name is required";
      if (row.email && !/\S+@\S+\.\S+/.test(row.email))
        newErrors[`email-${index}`] = "Invalid email format";
    });

    cybersecurityRows.forEach((row, index) => {
      if (!row.firstName)
        newErrors[`cyber-firstName-${index}`] = "First name is required";
      if (!row.lastName)
        newErrors[`cyber-lastName-${index}`] = "Last name is required";
      if (row.email && !/\S+@\S+\.\S+/.test(row.email))
        newErrors[`cyber-email-${index}`] = "Invalid email format";
    });

    businessRows.forEach((row, index) => {
      if (!row.firstName)
        newErrors[`business-firstName-${index}`] = "First name is required";
      if (!row.lastName)
        newErrors[`business-lastName-${index}`] = "Last name is required";
      if (row.email && !/\S+@\S+\.\S+/.test(row.email))
        newErrors[`business-email-${index}`] = "Invalid email format";
      if (row.contactNumber && !/^\d{10,20}$/.test(row.contactNumber)) {
        newErrors[`business-contactNumber-${index}`] =
          "Contact number should be 10-20 digits";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCompanyDetails = async () => {
    try {
      // Sending individual fields instead of `companyDetails` object
      const { title, companyName, location, contactNumber, address, user } =
        companyDetails;
      if (
        !user.user_uuid ||
        !title ||
        !companyName ||
        !location ||
        !contactNumber ||
        !address
      ) {
        return toast.error(
          `All fields are required. Failed to ${
            companydata ? "update" : "save"
          } company details.`
        );
      }

      const response = await axios.post(
        `${baseurl}/${initURL}/nis2/save-company-info`,
        {
          user: user.user_uuid,
          title,
          companyName,
          location,
          contactNumber,
          address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extracting the object ID from the response
      const generatedId = response.data.data._id;

      toast.success("Company details saved successfully!");

      // updating the state with the new company
      setcid(generatedId);
    } catch (error) {
      toast.error(
        `${
          error?.response?.data?.message ||
          error?.message ||
          "Failed to save company details: Try again later"
        }`
      );
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    if (!companyDetails || !companyDetails.user.user_uuid || !companydata) {
      toast.error(
        "Company ID not available. Please save company details first."
      );
      return;
    }
    if (compliance == null) {
      toast.error("All fields are required");
      return;
    }
    // Include `user` in the formPayload
    const formPayload = {
      user: companyDetails.user.user_uuid, // Include the newly generated company ID
      companyId: companydata,
      managementContact: managementRows,
      cybersecurityContact: cybersecurityRows,
      companyBusiness: {
        essentialEntities: essentialEntities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        importantEntities: importantEntities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        compliance,
        complianceDescription,
        businessContacts: businessRows,
      },
    };

    try {
      const response = await axios.post(
        `${baseurl}/${initURL}/nis2/create-company-details`,
        formPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setsid(response.data.sequenceId);
      setSubmited(true);
      toast.success("Data submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
    }
  };

  const input = ({
    label,
    placeholder,
    value,
    onChange,
    type = "text",
    name,
    error,
  }) => (
    <div className="flex flex-col space-y-1.5">
      <label className="text-sm font-medium text-gray-700">
        <span className="text-red-500">*</span> {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`px-3 py-2 rounded-md border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-150`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );

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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-8">
        NIS2 Corporate Details
      </h2>
      <div>
        {/* Company Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <SectionHeader
            title="Company Details"
            isOpen={isOpen.companyDetails}
            icon={Building2}
            onClick={() => toggleSection("companyDetails")}
          />
          {isOpen.companyDetails && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                {input({
                  label: "Title",
                  name: "title",
                  value: companyDetails.title,
                  onChange: (e) => handleInputChange(e, setCompanyDetails),
                  placeholder: "Enter company title",
                  error: errors.title,
                })}
                {input({
                  label: "Company Name",
                  name: "companyName",
                  value: companyDetails.companyName,
                  onChange: (e) => handleInputChange(e, setCompanyDetails),
                  placeholder: "Enter company name",
                  error: errors.companyName,
                })}
                {input({
                  label: "Location",
                  name: "location",
                  value: companyDetails.location,
                  onChange: (e) => handleInputChange(e, setCompanyDetails),
                  placeholder: "Enter location",
                  error: errors.location,
                })}
                {input({
                  label: "Contact Number",
                  name: "contactNumber",
                  value: companyDetails.contactNumber,
                  onChange: (e) => handleInputChange(e, setCompanyDetails),
                  placeholder: "Enter contact number",
                  type: "tel",
                  error: errors.contactNumber,
                })}
                <div className="md:col-span-2">
                  {input({
                    label: "Address",
                    name: "address",
                    value: companyDetails.address,
                    onChange: (e) => handleInputChange(e, setCompanyDetails),
                    placeholder: "Enter complete address",
                    error: errors.address,
                  })}
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveCompanyDetails}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  {companydata
                    ? "Update Company Details"
                    : "Add Company Details"}
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Management Contact */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <SectionHeader
            title="Management Contact"
            isOpen={isOpen.managementContact}
            icon={Users}
            onClick={() => toggleSection("managementContact")}
          />
          {isOpen.managementContact && (
            <div className="p-6">
              {managementRows.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-4 relative"
                >
                  {input({
                    label: "First Name",
                    name: "firstName", // No index, matches backend schema
                    placeholder: "Enter first name",
                    value: row.firstName,
                    onChange: (e) =>
                      handleRowChange(e, index, setManagementRows),
                    error: errors[`firstName-${index}`],
                  })}
                  {input({
                    label: "Last Name",
                    name: "lastName", // No index, matches backend schema
                    placeholder: "Enter last name",
                    value: row.lastName,
                    onChange: (e) =>
                      handleRowChange(e, index, setManagementRows),
                    error: errors[`lastName-${index}`],
                  })}
                  {input({
                    label: "Email",
                    name: "email", // No index, matches backend schema
                    placeholder: "Enter email",
                    value: row.email,
                    type: "email",
                    onChange: (e) =>
                      handleRowChange(e, index, setManagementRows),
                    error: errors[`email-${index}`],
                  })}
                  {input({
                    label: "Title",
                    name: "title", // No index, matches backend schema
                    placeholder: "Enter title",
                    value: row.title,
                    onChange: (e) =>
                      handleRowChange(e, index, setManagementRows),
                  })}
                  {input({
                    label: "Responsibility",
                    name: "responsibility", // No index, matches backend schema
                    placeholder: "Enter responsibility",
                    value: row.responsibility,
                    onChange: (e) =>
                      handleRowChange(e, index, setManagementRows),
                  })}
                  {managementRows.length > 1 && (
                    <button
                      onClick={() => removeRow(index, setManagementRows)}
                      className="absolute top-0 right-0 mt-2 text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() =>
                  addNewRow(setManagementRows, {
                    firstName: "",
                    lastName: "",
                    email: "",
                    title: "",
                    responsibility: "",
                  })
                }
                className="mt-2 flex items-center text-blue-600 hover:text-blue-700 transition"
              >
                <Plus size={18} className="mr-2" />
                Add New Row
              </button>
            </div>
          )}
        </div>
        {/* Cybersecurity Contact */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <SectionHeader
            title="Cybersecurity Team Contact"
            isOpen={isOpen.cybersecurityContact}
            icon={Shield}
            onClick={() => toggleSection("cybersecurityContact")}
          />
          {isOpen.cybersecurityContact && (
            <div className="p-6">
              {cybersecurityRows.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-4 relative"
                >
                  {input({
                    label: "First Name",
                    name: "firstName",
                    placeholder: "Enter first name",
                    value: row.firstName,
                    onChange: (e) =>
                      handleRowChange(e, index, setCybersecurityRows),
                    error: errors[`cyber-firstName-${index}`],
                  })}
                  {input({
                    label: "Last Name",
                    name: "lastName",
                    placeholder: "Enter last name",
                    value: row.lastName,
                    onChange: (e) =>
                      handleRowChange(e, index, setCybersecurityRows),
                    error: errors[`cyber-lastName-${index}`],
                  })}
                  {input({
                    label: "Email",
                    name: "email",
                    placeholder: "Enter email",
                    value: row.email,
                    type: "email",
                    onChange: (e) =>
                      handleRowChange(e, index, setCybersecurityRows),
                    error: errors[`cyber-email-${index}`],
                  })}
                  {input({
                    label: "Title",
                    name: "title",
                    placeholder: "Enter title",
                    value: row.title,
                    onChange: (e) =>
                      handleRowChange(e, index, setCybersecurityRows),
                  })}
                  {input({
                    label: "Responsibility",
                    name: "responsibility",
                    placeholder: "Enter responsibility",
                    value: row.responsibility,
                    onChange: (e) =>
                      handleRowChange(e, index, setCybersecurityRows),
                  })}
                  {cybersecurityRows.length > 1 && (
                    <button
                      onClick={() => removeRow(index, setCybersecurityRows)}
                      className="absolute top-0 right-0 mt-2 text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() =>
                  addNewRow(setCybersecurityRows, {
                    firstName: "",
                    lastName: "",
                    email: "",
                    title: "CISO",
                    responsibility: "",
                  })
                }
                className="mt-2 flex items-center text-blue-600 hover:text-blue-700 transition"
              >
                <Plus size={18} className="mr-2" />
                Add New Row
              </button>
            </div>
          )}
        </div>
        {/* Company Business */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <SectionHeader
            title="Company Business"
            isOpen={isOpen.companyBusiness}
            icon={Briefcase}
            onClick={() => toggleSection("companyBusiness")}
          />
          {isOpen.companyBusiness && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-red-500">*</span> Description of the
                    business - Essential Entities
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                    rows="3"
                    placeholder="Banking, Digital Infrastructure, Energy, etc."
                    value={essentialEntities}
                    onChange={(e) => setEssentialEntities(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-red-500">*</span> Company Business -
                    Important Entities
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                    rows="3"
                    placeholder="Digital Providers, Manufacturing, etc."
                    value={importantEntities}
                    onChange={(e) => setImportantEntities(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    <span className="text-red-500">*</span> Company Needs to
                    Comply with NIS2
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCompliance(true)}
                      className={`px-4 py-2 rounded-md transition-colors duration-150 ${
                        compliance === true
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      YES
                    </button>
                    <button
                      onClick={() => setCompliance(false)}
                      className={`px-4 py-2 rounded-md transition-colors duration-150 ${
                        compliance === false
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      NO
                    </button>
                  </div>
                </div>
                {input({
                  label: "Compliance Description",
                  name: "complianceDescription",
                  value: complianceDescription,
                  onChange: (e) => setComplianceDescription(e.target.value),
                  placeholder: "Enter compliance description",
                })}
              </div>

              {businessRows.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-4 relative"
                >
                  {input({
                    label: "First Name",
                    name: "firstName",
                    placeholder: "Enter first name",
                    value: row.firstName,
                    onChange: (e) => handleRowChange(e, index, setBusinessRows),
                    error: errors[`business-firstName-${index}`],
                  })}
                  {input({
                    label: "Last Name",
                    name: "lastName",
                    placeholder: "Enter last name",
                    value: row.lastName,
                    onChange: (e) => handleRowChange(e, index, setBusinessRows),
                    error: errors[`business-lastName-${index}`],
                  })}
                  {input({
                    label: "Title",
                    name: "title",
                    placeholder: "Enter title",
                    value: row.title,
                    onChange: (e) => handleRowChange(e, index, setBusinessRows),
                  })}
                  {input({
                    label: "Contact Number",
                    name: "contactNumber",
                    placeholder: "Enter contact number",
                    type: "tel",
                    value: row.contactNumber,
                    onChange: (e) => handleRowChange(e, index, setBusinessRows),
                    error: errors[`business-contactNumber-${index}`],
                  })}
                  {input({
                    label: "Email",
                    name: "email",
                    placeholder: "Enter email",
                    type: "email",
                    value: row.email,
                    onChange: (e) => handleRowChange(e, index, setBusinessRows),
                    error: errors[`business-email-${index}`],
                  })}
                  {businessRows.length > 1 && (
                    <button
                      onClick={() => removeRow(index, setBusinessRows)}
                      className="absolute top-0 right-0 mt-2 text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() =>
                  addNewRow(setBusinessRows, {
                    firstName: "",
                    lastName: "",
                    title: "",
                    contactNumber: "",
                    email: "",
                  })
                }
                className="mt-2 flex items-center text-blue-600 hover:text-blue-700 transition"
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
                : preSubmited?.includes("Corporate Details")
                ? null
                : handleSubmit
            }
            className={`px-6 py-2 ${
              submited ||
              preSubmited?.includes("Corporate Details" || "Governance")
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white rounded-lg transition-colors duration-200`}
          >
            {submited
              ? "Saved Changes"
              : preSubmited?.includes("Corporate Details")
              ? "Changes Already Saved"
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NisCorporateDetails;

// {"id":104,
// "resources":["tisax","tisax_audit","grc_compliance"],
// "last_login":"2024-11-20T19:34:02.098671Z",
// "is_superuser":false,
// "is_staff":false,
// "is_active":true,
// "date_joined":"2024-11-18T10:06:18Z",
// "user_uuid":"673c3f2ee39a3851bc6fc8e5",
// "user_name":"e-InnoSec Private LTD.",
// "user_designation":"Admin",
// "email":"mayuri.b@kritikalhire.com",
// "admin_email":null,
// "address":"address",
// "contact_number":"9876543210",
// "vendor_uuid":null,
// "questionnaireId":null,
// "isPasswordChanged":false,
// "profile_img":"https://grcbucket.s3.amazonaws.com/profile_img/mayuri.b%40kritikalhire.com/einnosecwhitebg.png?AWSAccessKeyId=AKIAQVOEYACC4K2LB3US&Signature=vuAdp74Gn%2FD40nvyJ1i02j0nXms%3D&Expires=1732768513",
// "admin":null}
