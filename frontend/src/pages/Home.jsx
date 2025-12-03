import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import axios from 'axios'
import NoteCard from '../components/NoteCard'
import {toast} from 'react-toastify';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [filteredNotes, setFilteredNote] = useState(false)
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)    //edit concepts
  const [query, setQuery] = useState('')

  //concepts of displaying notes on portal
  useEffect(() => {

    fetchNotes()
  }, [])

  useEffect(() => {
    setFilteredNote(
      notes.filter((note) => 
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      )
    );

  }, [query, notes]);

  const fetchNotes = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/note", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setNotes(data.notes);
  } catch (error) {
    console.log(error);
  }
};


  const closeModal = () => {
    setModalOpen(false)
  }
/* created function edit concepts*/
  const onEdit = (note) => {
    setCurrentNote(note)
    setModalOpen(true)

  }

  //Add new note calls and functions, edit not concepts 
  const addNote = async (title, description) => {
    try {
            const response = await axios.post("http://localhost:5000/api/note/add", 
                { title, description }, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
                }
            ); 
             if(response.data.success) {
                fetchNotes()
                closeModal() /* it is custom function and define component (or its parent) to hide or close a modal dialog */
            }
        } catch(error) {
          console.log(error)
            
        }
  }

  //delete note calls and functions, edit delete note concepts 
  const deleteNote = async (id) => {
      try {
            const response = await axios.delete(`http://localhost:5000/api/note/${id}`, 
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
            ); 
             if(response.data.success) {
                fetchNotes();
                toast.success("note deleted")
            }
        } catch(error) {
          console.log(error)
        }
  }

  const editNote = async (id, title, description) => {
    try {
            const response = await axios.put(`http://localhost:5000/api/note/${id}`, 
                { title, description }, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
                }
            ); 
             if(response.data.success) {
                fetchNotes()
                closeModal() /* it is custom function and define component (or its parent) to hide or close a modal dialog */
            }
        } catch(error) {
          console.log(error)
        }
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar setQuery={setQuery}/>
      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
        { filteredNotes.length > 0 ? filteredNotes.map(note => (
          <NoteCard 
              key={note._id}
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
          />
        )) : <p>No notes</p>}
      </div>

      <button 
      onClick={() => setModalOpen(true)}
      className='fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full'>
        +
      </button>
      {isModalOpen && <NoteModal closeModal={closeModal}
      addNote={addNote}
      currentNote={currentNote}  /* pass modal*/
      editNote={editNote}
      />}
    </div>
  )
}

export default Home


