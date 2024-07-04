const express = require("express")
const noteService = require("../services/note")

const passport = require("./config/config")
const NoteModel = require("../models/note")

const router = express.Router()

router.get("/", 
//    passport.authenticate('jwt', {session: false}),
//    passport.log(),
async (req,res)=>{
    console.log(req.headers)
    var books = await noteService.find()
    res.send(books);
})

router.get("/:id",
    //passport.authenticate('jwt', {session: false}),
async (req, res)=>{
    var book = await noteService.findById(req.params.id)
    if (book)
        res.send(book)
    else
    {
        res.status(404)
        res.send()
    }
})

router.get("/authorsnotes/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const authorId = req.params.id;
        const notes = await noteService.findNotesByAuthorId(authorId);
        
        res.status(200).json(notes || []); 
    } catch (error) {
        console.error('Error fetching notes by author:', error);
        res.status(500).send('Internal server error');
    }
});

router.get("/random/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const randomNotes = await noteService.findRandomNotes();
        res.status(200).json(randomNotes || []);
    } catch (error) {
        console.error('Error fetching random notes:', error);
        res.status(500).send('Internal server error');
    }
});

router.get("/public/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const priorityOneNotes = await noteService.findPublicNotes(true);
        res.status(200).json(priorityOneNotes || []);
    } catch (error) {
        console.error('Error fetching priority 1 notes:', error);
        res.status(500).send('Internal server error');
    }
});

router.get("/priority/:priority/author/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const { priority, id } = req.params;
        const priorityOneNotes = await noteService.findNotesByPriorityAndAuthor(priority, id);
        res.status(200).json(priorityOneNotes || []);
    } catch (error) {
        console.error('Error fetching priority 1 notes for author:', error);
        res.status(500).send('Internal server error');
    }
});

router.post('/create', async (req, res) => {
    try {
        const { _id, author, title, date, note, type, priority, endDate, public } = req.body;

        const newNote = new NoteModel({
            _id,
            author,
            title,
            date,
            note,
            type,
            priority,
            endDate,
            public
        });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error('Error creating new note:', error);
        res.status(500).send('Internal server error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const deletedNote = await NoteModel.findByIdAndDelete(req.params.id);
      if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.status(200).json({ message: 'Note deleted successfully', deletedNote });
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { title, note, type, priority, endDate, public } = req.body;
    try {
      const updatedNote = await NoteModel.findByIdAndUpdate(req.params.id, {
        title,
        note,
        type,
        priority,
        endDate,
        public
      }, { new: true });
  
      if (!updatedNote) {
        return res.status(404).send('Note not found');
      }
  
      res.status(200).json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).send('Internal server error');
    }
});

router.post("/", 
    passport.authenticate('jwt', {session: false}),
    // passport.authorizeRoles('ADMIN'),
async (req,res)=>{
    var success = await noteService.save(req.body)
    res.send({success: success})
})

module.exports = router