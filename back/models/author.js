const mongoose =  require("mongoose")
const BookModel = require("./note")

var AuthorSchema = mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    yearOfBirth: {type: Number, required: true},
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book"
        }
    ]
})

var AuthorModel = mongoose.model('author', AuthorSchema)

AuthorModel.saveAuthor = async function(author)
{
    var newAuthor = new AuthorModel(author)
    var result = await newAuthor.save()

    if (result)
        return true;
    else
        return false;
}

module.exports = AuthorModel