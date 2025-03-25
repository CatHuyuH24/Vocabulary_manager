import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const OverviewContent = ({ words }) => {
  const navigate = useNavigate(); // ✅ Dùng useNavigate thay vì useLocation

  const onDelete = (id) => {
    alert("Are you sure you want to delete this word?");
    // TODO: Xử lý xóa từ vựng ở đây
  };

  const SeeVoca = (id) => {
    navigate(`/${id}`); // ✅ Chuyển hướng đúng cách
  };

  const EditVoca = (id) => {
    navigate(`/edit/${id}`); // ✅ Chuyển hướng đúng cách
  };

  return (
    <div className="mt-4">
      <table className="w-full border-collapse rounded-md overflow-hidden shadow-md">
        <thead>
          <tr className="bg-[#DEB887] text-white text-xl uppercase">
            <th className="p-3 text-left">Word</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-center">Feature</th>
          </tr>
        </thead>
        <tbody className="rounded-md overflow-hidden">
          {words.map((word, index) => (
            <tr
              key={word.id}
              className={`text-left font-play text-lg transition-all ${
                index % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#FFEBCD]"
              } hover:bg-[#BBDEFB]`}
            >
              <td className="p-3">{word.word}</td>
              <td className="p-3">{word.date}</td>
              <td className="p-3">
                <span
                  className={`
              px-3 py-1 rounded-full text-sm font-semibold
              ${
                word.priority === "High"
                  ? "bg-[#EF5350] text-white"
                  : word.priority === "Medium"
                  ? "bg-[#FFCA28] text-black"
                  : "bg-[#66BB6A] text-white"
              }
            `}
                >
                  {word.priority}
                </span>
              </td>
              <td className="p-3 flex justify-center gap-3">
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
                  onClick={() => onDelete(word.id)}
                  className="bg-[#EF5350] text-white p-2 rounded-full transition-transform transform hover:scale-110 hover:bg-[#D32F2F]"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverviewContent;
