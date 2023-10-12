const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const detailSchema=require('./model1.js');
const quizSchema=require('./model.js')
const app=express();


var question=[[]];
var mark=0;
mongoose.connect('mongodb+srv://satya:satya401@cluster0.kike3w4.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>
        console.log("DB Connected")
    
)
app.use(express.json())
app.use(cors({
    origin:'*'
}))



app.post("/setdata", async(req,res)=>{
 
    try{
        const [email,quizname]=req.body;
        console.log("request",req.body)
        console.log("BIGGGGGG",question,"BIIIGGGGG")
        let newData=new quizSchema({
            email,quizname,question
        }
            )
        await newData.save()
        return res.status(200).send("QuizCreated")
       
    }
    catch(err){
        console.log(err)
    }
})
app.post("/add1data", async(req,res)=>{
    try{
        question.push(req.body)
    }
    catch(err){
        console.log(err)
    }
})
app.post("/add2data", async(req,res)=>{
    try{
        //console.log("request Body2=",req.body)
       
        question.push(req.body)
       // console.log("BIGGGGGG2",b,"BIIIGGGGG")
    }
    catch(err){
        console.log(err)
    }
})
app.post("/add3data", async(req,res)=>{
    try{
        //console.log("request Body3=",req.body)
      
        question.push(req.body)
       // console.log("BIGGGGGG3",b,"BIIIGGGGG")
    }
    catch(err){
        console.log(err)
    }
})
app.post("/add4data", async(req,res)=>{
    try{
       // console.log("request Body4=",req.body)
        question.push(req.body)
        //console.log("BIGGGGGG4",b,"BIIIGGGGG")
       // console.log("request email=",a)
    }
    catch(err){
        console.log(err)
    }
})
app.post("/add5data", async(req,res)=>{
    try{
       // console.log("request Body5=",req.body)
        question.push(req.body)
        //console.log("BIGGGGGG5",b,"BIIIGGGGG")
    }
    catch(err){
        console.log(err)
    }
})
app.post('/getdata', async(req,res)=>{
    try{
        const [email,name]=req.body;
        console.log("DDAAATTA",req.body,"email and name",email,name);
        let exist=await quizSchema.find({email:email,quizname:name},{question:true,_id:false});
        console.log("total question",exist)
     
        return res.send(exist);
    }
    catch(err){
        res.send(err)
    }
})
app.post("/register",async(req,res)=>{
    try{
    const {name,email,pswd,cpswd}=req.body;
    console.log("data::::::",name,email,pswd,cpswd)
    
    let exists=await detailSchema.findOne({email:email})
    if(exists){
        res.send("Email Already Exists")
    }
    let newData=new detailSchema({
        name,email,pswd,cpswd
    }
        )
    await newData.save()
    return res.status(200).send("Registered")
   }
    catch(err){
        console.log(err)
    }
})
app.post('/dashboard',async(req,res)=>{
    try{
        console.log("req.body",req.body);
        const [email]=req.body;
        console.log("gggg",email)
        let exist=await quizSchema.find({email:email},{quizname:true,_id:false});
        console.log("quizNames",exist);
        if(exist.length > 0){
            console.log("err")  
        return res.send(exist);}
    else{
        console.log("empty")  
    return res.send("empty");}
    }
    catch(err){
        console.log(err)  
    }
})
app.post('/login', async(req,res)=>{
    try{
        const{email,password}=req.body;
        let exist=await detailSchema.findOne({email});
        if(!exist){
            return res.send("User  Not Found");
        }
        if(exist.pswd!=password){
            return res.send("Invalid credentials");
        }
        return res.send(["Login",exist.name,exist.email])
    }
    catch(err){
        console.log(err)
       return  res.send("Server error")
    }
})
app.post("/marks", async(req,res)=>{
    try{
      
        mark=mark+Number(req.body[0])
        console.log("MMMAAARRKKKSS",mark,req.body[1])
        //console.log("BIGGGGGG5",b,"BIIIGGGGG")
    }
    catch(err){
        console.log(err)
    }
})
app.get("/getmarks", async(req,res)=>{
    try{
        console.log("Marks==",mark)
        if(mark==0)
     return res.send([mark])
     else
     return res.send([mark])
    
    }
    catch(err){
        console.log(err)
    }
})

app.listen(5000, ()=>console.log("Server Connected"))