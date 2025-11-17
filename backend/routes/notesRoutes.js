import express from "express";
import { getAllNotes, createNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes); 

router.post("/", createNote); 

router.put("/:id", (req, res) => {
res.status(200).json({message:"note updated successfully !"});
});

router.delete("/:id", (req, res) => {
res.status(200).json({message:"note delete successfully !"});
});

export default router;


