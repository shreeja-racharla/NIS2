import axios from "axios";
import { useState, useEffect } from "react";
import { baseurl, initURL } from "../../../BaseUrl";
import { toast } from "react-toastify";
import GenerateReportButton from "./GenerateReportButton";

const NisDashboard = ({
  companydata,
  userdata,
  sequencedata,
  setsid,
  deleteseq,
}) => {
  const [reports, setReports] = useState([]);

  // Fetching reports
  useEffect(() => {
    const getAllReport = async () => {
      try {
        if (!userdata || !companydata) {
          return;
        }
        const response = await axios.get(
          `${baseurl}/${initURL}/nis2/get-all-formgroup?user=${userdata.user_uuid}&companyId=${companydata}`
        );

        if (response) {
          setReports(response.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Something went wrong"
        );
      }
    };
    getAllReport();
  }, []);

  // Function to format the date and time
  function formatDateTime(dates) {
    const date = new Date(dates);
    const formattedDate = date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const hours12 = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    const formattedTime = `${hours12}:${minutes}:${seconds} ${ampm}`;
    return `${formattedDate} at ${formattedTime}`;
  }

  return (
    <div className="container mx-auto p-8">
      {/* Dashboard Heading */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        NIS2 Incident Report Dashboard
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {reports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left table-auto border-collapse">
              <thead className="bg-gray-100 text-center">
                <tr>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600 uppercase">
                   Sr. No
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600 uppercase">
                    Report Name
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600 uppercase">
                    Created On
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600 uppercase">
                    Updated On
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600 uppercase">
                    Download
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600 uppercase">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {reports.map(
                  (report, index) =>
                    report.isDeleted === false && (
                      <tr
                        key={report._id}
                        className={`${
                          report._id === sequencedata
                            ? "bg-gray-300"
                            : "bg-white hover:bg-gray-50"
                        } `}
                      >
                        <td className="px-4 py-2 text-sm">{index + 1}</td>
                        <td className="px-4 py-2 text-sm">
                          {report.incidentReportId?.incidentSummary ||
                            "Report Incomplete"}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {formatDateTime(report.createdAt)}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {formatDateTime(report.updatedAt)}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded ${
                              report.isCompleted
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {report.isCompleted ? "Completed" : "Pending"}
                          </span>
                        </td>
                        {/* Download Button */}
                        <td className="px-4 py-2 text-sm text-center">
                          <button
                            className={`"text-xs rounded bg-blue-600${
                              report.isCompleted
                                ? "text-white "
                                : "text-white cursor-not-allowed"
                            }`}
                            disabled={!report.isCompleted}
                          >
                            {report.isCompleted ? (
                              <GenerateReportButton
                                option={"dashboard"}
                                submited={report.isCompleted}
                                user={userdata}
                                companydata={companydata}
                                sequencedata={report._id}
                              />
                            ) : (
                              "Not Ready"
                            )}
                          </button>
                        </td>
                        {/* Delete Button */}
                        <td className="px-4 py-2 text-sm text-center">
                          <button
                            onClick={async () => {
                              await setsid(report._id);
                              setTimeout(() => {
                                deleteseq();
                              }, 1500);
                            }}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-6">
            No reports found.
          </p>
        )}
      </div>
    </div>
  );
};

export default NisDashboard;
