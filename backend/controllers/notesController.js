export function getAllNotes(req, res)  {
    res.status(200).send("you just fetched the notes ");
};

export function createNote (req, res)  {
    res.status(200).json({message: "Note ceated successfully!"});
};