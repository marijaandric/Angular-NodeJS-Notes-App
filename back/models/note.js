const mongoose =  require("mongoose")
var AuthorModel = require('./author')
const UserModel = require("./user")

var NoteSchema = mongoose.Schema({
    title: {type: String, required: true},
    dateEnd: { type: Date }, 
    date: { type: Date, default: Date.now },
    author: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    note: {type: String},
    type: {type: Number},
    priority: {type: Number},
    public: {type: Boolean}
})

var NoteModel = mongoose.model('notes', NoteSchema)

module.exports = NoteModel