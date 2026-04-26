import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middleware/middleware.js'

const router = express.Router()

router.post('/add', middleware, async (req, res) => {
     try {
           const {title, description} = req.body;
           
           const newNote = new Note({
               title, description, userId: req.user.id
           })
   
           await newNote.save()
   
           return res.status(200).json({success: true, message: "Note Created Successfully"})
   
       } catch(error) {
           console.log(error.message) /* Show error in console on server side*/
           return res.status(500).json({success: true, message: "Error in Adding Note"}) /* Server Error */
       }
})
/* display the notes in portal*/
router.get('/', middleware, async (req, res) => {
    try {
        console.log("sld" + req.user)
        const notes = await Note.find({userId: req.user.id})
        return res.status(200).json({success: true, notes})
    } catch(error) {
        return res.status(500).json({success: false, message: "Cant retrive notes"})
    }
})
router.put("/:id", middleware, async (req, res) => {
     try {
        const {id} = req.params;
        const updateNote = await Note.findByIdAndUpdate(id, req.body)
        return res.status(200).json({success: true, updateNote})
    } catch(error) {
        return res.status(500).json({success: false, message: "Cant update notes"})
    }
})

// delete concepts
router.delete("/:id", middleware, async (req, res) => {
     try {
        const {id} = req.params;
        const updateNote = await Note.findByIdAndDelete(id)
        return res.status(200).json({success: true, updateNote})
    } catch(error) {
        return res.status(500).json({success: false, message: "Cant delete notes"})
    }
})

export default router;