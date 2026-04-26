import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'   // ✅ ADD THIS
import connectToMongoDB from './db/db.js';
import authRouter from './routes/auth.js';
import noteRouter from './routes/note.js';

dotenv.config();   // ✅ ADD THIS (VERY IMPORTANT)

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/note', noteRouter)

app.listen(process.env.PORT || 5000, () => {
    connectToMongoDB()
    console.log("Server is running on port 5000")
})