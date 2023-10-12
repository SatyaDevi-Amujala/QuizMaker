const  mongoose=require('mongoose');
const quizSchema=new mongoose.Schema({
    email:
    {type:String,
    required:true},
    quizname:{
        type:String,
        required:true},
    question:{
        type:Array,
        required:true},  
})
module.exports=mongoose.model("quizSchema", quizSchema);