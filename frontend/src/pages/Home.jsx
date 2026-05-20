import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import axios from 'axios'
import NoteCard from '../components/NoteCard'
import { toast } from 'react-toastify'

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [filteredNotes, setFilteredNote] = useState([])
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    setFilteredNote(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query, notes])

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/note`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setNotes(data.notes)
    } catch (error) {
      console.log(error)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    setCurrentNote(null)
  }

  const onEdit = (note) => {
    setCurrentNote(note)
    setModalOpen(true)
  }

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/note/add`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      if (response.data.success) {
        fetchNotes()
        closeModal()
        toast.success("Note Added 🚀")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      if (response.data.success) {
        fetchNotes()
        toast.success("Note Deleted 🗑️")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      if (response.data.success) {
        fetchNotes()
        closeModal()
        toast.success("Note Updated ✏️")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200'>
      
      <Navbar setQuery={setQuery} />

      {/* Header */}
      <div className='px-8 pt-6'>
        <h1 className='text-3xl font-bold text-gray-800'>My Notes</h1>
        <p className='text-gray-500 mt-1'>Manage your thoughts efficiently ✨</p>
      </div>

      {/* Notes Grid */}
      <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <div 
              key={note._id}
              className='transform hover:scale-105 transition duration-300'
            >
              <NoteCard 
                note={note}
                onEdit={onEdit}
                deleteNote={deleteNote}
              />
            </div>
          ))
        ) : (
          <div className='col-span-full flex flex-col items-center justify-center mt-20'>
            <h2 className='text-xl font-semibold text-gray-600'>No Notes Found</h2>
            <p className='text-gray-400 mt-2'>Start by adding a new note ✍️</p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setModalOpen(true)}
        className='fixed bottom-6 right-6 bg-gradient-to-r from-teal-500 to-green-500 
        text-white text-3xl w-14 h-14 rounded-full shadow-lg flex items-center 
        justify-center hover:scale-110 hover:shadow-2xl transition duration-300'>
        +
      </button>

      {/* Modal */}
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  )
}

export default Home