import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const NoteCard = ({ note, onEdit, deleteNote }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md 
    hover:shadow-xl hover:scale-[1.02] transition duration-300 border border-gray-100">
      
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
        {note.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-sm line-clamp-3">
        {note.description}
      </p>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        
        {/* Edit */}
        <button
          onClick={() => onEdit(note)}
          className="flex items-center gap-1 text-blue-500 
          hover:text-blue-700 hover:scale-110 transition"
        >
          <FaEdit />
        </button>

        {/* Delete */}
        <button
          onClick={() => deleteNote(note._id)}
          className="flex items-center gap-1 text-red-500 
          hover:text-red-700 hover:scale-110 transition"
        >
          <FaTrash />
        </button>

      </div>
    </div>
  );
};

export default NoteCard;