import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// Is the correct model name
const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema);

export default Note;
