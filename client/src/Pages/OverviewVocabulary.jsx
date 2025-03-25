import { useState } from "react";
import React from 'react'
import {Button, OverviewContent, DialogAddNew} from "../Components/index.js";
import { Words } from "../Constants/index.js";

const OverviewVocabulary = () => {
  const [words, setWords] = useState(Words);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = (index) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const addWord = (newWord) => {
    setWords([...words, newWord]);
  };

  const handleFilter = (index) => {
    console.log("Filter vocabulary");
  }

  return (
    <div className="p-6 ">
      <div className="flex gap-4 mb-4">
        <Button onClick={() => setDialogOpen(true)} color="green">
          + Add new
        </Button>
        <DialogAddNew
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          onAdd={addWord}
        />
        <Button onClick={handleFilter} color="gray">
          Filter By Date
        </Button>
        <Button onClick={handleFilter} color="gray">
          Filter By Priority
        </Button>
      </div>
      <OverviewContent words={words} onDelete={handleDelete} />
    </div>
  );
}

export default OverviewVocabulary