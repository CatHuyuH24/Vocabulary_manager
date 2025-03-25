import React, { useState } from "react";
import Label from "./Label";
import Button from "./Button";

const DialogAddNew = ({ isOpen, onClose, onAdd }) => {
  const [word, setWord] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(Date.now());

  const translateDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()} - ${d.getMonth() + 1} - ${d.getDate()}`;
  };
  const handleSubmit = () => {
    if (!word.trim()) return alert("Please enter a word.");

    onAdd({
      id: Date.now(),
      word,
      date: translateDate(date),
      priority,
      description,
    });
    onClose(); // Đóng dialog sau khi thêm
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-xl font-bold mb-4 text-center">
            Add New Vocabulary
          </h2>

          <Label>Word</Label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-3"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />

          <Label>Priority</Label>
          <select
            className="w-full border p-2 rounded mb-3"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <Label>Description</Label>
          <textarea
            className="w-full border p-2 rounded mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="flex justify-end gap-3">
            <Button onClick={onClose} color="gray">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="blue">
              Save
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default DialogAddNew;
