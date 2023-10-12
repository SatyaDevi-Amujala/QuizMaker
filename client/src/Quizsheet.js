import {React,useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import {FcPlus} from 'react-icons/fc';
import {ImQuestion} from 'react-icons/im';
import {MdDeleteForever} from 'react-icons/md';
import Section1 from './Section1.js';
import Section2 from './Section2.js';
import Section3 from './Section3.js';
import Section4 from './Section4.js';
import Section5 from './Section5.js';
import match from './match.mp4';
import axios from 'axios';
import categorize from './categorize.mp4';
import cloze from './cloze.mp4';
import MCA from './MCA.mp4';
import MCQ from './MCQ.mp4';
import './App.css';


const Quizsheet = () => {
const [boo,setBoo]=useState(false);

const [pass,setpass]=useState(['','']);
const [dropdown,setDropdown]=useState([''])
  const [section1,setSection1]=useState([1]);
  const [vid1,setVid1]=useState(1);
  const [section2,setSection2]=useState([1]);
  const [vid2,setVid2]=useState(1);
  const [section3,setSection3]=useState([1]);
  const [vid3,setVid3]=useState(1);
  const [section4,setSection4]=useState([1]);
  const [vid4,setVid4]=useState(1);
  const [section5,setSection5]=useState([1]);
  const [vid5,setVid5]=useState(1);
  let location=useLocation();
  var uname=location.state.name;
  var email=location.state.email;
  let navigate=useNavigate();

 
 


  const submithand = () =>{
    if(boo != true){
      alert("Please Save the questions");
    }
    else{
    pass[0]=email;
    pass[1]=uname;
    
    axios.post("http://localhost:5000/setdata",pass).then(
res=>{
  console.log("respose Data==",res.data)
}
)
navigate('/Questionsheet',{state:{email:email,name:uname}});

}

  }


  const addHandler1 = (index) =>{
setSection1([...section1,section1.length+1 ])
 }
  const deleteHandler1 = (index) =>{
    let _section1=[...section1];
   
_section1[index]=" ";
setSection1(_section1);
  }
    const addHandler2 = (index) =>{
   setSection2([...section2,section2.length+1 ])
 }
  const deleteHandler2 = (index) =>{
    let _section2=[...section2];
   
_section2[index]=" ";
setSection2(_section2);
  }
    const addHandler3 = (index) =>{
   setSection3([...section3,section3.length+1 ])
 }
  const deleteHandler3 = (index) =>{
    let _section3=[...section3];
   
_section3[index]=" ";
setSection3(_section3);
  }
    const addHandler4 = (index) =>{
   setSection4([...section4,section4.length+1 ])
 }
  const deleteHandler4 = (index) =>{
    let _section4=[...section4];
   
_section4[index]=" ";
setSection4(_section4);
  }
    const addHandler5 = (index) =>{
   setSection5([...section5,section5.length+1 ])
 }
  const deleteHandler5 = (index) =>{
    let _section5=[...section5];
   
_section5[index]=" ";
setSection5(_section5);
  }
 console.log("dropdown",dropdown)
  return (
    <div style={{backgroundColor:"white"}}>
    
        
     <div className="container ">
      <center>
   <h1>QUIZ MAKER</h1>
   <h1>{location.uname}</h1>
   <div className="dropdown">
  <button className="dropbttn1">Select Question</button>
  <div className="dropdown-content">
  <h5 type="button"  onClick={()=>{setDropdown([...dropdown,"categorize"])}} >Categorize</h5>
    <h5 type="button" onClick={()=>{setDropdown([...dropdown,"cloze"])}} >Cloze</h5>
    <h5 type="button" onClick={()=>{setDropdown([...dropdown,"match"])}} >Match</h5>
    <h5  type="button" onClick={()=>{setDropdown([...dropdown,"MCQ"])}} >MCQ</h5>
    <h5 type="button" onClick={()=>{setDropdown([...dropdown,"MCA"])}} >MCA</h5>
  </div>
</div></center>
</div>

{dropdown.map((item)=>
  <div>
{item=="categorize"?
<div>  {section1.map((item,index)=>
<div>{index==section1[index]-1?
     
         <div style={{display:"flex"}}><Section1 value={boo}/> {vid1%2==0?<div style={{margin:"15px"}}><video width="420" height="250" controls autoplay="autoplay" >
         <source src={categorize} type="video/mp4"/>
     </video></div>:""}
         <div><h4 style={{height:"50px",marginTop:"40px"}}type="button" onClick={()=>setVid1(vid1+1)}> <ImQuestion/> </h4> 
          <h4 style={{height:"50px",marginRight:"10px"}}type="button" onClick={()=>{addHandler1(index)}}> <FcPlus/> </h4>
         <h4 style={{height:"50px",width:"40px",marginRightt:"10px"}}type="button" onClick={()=>{deleteHandler1(index)}}> <MdDeleteForever/> </h4>
        
          </div></div>
      :" " } </div>)}</div>:""}
      
      {item=="cloze"?
 <div>

       {section2.map((item,index)=>
<div>{index==section2[index]-1?
     
         <div style={{display:"flex"}}><Section2 value={boo}/> {vid2%2==0?<div style={{margin:"15px"}}><video width="420" height="250" controls autoplay="autoplay" >
         <source src={cloze} type="video/mp4"/>
     </video></div>:""}
         <div><h4 style={{height:"50px",marginTop:"40px"}}type="button" onClick={()=>setVid2(vid2+1)}> <ImQuestion/> </h4> 
          <h4 style={{height:"50px",marginRight:"10px"}}type="button" onClick={()=>{addHandler2(index)}}> <FcPlus/> </h4>
         <h4 style={{height:"50px",width:"40px",marginRightt:"10px"}}type="button" onClick={()=>{deleteHandler2(index)}}> <MdDeleteForever/> </h4>
        
          </div></div>
      :" " } </div>)}</div>:""}

      {item=="match"?
      <div>
      {section3.map((item,index)=>
<div>{index==section3[index]-1?
     
         <div style={{display:"flex"}}><Section3 value={boo}/> {vid3%2==0?<div style={{margin:"15px"}}><video width="420" height="250" controls autoplay="autoplay" >
         <source src={match} type="video/mp4"/>
     </video></div>:""}
         <div><h4 style={{height:"50px",marginTop:"40px"}}type="button" onClick={()=>setVid3(vid3+1)}> <ImQuestion/> </h4> 
          <h4 style={{height:"50px",marginRight:"10px"}}type="button" onClick={()=>{addHandler3(index)}}> <FcPlus/> </h4>
         <h4 style={{height:"50px",width:"40px",marginRightt:"10px"}}type="button" onClick={()=>{deleteHandler3(index)}}> <MdDeleteForever/> </h4>
        
          </div></div>
      :" " } </div>)}</div>:""}

      {item=="MCQ"?
      <div>
       {section4.map((item,index)=>
<div>{index==section4[index]-1?
     
         <div style={{display:"flex"}}><Section4 value={boo}/> {vid4%2==0?<div style={{margin:"15px"}}><video width="420" height="250" controls autoplay="autoplay" >
         <source src={MCQ} type="video/mp4"/>
     </video></div>:""}
         <div><h4 style={{height:"50px",marginTop:"40px"}}type="button" onClick={()=>setVid4(vid4+1)}> <ImQuestion/> </h4> 
          <h4 style={{height:"50px",marginRight:"10px"}}type="button" onClick={()=>{addHandler4(index)}}> <FcPlus/> </h4>
         <h4 style={{height:"50px",width:"40px",marginRightt:"10px"}}type="button" onClick={()=>{deleteHandler4(index)}}> <MdDeleteForever/> </h4>
        
          </div></div>
      :" " } </div>)}</div>:""}


      {item=="MCA"?
      <div>
       {section5.map((item,index)=>
<div>{index==section5[index]-1?
     
         <div style={{display:"flex"}}><Section5  value={boo}/> {vid5%2==0?<div style={{margin:"15px"}}><video width="420" height="250" controls autoplay="autoplay" >
         <source src={MCA} type="video/mp4"/>
     </video></div>:""}
         <div><h4 style={{height:"50px",marginTop:"40px"}}type="button" onClick={()=>setVid5(vid5+1)}> <ImQuestion/> </h4> 
          <h4 style={{height:"50px",marginRight:"10px"}}type="button" onClick={()=>{addHandler5(index)}}> <FcPlus/> </h4>
         <h4 style={{height:"50px",width:"40px",marginRightt:"10px"}}type="button" onClick={()=>{deleteHandler5(index)}}> <MdDeleteForever/> </h4>
        
          </div></div>
      :" " } </div>)}</div>:""}</div>)}


<center>  <div> <button className="btn btn-primary m-3" onClick={()=>{setBoo(true)}}>Save</button></div>
<div> <button className="btn btn-primary mb-3" onClick={()=>{submithand()}}>Create Quiz </button></div>
</center>
    </div>
  )
}

export default Quizsheet

