import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import { baseurl, initURL } from "../../../BaseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 26,
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#003366",
    textTransform: "uppercase",
  },
  companyName: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
    color: "#005b96",
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    borderBottomStyle: "solid",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#005b96",
    textAlign: "center",
    textDecoration: "underline",
  },
  smallHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#444444",
    marginBottom: 10,
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  label: {
    width: "35%",
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  valueBox: {
    width: "65%",
    fontSize: 12,
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#b0c4de",
    borderBottomStyle: "solid",
    color: "#333",
  },
  contactBox: {
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#f0f8ff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderStyle: "solid",
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    fontWeight: "bold",
    color: "#666",
    marginBottom: 10,
  },
});

const todayDate = new Date().toLocaleDateString("en-GB");

// PDF Document component
const NIS2Document = ({ data }) => (
  <Document>
    {/* {console.log(data)} */}
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>NIS2 Incident Report</Text>

      {/* Company Details */}
      <View style={styles.section} wrap={false}>
        <Text style={styles.companyName}>{data.user_name}</Text>
        <Text style={styles.companyName}>{data.title}</Text>
        <Text style={styles.companyName}>{data.address}</Text>
        <Text style={styles.companyName}>{data.location}</Text>
        <Text style={styles.companyName}>Contact: {data.contact_number}</Text>
        <Text style={styles.smallHeader}>Date: {todayDate}</Text>
      </View>

      {/* Management Contact */}
      <View style={styles.section} wrap={false}>
        <Text style={styles.subHeader}>Management Contact</Text>
        {data.company.managementContact.map((contact, index) => (
          <View key={index} style={styles.contactBox}>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text
                style={styles.valueBox}
              >{`${contact.firstName} ${contact.lastName}`}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Title:</Text>
              <Text style={styles.valueBox}>{contact.title}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.valueBox}>{contact.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Responsibility:</Text>
              <Text style={styles.valueBox}>{contact.responsibility}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Cybersecurity Team Contact */}
      <View style={styles.section} wrap={false}>
        <Text style={styles.subHeader}>Cybersecurity Team Contact</Text>
        {data.company.cybersecurityContact.map((contact, index) => (
          <View key={index} style={styles.contactBox}>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text
                style={styles.valueBox}
              >{`${contact.firstName} ${contact.lastName}`}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Title:</Text>
              <Text style={styles.valueBox}>{contact.title}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.valueBox}>{contact.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Responsibility:</Text>
              <Text style={styles.valueBox}>{contact.responsibility}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Corporate Details */}
      <View style={styles.section} wrap={false}>
        <Text style={styles.subHeader}>Corporate Details</Text>
        <View style={styles.contactBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Company Needs to Comply with NIS2:</Text>
            <Text style={styles.valueBox}>
              {data.company.companyBusiness.compliance ? "YES" : "NO"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Compliance Description:</Text>
            <Text style={styles.valueBox}>
              {data.company.companyBusiness.complianceDescription}
            </Text>
          </View>
          <View style={styles.row} wrap={false}>
            <Text style={styles.label}>
              Description of the business - Essential Entities:
            </Text>
            <Text style={styles.valueBox}>
              {data.company.companyBusiness.essentialEntities.join(", ")}
            </Text>
          </View>
          <View style={styles.row} wrap={false}>
            <Text style={styles.label}>
              Company Business - Important Entities:
            </Text>
            <Text style={styles.valueBox}>
              {data.company.companyBusiness.importantEntities.join(", ")}
            </Text>
          </View>
        </View>
      </View>

      {/* Incident Details */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Incident Details</Text>
        {data.incidentReportData.map((report, index) => (
          <View key={index} style={styles.contactBox}>
            <View style={styles.row}>
              <Text style={styles.label}>Incident Date:</Text>
              <Text style={styles.valueBox}>{report.incidentDate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Incident Time:</Text>
              <Text style={styles.valueBox}>{report.incidentTime}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Summary:</Text>
              <Text style={styles.valueBox}>{report.incidentSummary}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Approval Status:</Text>
              <Text style={styles.valueBox}>{report.reportSubmitApproval}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Approved By:</Text>
              <Text style={styles.valueBox}>{report.approvedByName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Approver Email:</Text>
              <Text style={styles.valueBox}>{report.approverEmailId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Approved Date:</Text>
              <Text style={styles.valueBox}>{report.approvedDate}</Text>
            </View>
          </View>
        ))}

        {/* Senior Management */}
        <Text style={styles.subHeader}>Senior Management</Text>

        {data.governanceData.seniorManagement.map((member, index) => (
          <View key={index} style={styles.contactBox}>
            <View style={styles.row}>
              <Text style={styles.label}>Title:</Text>
              <Text style={styles.valueBox}>{member.title}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.valueBox}>{member.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.valueBox}>{member.location}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.subHeader}>Incident Team</Text>

        {data.governanceData.incidentTeam.map((member, index) => (
          <View key={index} style={styles.contactBox} wrap={true}>
            <View style={styles.row}>
              <Text style={styles.label}>Title:</Text>
              <Text style={styles.valueBox}>{member.title}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.valueBox}>{member.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email ID:</Text>
              <Text style={styles.valueBox}>{member.emailId}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Incident Report */}
      {data.incidentReportData.map((report, index) => (
        <View key={index} style={styles.contactBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Incident Date:</Text>
            <Text style={styles.valueBox}>{report.incidentDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Incident Time:</Text>
            <Text style={styles.valueBox}>{report.incidentTime}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Incident Summary:</Text>
            <Text style={styles.valueBox}>{report.incidentSummary}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Approval Status:</Text>
            <Text style={styles.valueBox}>{report.reportSubmitApproval}</Text>
          </View>

          {/* Team Members */}
          <Text style={styles.subHeader}>Team Members</Text>
          {report.teamMembers.map((member, memberIndex) => (
            <View key={memberIndex} style={styles.contactBox}>
              <View style={styles.row}>
                <Text style={styles.label}>Title:</Text>
                <Text style={styles.valueBox}>{member.title}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.valueBox}>{member.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.valueBox}>{member.location}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Contact Number:</Text>
                <Text style={styles.valueBox}>{member.contactNumber}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Email ID:</Text>
                <Text style={styles.valueBox}>{member.emailId}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Responsibility:</Text>
                <Text style={styles.valueBox}>{member.responsibility}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.valueBox}>{member.address}</Text>
              </View>
            </View>
          ))}

          <Text style={styles.subHeader}>Incident Annex A - Attached</Text>

          {/* Approved By Section at the End */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>Approved By</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Approved By:</Text>
              <Text style={styles.valueBox}>{report.approvedByName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Approver Email:</Text>
              <Text style={styles.valueBox}>{report.approverEmailId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Approved Date:</Text>
              <Text style={styles.valueBox}>{report.approvedDate}</Text>
            </View>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

// Button Component to Generate PDF

const GenerateReportButton = ({
  submited,
  user,
  resData,
  sequencedata,
  companydata,
  option,
}) => {
  const [reportData, setReportData] = useState(user);
  const [company, setCompany] = useState(null);
  const [governanceData, setGovernanceData] = useState(null);
  const [incidentReportData, setIncidentReportData] = useState(null); // New state for incident report data
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReadyToDownload, setIsReadyToDownload] = useState(false);

  const handleGenerateReport = async () => {
    if (companydata && sequencedata && user) {
      try {
        // console.log("gv");
        // Fetch company data
        const companyResponse = await axios.get(
          `${baseurl}/${initURL}/nis2/get-company-by-id?user=${user.user_uuid}&companyId=${companydata}&sequenceId=${sequencedata}`
        );
        setCompany(companyResponse.data);

        // Fetch governance data
        const governanceResponse = await axios.get(
          `${baseurl}/${initURL}/nis2/governance-by-company?user=${user.user_uuid}&companyId=${companydata}&sequenceId=${sequencedata}`
        );
        setGovernanceData(governanceResponse.data);
        // console.log("gv", governanceResponse);

        // Fetch incident report data
        const incidentReportResponse = await axios.get(
          `${baseurl}/${initURL}/nis2/get-incident-report?user=${user.user_uuid}&companyId=${companydata}&sequenceId=${sequencedata}`
        );
        setIncidentReportData(incidentReportResponse.data); // Set incident report data
        // console.log("gv", incidentReportResponse);
        setIsGenerating(true);
        setTimeout(() => {
          setIsGenerating(false);
          setIsReadyToDownload(true);
        }, 2000); // 2 seconds delay
      } catch (error) {
        // console.error("Error fetching data:", error);
        toast.error(error.response.data?.message || "Error fetching data");
      }
    }
  };

  const downloadPresignedFile = async ({ presignedUrlEndpoint }) => {
    try {
      // const response = presignedUrlEndpoint
      let presignedUrl = presignedUrlEndpoint; // Ensure your backend returns the presigned URL as `url`
      if (!presignedUrl) {
        return toast.error("File dose not exist");
      }
      const responseurl =
        option == "dashboard" &&
        (
          await axios.get(
            `${baseurl}/${initURL}/nis2/download-incident-report?reqfile=${presignedUrl}`
          )
        );

      presignedUrl = await (option == "dashboard" && presignedUrl
        ? responseurl?.data.success
        : presignedUrl);
      const response = await fetch(presignedUrl);

      if (!response || !response.ok) {
        return toast.error("Something went wrong");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      if (presignedUrl) {
        // Trigger file download
        const anchor = document.createElement("a");
        anchor.href = url;
        // Extract the filename from URL or default to "download"
        const urlParams = new URLSearchParams(presignedUrl.split("?")[1]);
        const contentDisposition = response.headers.get("Content-Disposition");
        let filename = urlParams
          .get("response-content-disposition")
          ?.match(/filename=([^;]+)/)?.[1];
        filename =
          filename ||
          contentDisposition?.match(/filename="(.+)"/)?.[1] ||
          "download";

        anchor.download = filename; // Change this to your desired file name
        anchor.click();
      } else {
        toast.error("Uploaded report not found.");
      }
    } catch (error) {
      toast.error("Error fetching file");
    }
  };
  const loaderStyle = {
    border: "2px solid #f3f3f3",
    borderTop: "2px solid #3498db",
    borderRadius: "50%",
    width: "12px",
    height: "12px",
    animation: "spin 1s linear infinite",
  };

  const spinKeyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div>
      <style>{spinKeyframes}</style>
      {/* Inject keyframes for spinner animation */}
      {!isReadyToDownload ? (
        submited && (
          <button
            onClick={submited ? handleGenerateReport : null}
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
          >
            {isGenerating ? (
              <span className="flex items-center">
                <span style={loaderStyle} className="mr-2"></span> Generating
                Report...
              </span>
            ) : option ? (
              "Download"
            ) : (
              "Click Here to Generate Report"
            )}
          </button>
        )
      ) : (
        <div style={{ display: "flex", gap: "7px" }}>
          <PDFDownloadLink
            document={
              <NIS2Document
                data={{
                  ...reportData,
                  company,
                  governanceData,
                  incidentReportData,
                }}
              />
            }
            fileName="NIS2_Incident_Report.pdf"
            className={`"bg-blue-900 text-white ${
              option ? "px-4 py-2" : "px-3 py-1"
            } rounded bg-blue-800 transition-colors"`}
          >
            {({ loading }) =>
              loading ? "Generating PDF..." : "DOWNLOAD Report"
            }
          </PDFDownloadLink>
          <button
            className={`"bg-blue-900 text-white ${
              option ? "px-4 py-2" : "px-3 py-1"
            } rounded bg-blue-800 transition-colors"`}
            onClick={(e) => {
              e.preventDefault();
              downloadPresignedFile({
                presignedUrlEndpoint:
                  resData ||
                  incidentReportData?.[0]?.incidentreportdoc?.[0]
                    ?.incidentReport_path,
              });
            }}
          >
            Uploaded Report
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateReportButton;
