import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../Components/Button";

const DetailVocabulary = () => {
  const location = useLocation();
  const isEditMode = location.pathname.includes("/edit"); // Kiểm tra chế độ

  // State cho từ vựng
  const [word, setWord] = useState("Example");
  const [priority, setPriority] = useState("High");
  const [description, setDescription] = useState("This is an example description.");

  // Hàm cập nhật từ vựng (Giả lập API)
  const handleSave = () => {
    console.log("Cập nhật từ:", { word, priority, description });
    alert("Từ vựng đã được cập nhật!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow-md m-6">
      {/* Word & Priority */}
      <div className="flex justify-between items-center mb-4">
        {isEditMode ? (
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
        ) : (
          <h2 className="text-2xl font-bold">{word}</h2>
        )}

        {isEditMode ? (
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 rounded">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        ) : (
          <span className="text-lg font-semibold">{priority}</span>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        {isEditMode ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded"
            rows="4"
          />
        ) : (
          <p className="text-gray-700">{description}</p>
        )}
      </div>

      {/* Nút Save chỉ xuất hiện khi ở chế độ Edit */}
      {isEditMode && (
        <Button onClick={handleSave} color="blue">
          Save
        </Button>
      )}
    </div>
  );
};

export default DetailVocabulary;
