var AuthorModel = require("../models/author")
var ObjectId = require('mongoose').Types.ObjectId;

var getAll = function()
{
    return AuthorModel.find()
}

var getById = function(id)
{
    if (ObjectId.isValid(id))
        return AuthorModel.findById(id).populate('books')
    else
        return undefined;
}

var saveAuthor = function(author)
{
    if (author.name && author.surname && author.yearOfBirth)
    {
        return AuthorModel.saveAuthor({
            name: author.name,
            surname: author.surname,
            yearOfBirth: author.yearOfBirth,
            books: []
        })
    }
}
module.exports = {
    saveAuthor,
    getAll,
    getById
}