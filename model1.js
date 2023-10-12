const mongoose=require('mongoose')
const detailSchema= new mongoose.Schema({
    name:
    {type:String,
     required:true},
    email:
    {type:String,
    unique:true,
    required:true},
    pswd:
    {type:String},
    cpswd:
    {type:String},
})

module.exports=mongoose.model("detailSchema",detailSchema)
