import React, { useState } from 'react';

function ApproveLetter({ state }) {
  const [id, setId] = useState("");

  const allowedAccount = "0x95512b9CDDd4c4222B17BDfD1d0df6616dbD1F19"; // Replace with the desired allowed account

  const handleApprove = async () => {
    try {
      const account = await state.signer.getAddress();
      console.log(account);
      if (account !== allowedAccount) {
        alert("You are not allowed to approve recommendations.");
        return;
      }

      // Check if the requested recommendation exists before approving
      const studentDetails = await state.contract.getStudentDetails(id);
      if (studentDetails[0] === "") {
        alert("No recommendation found for this ID.");
        return;
      }

      await state.contract.approveRecommendation(id);
      alert("Recommendation approved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error approving recommendation");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recommendation ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="mb-2 w-full px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleApprove}
        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
      >
        Approve Request
      </button>
    </div>
  );
}

export default ApproveLetter;
