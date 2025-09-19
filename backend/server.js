import express from "express";

const app = express();

app.get("/api/notes", (req, res) => {
    res.send("you got 20 notes");
});

app.listen(5001, () => {
    console.log("server started pm PORT:5001");
});