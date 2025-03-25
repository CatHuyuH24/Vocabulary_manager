import React from 'react'
import Button from './Button'
// import { Eye, Edit, Trash } from 'lucide-react'

const OverviewContent = ({ words }) => {
  const onDelete = (index) => {
    console.log("Delete", index);
  };
  const SeeVoca = (index) => {
    console.log("See", index);
  }
  const EditVoca = (index) => {
    console.log("Edit", index);
  }
  return (
    <div className="mt-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-xl">
            <th className="border p-2">Word</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Feature</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => (
            <tr key={index} className="text-center border font-play text-xl">
              <td className="border p-2">{word.word}</td>
              <td className="border p-2">{word.date}</td>
              <td className="border p-2">{word.priority}</td>
              <td className="border p-2 flex gap-4 justify-center">
                <Button onClick={SeeVoca} color="blue" children="👁" /> 
                <Button onClick={EditVoca} color="yellow" children="✏️" />
                <Button onClick={onDelete} color="red" children="🗑️" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OverviewContent