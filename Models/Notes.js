const mongoose = require('mongoose');
const {Schema} = mongoose;
const Noteschema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        
        },

        tag:{
            type:String,
            default:'General'
            },
})

const notesdb=mongoose.model('note',Noteschema);
module.exports= notesdb;