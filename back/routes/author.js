const express = require("express")
const AuthorService = require("../services/author")

const passport = require("./config/config")

const router = express.Router()

router.get('', async (req,res)=>{
    if (req.query.id)
    {
        var author = await AuthorService.getById(req.query.id)
        console.log(author)
        if (author)
        {
            res.send(author)
        }
        else
        {
            res.status(404)
            res.send()
        }
    }
    else
    {
        var authors = await AuthorService.getAll()
        res.send(authors)
    }
})

router.post('', (req,res)=>{
    var author = AuthorService.saveAuthor(req.body)
    res.send({success:author})
})

module.exports = router