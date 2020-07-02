const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const workersSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    nationalCode:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    IsChief:{
        type:String,
        required:true
    },
    birthday:{
        type:Array,
        required:true
    },
    companyId:{
        type:String,
        required:true
    },
    militaryService:{type:"string"}
},{ collection: 'worker' })
module.exports = mongoose.model('workers', workersSchema);