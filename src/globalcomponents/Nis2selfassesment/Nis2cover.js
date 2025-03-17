import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { AiOutlineClear, AiOutlineSave } from "react-icons/ai";
import { baseurl, initURL } from "../../../BaseUrl";
import CustomAxios from "../CustomAxios";
import { toast } from "react-toastify";

function Nis2Cover() {
  const [formData, setFormData] = useState({
    company: "",
    address: "",
    dateOfAdvice: "",
    contactPerson: "",
    telephoneNumber: "",
    email: "",
    reviewStatus: "pending",
    CreatedBy: { firstName: "", lastName: "", contactNumber: "", email: "" },
    ReviewedBy: { firstName: "", lastName: "", contactNumber: "", email: "" },
    ApprovedBy: { firstName: "", lastName: "", contactNumber: "", email: "" },
    signature: null,
  });

  const sign = useRef(null);
  const [url, setUrl] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      // Handle nested object updates dynamically
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value.trim(),
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value.trim() });
    }
  };


  const handleChangeReviewStatus = (e) => {
    setFormData({
      ...formData,
      reviewStatus: e.target.value,
    });
  };

  // Handle signature clear
  const handleClearSignature = () => {
    if (sign.current) {
      sign.current.clear();
      setUrl("");
      setFormData({ ...formData, signature: null });
    }
  };

  // Convert Data URL to Blob
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/png" });
  };

  // Handle signature generation (save signature locally in formData)
  const handleSaveSignature = () => {
    if (!sign.current || sign.current.isEmpty()) {
      toast.error("Please provide a valid signature before saving.");
      return;
    }
    setIsButtonDisabled(true);
    const signatureDataURL = sign.current.getTrimmedCanvas().toDataURL("image/png");
    const signatureBlob = dataURLtoBlob(signatureDataURL);

    setFormData({ ...formData, signature: signatureBlob });
    setUrl(signatureDataURL); // Show preview
    setIsButtonDisabled(false);
  };

  // Handle form submission (including signature)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();

    // ✅ Append Required Fields
    submissionData.append("company", formData.company.trim());
    submissionData.append("address", formData.address.trim());
    submissionData.append("dateOfAdvice", new Date(formData.dateOfAdvice).toISOString());
    submissionData.append("contactPerson", formData.contactPerson.trim());
    submissionData.append("telephoneNumber", formData.telephoneNumber.trim());
    submissionData.append("email", formData.email.trim());
    submissionData.append("reviewStatus", formData.reviewStatus.trim().toLowerCase());

    // ✅ Send Nested Objects as JSON Strings (Backend will Parse)
    submissionData.append("CreatedBy", JSON.stringify(formData.CreatedBy));
    submissionData.append("ReviewedBy", JSON.stringify(formData.ReviewedBy));
    submissionData.append("ApprovedBy", JSON.stringify(formData.ApprovedBy));

    // ✅ Handle Signature Upload (if available)
    if (formData.signature instanceof Blob) {
      submissionData.append("signature", new File([formData.signature], "signature.png", { type: "image/png" }));
    }

    // 🔹 Debugging: Log Sent Fields
    for (let [key, value] of submissionData.entries()) {
      console.log(` Field Sent: ${key} =`, value instanceof Blob ? "[File]" : value);
    }

    try {
      const response = await CustomAxios.post(
        `${baseurl}/apiv2user8/nis2selfassessment`,
        submissionData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.success("Form submitted successfully!");
      } else {
        toast.error("Form submission failed.");
      }
    } catch (error) {
      console.error(" Error Response Data:", error.response.data);
      toast.error("Validation failed. Check console for details.");
    }
  };



  return (
    <div className="pb-4 p-4">
      <div className="p-4">
        <div className="border rounded-lg shadow-md">
          <div className="border-b px-4 py-3 bg-gray-50">
            <strong>Information Security Assessment Form</strong>
          </div>
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Company */}
                <div className="mb-2">
                  <label className="text-sm mb-0 block">Company:</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter company name"
                    required
                  />
                </div>

                {/* Address */}
                <div className="mb-2">
                  <label className="text-sm mb-0 block">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter address"
                    required
                  />
                </div>

                {/* Date of the Advice */}
                <div className="mb-2">
                  <label className="text-sm mb-0 block">
                    Date of the Advice:
                  </label>
                  <input
                    type="date"
                    name="dateOfAdvice"
                    value={formData.dateOfAdvice}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    required
                  />
                </div>

                {/* Contact Person */}
                <div className="mb-2">
                  <label className="text-sm mb-0 block">
                    Contact Person:
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter contact person's name"
                    required
                  />
                </div>

                {/* Telephone Number */}
                <div className="mb-2">
                  <label className="text-sm mb-0 block">
                    Contact Number:
                  </label>
                  <input
                    type="tel"
                    name="telephoneNumber"
                    value={formData.telephoneNumber}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter telephone number"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-2">
                  <label className="text-sm mb-0 block">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                {/* Created By */}
                <h5>Created By</h5>
                <br />

                <label>First Name:</label>
                <input
                  type="text"
                  name="CreatedBy.firstName"
                  value={formData.CreatedBy.firstName}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded text-sm"
                  placeholder="Enter creator's first name"
                  required
                />

                <label>Last Name:</label>
                <input
                  type="text"
                  name="CreatedBy.lastName"
                  value={formData.CreatedBy.lastName}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded text-sm"
                  placeholder="Enter creator's last name"
                  required
                />

                <label>Contact Number:</label>
                <input
                  type="text"
                  name="CreatedBy.contactNumber"
                  value={formData.CreatedBy.contactNumber}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded text-sm"
                  placeholder="Enter creator's contact number"
                  required
                />

                <label>Email:</label>
                <input
                  type="email"
                  name="CreatedBy.email"
                  value={formData.CreatedBy.email}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded text-sm"
                  placeholder="Enter creator's email"
                  required
                />


                {/* Review By */}
                <h5>Reviewed By</h5>
                <br />

                <div className="mb-2">
                  <label className="text-sm mb-0 block">First Name:</label>
                  <input
                    type="text"
                    name="ReviewedBy.firstName"
                    value={formData.ReviewedBy.firstName}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter reviewer's first name"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="text-sm mb-0 block">Last Name:</label>
                  <input
                    type="text"
                    name="ReviewedBy.lastName"
                    value={formData.ReviewedBy.lastName}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter reviewer's last name"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="text-sm mb-0 block">Contact Number:</label>
                  <input
                    type="text"
                    name="ReviewedBy.contactNumber"
                    value={formData.ReviewedBy.contactNumber}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter reviewer's contact number"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="text-sm mb-0 block">Email:</label>
                  <input
                    type="email"
                    name="ReviewedBy.email"
                    value={formData.ReviewedBy.email}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter reviewer's email"
                    required
                  />
                </div>

                {/* Approved By */}
                <h5>Approved By</h5>
                <br />

                <div className="mb-2">
                  <label className="text-sm mb-0 block">First Name:</label>
                  <input
                    type="text"
                    name="ApprovedBy.firstName"
                    value={formData.ApprovedBy.firstName}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter approver's first name"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="text-sm mb-0 block">Last Name:</label>
                  <input
                    type="text"
                    name="ApprovedBy.lastName"
                    value={formData.ApprovedBy.lastName}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter approver's last name"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="text-sm mb-0 block">Contact Number:</label>
                  <input
                    type="text"
                    name="ApprovedBy.contactNumber"
                    value={formData.ApprovedBy.contactNumber}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter approver's contact number"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="text-sm mb-0 block">Email:</label>
                  <input
                    type="email"
                    name="ApprovedBy.email"
                    value={formData.ApprovedBy.email}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Enter approver's email"
                    required
                  />
                </div>
                <div className="mb-2 flex items-center">
                  <label htmlFor="review-status" className="mr-2">Review Status:</label>
                  <select
                    id="review-status"
                    value={formData.reviewStatus}
                    onChange={handleChangeReviewStatus}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Signature */}
                <div className="mb-2 lg:col-span-2">
                  <label className="text-sm mb-0 block">Signature:</label>
                  {isEditing ? (
                    <div>
                      <SignatureCanvas
                        canvasProps={{
                          width: 300,
                          height: 100,
                          className: "border border-gray-400",
                        }}
                        ref={sign}
                      />
                      <div className="flex space-x-4 mt-2">
                        <button type="button" onClick={handleClearSignature}>
                          <AiOutlineClear size={24} />
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveSignature}
                          disabled={isButtonDisabled}
                        >
                          <AiOutlineSave size={24} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={url || "https://via.placeholder.com/150"}
                      alt="Signature"
                      onClick={() => setIsEditing(true)}
                    />
                  )}
                </div>
              </div>

              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nis2Cover;
