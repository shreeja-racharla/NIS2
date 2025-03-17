import React, { useEffect, useState } from "react";
import { ChevronDown, Users, AlertTriangle } from "lucide-react";
import { useRouter } from "next/router";
import axios from "axios";
import { baseurl, initURL } from "../../../BaseUrl";
import GenerateReportButton from "./GenerateReportButton";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const NisIncidentReporting = ({
  companydata,
  sequencedata,
  userdata,
  preSubmited,
}) => {
  // const [user, setUser] = useState(userdata); set userdata
  const [resdata, setResdata] = useState("");
  const [errors, setErrors] = useState({
    approvalStatus: "",
    incidentDate: "",
    incidentTime: "",
    incidentSummary: "",
    incidentReport: null,
  });
  const router = useRouter();

  const [activeAccordion, setActiveAccordion] = useState(["team", "incident"]);
  const [incidentData, setIncidentData] = useState({
    approvalStatus: "Approved",
    incidentDate: "2024-12-01",
    incidentTime: "14:30",
    incidentSummary:
      "Unauthorized access detected in the internal network. Immediate actions were taken to mitigate the issue.",
    approvedByName: "Sarah White",
    approverEmailId: "sarah.white@einnosec.com",
    approvedDate: "2024-12-02",
    incidentReport: null, // Can be set to a file or remain null for now
  });

  const [teamMembers, setTeamMembers] = useState([
    {
      title: "Incident Response Lead",
      name: "David Green",
      location: "London, UK",
      contactNumber: "+442079845678",
      emailId: "david.green@einnosec.com",
      responsibility: "Manage and coordinate cybersecurity incident responses",
      address: "10 Downing Street, London",
    },
  ]);

  const [submited, setSubmited] = useState(false);
  const [getreport, setGetreport] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(submited);
  const toggleAccordion = (section) => {
    setActiveAccordion((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section]
    );
  };

  const RequiredLabel = ({ children }) => (
    <label className="text-sm text-gray-600">
      <span className="text-red-500">*</span> {children}
    </label>
  );

  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
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

  const Err = ({ data }) => {
    return (
      <div>
        <span className="text-red-500 text-xs">{data}</span>
      </div>
    );
  };

  const removeTeamMember = (index) => {
    const updatedTeamMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedTeamMembers);
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedTeamMembers = [...teamMembers];
    if (field == "contactNumber" && isNaN(value)) {
      return;
    }
    updatedTeamMembers[index][field] = value;
    setTeamMembers(updatedTeamMembers);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIncidentData({
      ...incidentData,
      incidentReport: file,
    });
  };
  const validateIncidentData = () => {
    const newErrors = { ...errors }; // Copy existing errors if needed

    // Validate each field
    newErrors.approvalStatus =
      incidentData.approvalStatus === "" ? "This field is required" : "";

    newErrors.incidentDate =
      incidentData.incidentDate === "" ? "This field is required" : "";

    newErrors.incidentTime =
      incidentData.incidentTime === "" ? "This field is required" : "";

    newErrors.incidentSummary =
      incidentData.incidentSummary === "" ? "This field is required" : "";

    newErrors.incidentReport =
      incidentData.incidentReport === ""
        ? "This field is required"
        : incidentData.incidentReport === null
        ? "This field is required"
        : "";
    newErrors.approvedDate =
      incidentData.approvedDate === ""
        ? "This field is required"
        : incidentData.approvedDate === null
        ? "This field is required"
        : "";

    // Update state once with the final object
    setErrors(newErrors);

    // Return a validation result if needed
    // return Object.values(newErrors).every((error) => error === "");
  };
  const submitData = async () => {
    preSubmited();
    setLoading(true);
    setSubmited(true);
    try {
      validateIncidentData();
      if (
        !userdata ||
        !incidentData.incidentDate ||
        !incidentData.incidentTime ||
        !incidentData.incidentSummary ||
        !incidentData.approverEmailId ||
        !incidentData.incidentReport
      ) {
        setSubmited(false);
        setLoading(false);
        return toast.error("Please fill all the fields");
      }
      const formData = new FormData();
      formData.append("user", userdata.user_uuid);
      formData.append("incidentDate", incidentData.incidentDate);
      formData.append("incidentTime", incidentData.incidentTime);
      formData.append("incidentSummary", incidentData.incidentSummary);
      formData.append("reportSubmitApproval", incidentData.approvalStatus);
      formData.append("approvedByName", incidentData.approvedByName);
      formData.append("approverEmailId", incidentData.approverEmailId);
      formData.append("approvedDate", incidentData.approvedDate);

      if (incidentData.incidentReport) {
        formData.append("incidentReport", incidentData.incidentReport);
      }

      teamMembers.forEach((member, index) => {
        formData.append(`teamMembers[${index}][title]`, member.title);
        formData.append(`teamMembers[${index}][name]`, member.name);
        formData.append(`teamMembers[${index}][location]`, member.location);
        formData.append(
          `teamMembers[${index}][contactNumber]`,
          member.contactNumber
        );
        formData.append(`teamMembers[${index}][emailId]`, member.emailId);
        formData.append(
          `teamMembers[${index}][responsibility]`,
          member.responsibility
        );
        formData.append(`teamMembers[${index}][address]`, member.address);
      });
      formData.append(`sequenceId`, sequencedata);
      formData.append(`companyId`, companydata);

      const response = await axios.post(
        `${baseurl}/${initURL}/nis2/create-incident-report`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || 201) {
        // alert("Data saved successfully!");
        toast.success("Data saved successfully!");
        // console.log(response);
        setResdata(response.data); //the uploaded file url
        setGetreport(true);
        setSubmited(true);
        setLoading(false);
      } else {
        toast.error("Failed to save data.");
        setSubmited(false);
        setLoading(false);
      }
    } catch (error) {
      // console.error("Error saving data:", error);
      // alert("An error occurred while saving data.");
      toast.error(
        error.response.data?.message ||
          error.message ||
          "An error occurred while saving data."
      );
      setSubmited(false);
      setLoading(false);
    }
  };
  return (
    <div className="w-full space-y-4">
      {/* NIS 2 Internal Reporting Team Section */}
      <div className="border rounded-md">
        <button
          onClick={() => toggleAccordion("team")}
          className="w-full flex items-center justify-between p-4 bg-blue-50 border-b cursor-pointer hover:bg-blue-100 transition-all text-blue-900 font-medium"
        >
          <div className="flex items-center gap-2">
            <Users className="text-blue-600 mr-3" size={24} />
            <span>NIS 2 Internal Reporting Team</span>
          </div>
          <ChevronDown
            className={`transform transition-transform ${
              activeAccordion.includes("team") ? "rotate-180" : ""
            }`}
          />
        </button>

        {activeAccordion.includes("team") && (
          <div className="p-4">
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <>
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-4 items-center"
                  >
                    <input
                      placeholder="Title"
                      className="border p-2 rounded"
                      value={member.title}
                      onChange={(e) =>
                        handleTeamMemberChange(index, "title", e.target.value)
                      }
                    />
                    <input
                      placeholder="Name"
                      className="border p-2 rounded"
                      value={member.name}
                      onChange={(e) =>
                        handleTeamMemberChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      placeholder="Location"
                      className="border p-2 rounded"
                      value={member.location}
                      onChange={(e) =>
                        handleTeamMemberChange(
                          index,
                          "location",
                          e.target.value
                        )
                      }
                    />
                    <input
                      placeholder="Contact"
                      className="border p-2 rounded"
                      value={member.contactNumber}
                      onChange={(e) =>
                        handleTeamMemberChange(
                          index,
                          "contactNumber",
                          e.target.value
                        )
                      }
                    />
                    <input
                      placeholder="Email ID"
                      className="border p-2 rounded"
                      value={member.emailId}
                      type="email"
                      onChange={(e) =>
                        handleTeamMemberChange(index, "emailId", e.target.value)
                      }
                    />
                    <input
                      placeholder="Responsibility"
                      className="border p-2 rounded"
                      value={member.responsibility}
                      onChange={(e) =>
                        handleTeamMemberChange(
                          index,
                          "responsibility",
                          e.target.value
                        )
                      }
                    />
                    <input
                      placeholder="Address"
                      className="border p-2 rounded"
                      value={member.address}
                      onChange={(e) =>
                        handleTeamMemberChange(index, "address", e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="text-red-500"
                    onClick={() => removeTeamMember(index)}
                  >
                    Remove
                  </button>
                  <br />
                </>
              ))}
              <button
                onClick={addTeamMember}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Row
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Incident Reporting Section */}
      <div className="border rounded-md">
        <button
          onClick={() => toggleAccordion("incident")}
          className="w-full flex items-center justify-between p-4 bg-blue-50 border-b cursor-pointer hover:bg-blue-100 transition-all text-blue-900 font-medium"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-blue-600 mr-3" size={24} />
            <span>Incident Reporting</span>
          </div>
          <span className="text-sm">
            Report significant cybersecurity incidents within 24 hours
          </span>
          <ChevronDown
            className={`transform transition-transform ${
              activeAccordion.includes("incident") ? "rotate-180" : ""
            }`}
          />
        </button>

        {activeAccordion.includes("incident") && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <RequiredLabel>Incident Date</RequiredLabel>
                <input
                  type="date"
                  className={`w-full border p-2 rounded ${
                    errors.incidentDate ? "border-red-500" : "border-gray-300"
                  }`}
                  value={incidentData.incidentDate}
                  onChange={(e) =>
                    setIncidentData({
                      ...incidentData,
                      incidentDate: e.target.value,
                    })
                  }
                  required
                />
                {errors.incidentDate && <Err data={errors.incidentDate} />}
              </div>
              <div className="space-y-1">
                <RequiredLabel>Incident Time</RequiredLabel>
                <input
                  type="time"
                  className={`w-full border p-2 rounded ${
                    errors.incidentTime ? "border-red-500" : "border-gray-300"
                  }`}
                  value={incidentData.incidentTime}
                  onChange={(e) =>
                    setIncidentData({
                      ...incidentData,
                      incidentTime: e.target.value,
                    })
                  }
                  required
                />
                {errors.incidentTime && <Err data={errors.incidentTime} />}
              </div>
              <div className="space-y-1">
                <RequiredLabel>Incident Report Upload</RequiredLabel>
                <div className="flex gap-2">
                  <input
                    type="file"
                    className={`text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-200 file:text-blue-800 hover:file:bg-blue-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 ${
                      errors.incidentReport
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={handleFileChange}
                    required
                  />
                </div>
                {errors.incidentReport && <Err data={errors.incidentReport} />}
              </div>
              <div className="space-y-1">
                <RequiredLabel>Approved Date</RequiredLabel>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className={`w-full border p-2 rounded `}
                    value={incidentData.approvedDate}
                    onChange={(e) =>
                      setIncidentData({
                        ...incidentData,
                        approvedDate: e.target.value,
                      })
                    }
                  />
                </div>
                {errors.approvedDate && <Err data={errors.approvedDate} />}
              </div>
            </div>

            <div className="space-y-1">
              <RequiredLabel>Incident Summary</RequiredLabel>
              <textarea
                className={`w-full border p-2 rounded h-16 ${
                  errors.incidentSummary ? "border-red-500" : "border-gray-300"
                }`}
                value={incidentData.incidentSummary}
                onChange={(e) =>
                  setIncidentData({
                    ...incidentData,
                    incidentSummary: e.target.value,
                  })
                }
              />
              {errors.incidentSummary && <Err data={errors.incidentSummary} />}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <RequiredLabel>Incident Report Submit Approval</RequiredLabel>
                <select
                  className={`w-full border p-2 rounded ${
                    errors.approvalStatus ? "border-red-500" : "border-gray-300"
                  }`}
                  value={incidentData.approvalStatus}
                  onChange={(e) =>
                    setIncidentData({
                      ...incidentData,
                      approvalStatus: e.target.value,
                    })
                  }
                  required
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Approved">Approved</option>
                  <option value="Not Approved">Not Approved</option>
                </select>
                {errors.approvalStatus && <Err data={errors.approvalStatus} />}
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">
                  Approved By Name
                </label>
                <input
                  type="text"
                  className={`w-full border p-2 rounded `}
                  value={incidentData.approvedByName}
                  onChange={(e) =>
                    setIncidentData({
                      ...incidentData,
                      approvedByName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">
                  Approver Email ID
                </label>
                <input
                  type="email"
                  className={`w-full border p-2 rounded`}
                  value={incidentData.approverEmailId}
                  onChange={(e) =>
                    setIncidentData({
                      ...incidentData,
                      approverEmailId: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit and Generate Incident Report Buttons */}
      <div className="flex justify-end mt-4 space-x-4">
        <button
          onClick={
            loading
              ? ""
              : !submited
              ? submitData
              : () => {
                  router.reload();
                }
          }
          className={`${
            submited ? "bg-red-600" : "bg-green-600 hover:bg-green-500"
          } text-white px-4 py-2 rounded transition-colors duration-500 ease-in-out `}
        >
          {loading
            ? "Processing..."
            : submited
            ? "File New incident"
            : "Submit All Data"}
        </button>
        <GenerateReportButton
          user={userdata}
          companydata={companydata}
          sequencedata={sequencedata}
          resData={resdata}
          submited={getreport}
        />
      </div>
    </div>
  );
};

export default NisIncidentReporting;
