import { useEffect, useState } from "react";

const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentNote) {
      editNote(currentNote._id, title, description);
    } else {
      addNote(title, description);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      
      {/* Modal Card */}
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 
      transform transition duration-300 scale-100">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {currentNote ? "✏️ Edit Note" : "➕ Add New Note"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full px-4 py-3 border rounded-lg mb-4 
            focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            rows="4"
            className="w-full px-4 py-3 border rounded-lg mb-5 
            focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />

          {/* Buttons */}
          <div className="flex justify-between items-center gap-3">
            
            {/* Cancel */}
            <button
              type="button"
              onClick={closeModal}
              className="w-1/2 py-2 rounded-lg border border-gray-300 
              hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            {/* Submit */}
            <button
              type="submit"
              className="w-1/2 py-2 rounded-lg text-white font-semibold 
              bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.03] transition duration-300"
            >
              {currentNote ? "Update" : "Add"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;