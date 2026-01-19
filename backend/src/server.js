import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import notesRoutes from './routes/notesRoutes.js'
import ChatRoutes from './routes/ChatRoutes.js'
import {connectDB} from './config/db.js'
import ratelimiter from "./middleware/rateLimmiter.js"

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(ratelimiter)
app.use("/api/notes", notesRoutes)
app.use("/api/chat", ChatRoutes)
connectDB().then(() => {
    app.listen(PORT, (req, res) => {
    console.log(`server is running at ${PORT}`)
})
})



