import express from "express";
import { getAllChats, sendMessage } from "../controllers/chatController.js";

const router = express.Router();

router.get("/", getAllChats);
router.post("/", sendMessage);

export default router;
