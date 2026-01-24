import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import notesRoutes from './routes/notesRoutes.js'
import ChatRoutes from './routes/ChatRoutes.js'
import authRoutes from './routes/authRoutes.js'
import {connectDB} from './config/db.js'
import ratelimiter from "./middleware/rateLimmiter.js"

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
const __dirname = path.resolve();
app.use(express.json())
if(process.env.NODE_ENV !== "production"){}
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(ratelimiter)
app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)
app.use("/api/chat", ChatRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/^\/(.*)$/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist","index.html"));
  });
}
connectDB().then(() => {
    app.listen(PORT, (req, res) => {
    console.log(`server is running at ${PORT}`)
})
})



