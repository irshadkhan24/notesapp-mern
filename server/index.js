import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToMongoDB from './db/db.js'
import authRouter from './routes/auth.js'
import noteRouter from './routes/note.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors({
    origin: "*"
}))

app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/note', noteRouter)

// Test Route
app.get('/', (req, res) => {
    res.send("Backend is running")
})

// Start Server
const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
    await connectToMongoDB()
    console.log(`Server is running on port ${PORT}`)
})