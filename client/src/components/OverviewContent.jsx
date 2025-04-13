import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteWord } from "../Services";
const OverviewContent = ({ words, onDeleteWord }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState(null);

  function formatDate(isoString) {
    const date = new Date(isoString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23", // 24-hour format
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Ho_Chi_Minh",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  }

  const confirmDelete = (id) => {
    setSelectedWordId(id);
    setModalOpen(true);
  };

  const onDelete = async () => {
    try {
      await deleteWord(selectedWordId); // Call the deleteWord service
      alert("Word deleted successfully!");
      setModalOpen(false);
      onDeleteWord(selectedWordId);
      setSelectedWordId(null);
      // Optionally, refresh the list or trigger a re-render
    } catch (error) {
      console.error("Failed to delete the word:", error);
      alert("An error occurred while deleting the word. Please try again.");
    }
  };

  const SeeVoca = (id) => {
    navigate(`/${id}`);
  };

  const EditVoca = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="mt-4">
      <table className="w-full border-collapse rounded-md overflow-hidden shadow-md">
        <thead>
          <tr className="bg-[#DEB887] text-white text-[10px] sm:text-sm md:text-base lg:text-xl uppercase">
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-left">Word</th>
            <th className="p-3 text-left">Last modified date</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="rounded-md overflow-hidden">
          {words.map((word, index) => (
            <tr
              key={word.id}
              className={`text-left font-play text-sm md:text-lg transition-all ${
                index % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#FFEBCD]"
              } hover:bg-[#BBDEFB]`}
            >
              <td className="p-3 text-xs sm:text-sm md:text-base lg:text-lg">
                <span
                  className={`
              px-3 py-1 rounded-full font-bold
              ${
                word.priority === 1
                  ? "bg-[#EF5350] text-white"
                  : word.priority === 2
                  ? "bg-[#FFCA28] text-black"
                  : "bg-[#66BB6A] text-white"
              }
            `}
                >
                  {word.priority === 1
                    ? "High"
                    : word.priority === 2
                    ? "Medium"
                    : "Low"}
                </span>
              </td>
              <td
                className="p-3 text-xs sm:text-sm md:text-base lg:text-lg truncate"
                style={{ maxWidth: "30vw" }}
              >
                {word.word}
              </td>
              <td className="p-3">{formatDate(word.lastModified)}</td>

              <td className="p-3 flex justify-center gap-3 text-sm sm:text-base md:text-lg">
                <button
                  onClick={() => SeeVoca(word.id)}
                  className="bg-[#1976D2] text-white p-2 rounded-full transition-transform transform hover:scale-110 hover:bg-[#1565C0]"
                >
                  👁
                </button>
                <button
                  onClick={() => EditVoca(word.id)}
                  className="bg-[#FBC02D] text-white p-2 rounded-full transition-transform transform hover:scale-110 hover:bg-[#F9A825]"
                >
                  ✏️
                </button>
                <button
                  onClick={() => confirmDelete(word.id)}
                  className="bg-[#EF5350] text-white p-2 rounded-full transition-transform transform hover:scale-110 hover:bg-[#D32F2F]"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center text-sm sm:text-base md:text-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this word?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={onDelete}
                className="bg-[#EF5350] text-white px-4 py-2 rounded hover:bg-[#D32F2F]"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewContent;
