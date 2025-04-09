import { useState, useEffect } from 'react';
import React from 'react';
import { Button, OverviewContent, DialogAddNew } from '../Components/index.js';
import { getAllWords } from '../Services/index.js';

const OverviewVocabulary = () => {
  const [allWords, setAllWords] = useState([]);
  const [words, setWords] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priority, setPriority] = useState(''); // 👈 Mức độ ưu tiên đã chọn

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const result = await getAllWords();
        setWords(result);
        setAllWords(result);
      } catch (err) {
        console.error('Failed to fetch words. Please try again later.');
      }
    };
    fetchWords();
  }, []);

  // Lưu số lượng từ vào localStorage
  localStorage.setItem('Amount', words.length);

  const addWord = (newWord) => {
    setWords([...words, newWord]);
  };

  const handleFilter = () => {
    // Lọc các từ vựng có `lastModified` nằm trong khoảng thời gian
    const filteredWords = allWords.filter((word) => {
      const lastModifiedDate = new Date(word.lastModified);
      const start = new Date(startDate).toLocaleDateString('en-GB'); // Chuyển sang DD/MM/YYYY
      const end = new Date(endDate).toLocaleDateString('en-GB'); // Chuyển sang DD/MM/YYYY

      console.log('Start Date:', start);
      console.log('End Date:', end);

      // So sánh ngày (chỉ lấy phần ngày, không lấy giờ)
      return (
        lastModifiedDate.toLocaleDateString('en-GB') >= start &&
        lastModifiedDate.toLocaleDateString('en-GB') <= end
      );
    });

    // Cập nhật danh sách từ vựng hiển thị
    setWords(filteredWords);
  };

  const handlePriorityFilter = () => {
    if (!priority) return;
    if (priority == Number('0')) setWords(allWords);

    const filteredWords = allWords.filter(
      (word) => word.priority == Number(priority)
    );
    setWords(filteredWords);
  };

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-4 items-center flex-wrap">
        <Button onClick={() => setDialogOpen(true)} color="green">
          + Add new
        </Button>
        <DialogAddNew
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          onAdd={addWord}
        />

        {/* 👇 Bộ lọc ngày bắt đầu và kết thúc */}
        <div className="flex items-center gap-2">
          <label htmlFor="start-date">From:</label>
          <input
            type="date"
            id="start-date"
            className="border rounded p-1"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="end-date">To:</label>
          <input
            type="date"
            id="end-date"
            className="border rounded p-1"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <Button onClick={handleFilter} color="purple">
          Filter By Date
        </Button>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded p-2"
        >
          <option value="0">-- Select Priority --</option>
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>

        <Button onClick={handlePriorityFilter} color="purple">
          Filter By Priority
        </Button>
      </div>

      <OverviewContent words={words} />
    </div>
  );
};

export default OverviewVocabulary;
