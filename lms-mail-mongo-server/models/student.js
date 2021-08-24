const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    emailAddress: {
        type: String
    },
    emails: []

})

module.exports = mongoose.model('user', UserSchema)