const mongoose = require('mongoose');

var librarySchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: 'This field is required.'
    },
    author: {
        type: String
    },
    bdomain: {
        type:String
    },
    yob :{
        type:String
    },
    bookA: {
        type: String
    }
});

mongoose.model('Library', librarySchema);