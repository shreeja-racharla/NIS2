// import React, { useState } from "react";
// import Link from "next/link";
// import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
// import { FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
// import Loader from "@/globalcomponents/loader/Loader";

// function Nis2Dashborad() {
//   const [cardData, setCardData] = useState([
//     {
//       _id: "1",
//       location_id: "HQ-001",
//       assessment_level: "Level 1",
//       vda_version: "NIS2 v1.0",
//       locationtype: "Headquarter",
//       assessment_date: new Date().toISOString(),
//       company_address: "123 Main St, Berlin, Germany",
//     },
//     {
//       _id: "2",
//       location_id: "SL-001",
//       assessment_level: "Level 2",
//       vda_version: "NIS2 v1.0",
//       locationtype: "Sublocation",
//       assessment_date: new Date().toISOString(),
//       company_address: "45 Elm St, Munich, Germany",
//     },
//   ]);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   return (
//     <div className="bg-[#F4F4F9] h-full">
//       {loading && <Loader />}
//       <div className="container mx-auto p-6">
//         {cardData.length > 0 ? (
//           <div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-3 gap-8">
//               {cardData.map((card) => (
//                 <div
//                   key={card._id}
//                   className="bg-white p-6 shadow-t-lg shadow-b-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-b from-blue-50 to-blue-100 hover:border hover:border-blue-300"
//                 >
//                   <Link
//                     href={`/NIS2-self-assesment/NisTabs?id=${card._id}`} 
//                   >
//                     {/* Card Header */}
//                     <div className="mb-6">
//                       {/* <h3
//                         className="text-[24px] font-semibold text-blue-900 truncate"
//                         title={card.location_id}
//                       >
//                         Location ID - {card.location_id}
//                       </h3> */}
//                       {/* <p
//                         className="text-gray-600 mt-1 truncate"
//                         title={card.assessment_level}
//                       >
//                         Assessment Level - {card.assessment_level}
//                       </p> */}
//                       {/* <p
//                         className="text-gray-600 mt-1 truncate"
//                         title={card.vda_version}
//                       >
//                         Framework Version - {card.vda_version}
//                       </p> */}
//                     </div>

//                     {/* Card Content */}
//                     <div className="flex items-center mt-6">
//                       <div className="bg-[#007ACC] text-white p-3 rounded-full shadow-md">
//                         {card.locationtype.toLowerCase() === "headquarter" ? (
//                           <FaBuilding className="text-2xl" />
//                         ) : (
//                           <FaMapMarkerAlt className="text-2xl" />
//                         )}
//                       </div>
//                       <div className="ml-5">
//                         <h5 className="text-lg font-semibold text-gray-800 capitalize flex items-center">
//                           {card.locationtype.toLowerCase() === "headquarter"
//                             ? "Headquarter"
//                             : "Sublocation"}
//                         </h5>
//                         <p className="text-gray-500 text-sm">
//                           {
//                             new Date(card.assessment_date)
//                               .toISOString()
//                               .split("T")[0]
//                           }
//                         </p>
//                       </div>
//                     </div>

//                     {/* Card Footer */}
//                     <div className="mt-6">
//                       <p
//                         className="text-gray-700 truncate"
//                         title={card.company_address}
//                       >
//                         <strong>Address:</strong> {card.company_address}
//                       </p>
//                     </div>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="relative h-full flex flex-col justify-center items-center text-center">
//             <h2 className="text-4xl font-bold text-gray-800 mb-2">
//               Welcome to NIS2 Self Assessment
//             </h2>
//             <p className="text-lg text-gray-600 mb-6 max-w-lg">
//               Start building a secure foundation by adding your first headquarter. Let’s ensure your locations are aligned with compliance from the start.
//             </p>
//             <button
//               className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-white text-sm py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
//               onClick={toggleModal}
//             >
//               Add Headquarter
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Nis2Dashborad;

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import Loader from "@/globalcomponents/loader/Loader";
import CustomAxios from "@/globalcomponents/CustomAxios";

function Nis2Dashboard() {
  const [cardData, setCardData] = useState([]); // Store API data
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10; // Number of records per page

  // Fetch data from the backend
  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await CustomAxios.get(
        `${baseurl}/apiv2user8/nis2selfassessment?page=${pageNumber}&limit=${limit}`
      );
      
      console.log("✅ API Response:", response.data); // Debugging API response
      
      setCardData(response.data.data); 
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts or page changes
  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className="bg-[#F4F4F9] min-h-screen p-6">
      {loading && <Loader />}

      <div className="container mx-auto">
        {cardData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardData.map((card) => (
              <Link key={card._id} href={`/editNis2?id=${card._id}`}>
                <div className="bg-white p-6 shadow-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-600 text-white p-3 rounded-full shadow-md">
                      {card.locationtype.toLowerCase() === "headquarter" ? (
                        <FaBuilding className="text-2xl" />
                      ) : (
                        <FaMapMarkerAlt className="text-2xl" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h5 className="text-lg font-semibold text-gray-800 capitalize">
                        {card.locationtype}
                      </h5>
                    </div>
                  </div>

                  <p className="text-gray-700 truncate">
                    <strong>Address:</strong> {card.company_address}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              No Data Available
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Start by adding your first Headquarter or Sublocation.
            </p>
            <button className="bg-blue-600 text-white text-sm py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
              Add Location
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${
              page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white"
            }`}
          >
            Previous
          </button>
          <span className="px-4 py-2">{page}</span>
          <button
            onClick={() => setPage((prev) => (cardData.length < limit ? prev : prev + 1))}
            disabled={cardData.length < limit}
            className={`px-4 py-2 rounded ${
              cardData.length < limit ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nis2Dashboard;
