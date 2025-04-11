import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '../components/Button';
import { getWordById, updateWordById } from '../Services';

const DetailVocabulary = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const isEditMode = location.pathname.includes('/edit'); // Kiểm tra chế độ

  // State cho từ vựng
  const [word, setWord] = useState({
    id: id,
    word: '',
    description: '',
    lastModified: '',
    priority: '',
  });

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const result = await getWordById(id);
        setWord(result);
      } catch (err) {
        console.error('Failed to fetch word:', err);
        alert('Failed to fetch word. Please try again later.');
      }
    };
    fetchWord();
  }, [id]);

  function getLocalISOString() {
    const tzOffset = new Date().getTimezoneOffset() * 60000; // offset in ms
    return new Date(Date.now() - tzOffset).toISOString().slice(0, 19); // remove .000Z
  }

  // Hàm cập nhật từ vựng (Giả lập API)
  const handleSave = async () => {
    try {
      const updatedWord = { ...word, lastModified: getLocalISOString() };
      const status = await updateWordById(id, updatedWord);

      if (status === 204) {
        alert('Word updated successfully!');
        navigate(-1); // Quay lại trang trước
      } else {
        alert('Failed to update word. Please try again.');
      }
    } catch (error) {
      console.error('Error updating word:', error);
      alert('An error occurred while updating the word. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow-md m-6">
      {/* Word & Priority */}
      <div className="mb-4">
        {isEditMode ? (
          <input
            type="text"
            value={word.word}
            onChange={(e) =>
              setWord((prev) => ({ ...prev, word: e.target.value }))
            }
            className="border p-2 rounded w-full mb-2"
          />
        ) : (
          <h2 className="text-2xl font-bold mb-2">{word.word}</h2>
        )}

        {isEditMode ? (
          <select
            value={word.priority}
            onChange={(e) =>
              setWord((prev) => ({ ...prev, priority: e.target.value }))
            }
            className="border p-2 rounded w-full"
          >
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>
        ) : (
          <div className="mt-2">
            <span
              className={`
                px-3 py-1 rounded-full text-sm font-bold
                ${
                  word.priority === 1
                    ? 'bg-[#EF5350] text-white'
                    : word.priority === 2
                    ? 'bg-[#FFCA28] text-black'
                    : 'bg-[#66BB6A] text-white'
                }
              `}
            >
              {word.priority === 1
                ? 'High'
                : word.priority === 2
                ? 'Medium'
                : 'Low'}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <div
        className={`${
          !isEditMode ? 'mb-4 border-4 rounded-3xl p-4 border-gray-500' : ''
        }`}
      >
        {isEditMode ? (
          <textarea
            value={word.description}
            onChange={(e) =>
              setWord((prev) => ({ ...prev, description: e.target.value }))
            }
            className="border p-2 w-full rounded h-screen"
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap min-h-screen">
            {word.description}
          </p>
        )}
      </div>

      <div className="flex justify-center gap-10">
        {/* Nút Save chỉ xuất hiện khi ở chế độ Edit */}
        {isEditMode && (
          <Button onClick={handleSave} color="blue">
            Save
          </Button>
        )}

        <Button
          onClick={() => navigate(-1)} // Quay lại trang trước
          color="red"
          className="mt-4"
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default DetailVocabulary;
