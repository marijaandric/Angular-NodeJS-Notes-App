const express = require("express")
const config = require("./config/config")
var cors = require('cors')

const app = express()

// app.use(cors({
//     origin: 'http://localhost:4200'
// }))

app.use(cors());

const mongoose = require("mongoose")
mongoose.connect(config.dbConnection)

const noteRoutes = require("./routes/note")
const authRoutes = require("./routes/auth")
const authorRoutes = require("./routes/author")

// static built angular
const path = require('path');
app.use('/angular', express.static(path.join(__dirname, 'angular')));

app.use(express.json())
app.use("/auth", authRoutes)
app.use("/note",noteRoutes)
app.use("/author", authorRoutes)

app.get("/", (req, res)=>{
    res.send("Hello World!")
})

app.listen(config.port, ()=>{
    console.log("Server listening on port: "+config.port)
})