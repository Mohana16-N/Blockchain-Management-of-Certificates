import React, { useState, useEffect } from 'react';

function RequestLetter({ state }) {
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [program, setProgram] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchLastRecommendationId = async () => {
      try {
        // Fetch the last recommendation ID from the contract
        const lastId = await state.contract.studentCount();
        setId(Number(lastId)); // Set the last ID as the current ID
      } catch (error) {
        console.error(error);
        alert("Error fetching last recommendation ID");
      }
    };

    fetchLastRecommendationId();
  }, [state.contract]);

  const handleRequest = async () => {
    // Validation check
    if (!name || !university || !program) {
      alert("All fields are required");
      return;
    }

    try {
      // Request recommendation from the contract
      await state.contract.requestRecommendation(name, university, program);

      // Update the ID locally to reflect the latest recommendation
      setId((prevId) => prevId + 1);

      // Clear the input fields
      setName("");
      setUniversity("");
      setProgram("");

      alert("Recommendation requested successfully!");
    } catch (error) {
      console.error(error);
      alert("Error requesting recommendation");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 w-full px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="University"
        value={university}
        onChange={(e) => setUniversity(e.target.value)}
        className="mb-2 w-full px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Program"
        value={program}
        onChange={(e) => setProgram(e.target.value)}
        className="mb-2 w-full px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
      />

      <button
        onClick={handleRequest}
        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
      >
        Request Certificate
      </button>
      {id !== null && (
        <div className="mt-2 text-gray-300">Recommendation ID: {id}</div>
      )}
    </div>
  );
}

export default RequestLetter;
