import React, { useState } from 'react';
import Label from './Label';
import Button from './Button';
import { createWord } from '../Services';

const DialogAddNew = ({ isOpen, onClose, onAdd }) => {
  // console.log(typeof(id));/
  const [word, setWord] = useState({
    id: null,
    word: '',
    description: '',
    lastModified: '',
    priority: '3',
  });

  function getLocalISOString() {
    const tzOffset = new Date().getTimezoneOffset() * 60000; // offset in ms
    return new Date(Date.now() - tzOffset).toISOString().slice(0, 19); // remove .000Z
  }
  const handleSubmit = async () => {
    // if (!word.word.trim()) {
    //   return alert("Please enter a word.");
    // }

    // Cập nhật thời gian chỉnh sửa cuối cùng
    const newWord = {
      ...word,
      lastModified: getLocalISOString(),
      priority: Number(word.priority), // convert to number
    };

    try {
      console.log(newWord.word);
      console.log(newWord.priority);
      console.log(newWord.lastModified);
      console.log(newWord.description);
      const status = await createWord(newWord); // Gọi API để tạo từ mới

      if (status === 201) {
        alert('Word added successfully!');
        onAdd(newWord);
        onClose();

        // reset to default
        setWord({
          id: null,
          word: '',
          description: '',
          lastModified: '',
          priority: '3',
        });
      } else {
        alert('Failed to add word. Please try again.');
      }
    } catch (error) {
      console.error('Error adding word:', error);
      alert('An error occurred while adding the word. Please try again.');
    }
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
            value={word.word}
            onChange={(e) =>
              setWord((prev) => ({ ...prev, word: e.target.value }))
            }
          />

          <Label>Priority</Label>
          <select
            className="w-full border p-2 rounded mb-3"
            value={word.priority}
            onChange={(e) =>
              setWord((prev) => ({ ...prev, priority: e.target.value }))
            }
          >
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>

          <Label>Description</Label>
          <textarea
            className="w-full border p-2 rounded mb-4"
            value={word.description}
            onChange={(e) =>
              setWord((prev) => ({ ...prev, description: e.target.value }))
            }
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
