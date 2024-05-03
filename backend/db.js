const mongoose = require('mongoose');

mongoose.connect('')
 
const userschema =  mongoose.Schema({
    username : String,
    password : String,
    firstname: String,
    lastname : String
});

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model("Account", accountSchema );
const User = mongoose.model("User", userschema );

module.exports = { User , Account };