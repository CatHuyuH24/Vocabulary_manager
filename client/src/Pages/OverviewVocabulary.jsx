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
  // localStorage.setItem('Amount', allWords.length);

  const addWord = (newWord) => {
    const updatedWords = [...allWords, newWord];
    setWords(updatedWords);
    setAllWords(updatedWords);
    // localStorage.setItem('Amount', allWords.length);
  };

  const handleDateFilter = () => {
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

  const handleClearAllFilters = () => {
    setWords(allWords);
    setStartDate(''); // Reset startDate to an empty string
    setEndDate(''); // Reset endDate to an empty string
    setPriority('0'); // Reset priority to "All" (value "0")
  };

  const handleBothFilters = () => {
    const filteredWords = allWords.filter((word) => {
      const lastModifiedDate = new Date(word.lastModified);
      const start = startDate
        ? new Date(startDate).toLocaleDateString('en-GB')
        : null;
      const end = endDate
        ? new Date(endDate).toLocaleDateString('en-GB')
        : null;

      const isWithinDateRange =
        (!start || lastModifiedDate.toLocaleDateString('en-GB') >= start) &&
        (!end || lastModifiedDate.toLocaleDateString('en-GB') <= end);

      const matchesPriority =
        !priority || priority == '0' || word.priority == Number(priority);

      return isWithinDateRange && matchesPriority;
    });

    setWords(filteredWords);
  };
  const handlePriorityFilter = () => {
    if (!priority) return;
    if (priority == Number('0')) {
      setWords(allWords);
    } else {
      const filteredWords = allWords.filter(
        (word) => word.priority == Number(priority)
      );
      setWords(filteredWords);
    }
  };

  const handleDeleteWord = (deletedWordId) => {
    const updatedWords = allWords.filter((word) => word.id !== deletedWordId);
    setWords(updatedWords);
    setAllWords(updatedWords);
    // localStorage.setItem('Amount', updatedWords.length);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="inline">
          <Button onClick={() => setDialogOpen(true)} color="green">
            + Add new
          </Button>
          <DialogAddNew
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onAdd={addWord}
          />
        </div>

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

          <label htmlFor="end-date">To:</label>
          <input
            type="date"
            id="end-date"
            className="border rounded p-1"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <Button onClick={handleDateFilter} color="purple">
            Filter By Date
          </Button>
        </div>

        <div className="md:inline-flex md:ml-3 items-center gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="inline-flex gap-2 p-2 items-center border rounded"
          >
            <option value="0">All</option>
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>

          <Button onClick={handlePriorityFilter} color="purple">
            Filter By Priority
          </Button>
        </div>
        <div className="inline-flex gap-5">
          <Button color="blue" onClick={handleBothFilters}>
            Filter by Date and Priority
          </Button>
          <Button color="gray" onClick={handleClearAllFilters}>
            Clear
          </Button>
        </div>
      </div>

      <OverviewContent words={words} onDeleteWord={handleDeleteWord} />
    </div>
  );
};

export default OverviewVocabulary;
