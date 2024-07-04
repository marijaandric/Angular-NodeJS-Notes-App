const NoteModel = require("../models/note");
const { $where } = require("../models/note")
var ObjectId = require('mongoose').Types.ObjectId;

var find = function()
{
    return NoteModel.find().populate('author')
}

var findById = function(id)
{
    if (ObjectId.isValid(id))
        return NoteModel.findOne({_id: id}).populate('author')
    else
        return undefined;
}

var findNotesByAuthorId = function(authorId) {
    if (ObjectId.isValid(authorId)) {
        return NoteModel.find({ author: authorId }).exec().then(notes => notes || []);
    } else {
        return Promise.reject(new Error('Invalid author ID'));
    }
};

var findRandomNotes = function() {
    return NoteModel.aggregate([
        { $sample: { size: 10 } }
    ]).exec();
};

var findPublicNotes = function(type) {
    return NoteModel.find({ public: type }).exec();
};

var findNotesByPriorityAndAuthor = function(priority, authorId) {
    return NoteModel.find({ priority: priority, author: authorId }).exec();
};

var save = function(body)
{
    if (body.title && body.note && body.author)
    {
        return NoteModel.saveNote({
            title:body.title,
            date: body.date,
            author: body.author,
            note: body.note,
            type: body.type
        })
    }
    else return false;
}

module.exports = {
    find,
    findById,
    save,
    findNotesByAuthorId,
    findRandomNotes,
    findPublicNotes,
    findNotesByPriorityAndAuthor
}