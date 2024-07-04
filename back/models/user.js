const mongoose = require("mongoose")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const config = require("../config/config")

var UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    admin: { type: Boolean },
    hash: { type: String },
    salt: { type: String }
})

UserSchema.methods.savePassword = function(password)
{
    this.salt = crypto.randomBytes(16).toString("hex")
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000,64, "sha512").toString("hex")
}

UserSchema.methods.validatePassword = function(password)
{
    hash = crypto.pbkdf2Sync(password, this.salt, 1000,64, "sha512").toString("hex")
    return hash === this.hash
}

UserSchema.methods.generateJwt = function()
{
    var expire = new Date()
    expire.setDate(expire.getDate()+7)

    return jwt.sign({
        _id:this._id,
        _expire: parseInt(expire.getTime()/1000)
    }, config.secret)
}

UserSchema.methods.getRole = function()
{
    if (this.admin)
    {
        return "ADMIN";
    }
    else
    {
        return "USER"
    }
}

var UserModel = mongoose.model("user", UserSchema)

UserModel.register = async function(username, name, password)
{
    var existingUser = await UserModel.findOne({ username: username });
    if (existingUser) {
        return null;
    }

    var user = new UserModel({
        username:username,
        name:name,
        admin: false
    })

    user.savePassword(password)
    var result = await user.save()
    if (result)
        return user
    else
        return undefined

}

module.exports = UserModel