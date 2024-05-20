import React, { useState } from "react";
import "./Certificate.css"; // Import the CSS file for styling

function GetDetails({ state }) {
  const [id, setId] = useState("");
  const [details, setDetails] = useState(null);

  const handleGetDetails = async () => {
    try {
      const result = await state.contract.getStudentDetails(id);
      setDetails(result);
    } catch (error) {
      console.error(error);
      alert("Error fetching student details");
    }
  };

  // Function to determine default approval status
  const getDefaultApprovalStatus = () => {
    if (details && details.length > 0) {
      return details[3] ? "Yes" : "No"; // Display actual approval status if available
    }
    if (["1", "2", "3"].includes(id)) {
      return "Yes"; // Default approval status for IDs 1, 2, and 3
    }
    return ""; // Default to empty if details not available and not IDs 1, 2, or 3
  };

  // Function to determine approval status
  const getApprovalStatus = () => {
    if (details && details.length > 0) {
      return details[3] ? "Yes" : "No"; // Display actual approval status if available
    }
    if (["1", "2", "3"].includes(id)) {
      return "Yes"; // Default approval status for IDs 1, 2, and 3
    }
    return ""; // Default to empty if details not available
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Student ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="mb-2 w-full px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleGetDetails}
        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Student Details
      </button>
      <div className="mt-4">
        {(details !== null && details && details.length > 0) ? (
          <>
            {details[0] && details[1] && details[2] && (
              <div className="text-pink-600">
                <p>Name: {details[0]}</p>
                <p>University: {details[1]}</p>
                <p>Program: {details[2]}</p>
                <p>Approved: {getDefaultApprovalStatus()}</p>
              </div>
            )}
            {details[3] && (
              <div className="certificate">
                <h1 className="certificate-title">Certificate of Completion</h1>
                <p className="certificate-text">This is to certify that</p>
                <p className="certificate-name">{details[0]}</p>
                <p className="certificate-text">
                  has successfully completed the program
                </p>
                <p className="certificate-program">{details[2]}</p>
                <p className="certificate-text">at</p>
                <p className="certificate-university">{details[1]}</p>
                <p className="certificate-text">
                  Approved: <strong>{getApprovalStatus()}</strong>
                </p>
                <div className="certificate-footer">
                  <div className="certificate-id">ID: {id}</div>
                  <div className="certificate-signature">
                    <img src="signature.png" alt="Signature" className="signature-image" />
                    <p className="signature-text">Authorized Signature</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default GetDetails;
