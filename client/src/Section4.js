import {React,useState,useRef} from 'react';
import {PiDotsSixVerticalBold} from 'react-icons/pi';
import {BsCircleFill,BsCircle} from 'react-icons/bs';
import {RxCross1} from 'react-icons/rx';
import axios from 'axios';
import './section4.css';

const Section4 = (props) => {


  const [cat,setCat]=useState([""]);
  const [catdata,setCatdata]=useState("");
  const [points,setPoints]=useState(0);
  const [answer,setAnswer]=useState(" ");
  const [ques,setQues]=useState("")
  const dragItem=useRef(null);
  const dragOverItem=useRef(null);
  const [pass,setPass]=useState([[""],[],[],[],[]])

 
  if(props.value==true && pass[0]==""){
    cat.map((item,index)=>{
    if(item==''){
      cat.splice(index,1);
    }
  })
  pass[0]="Section4";
    pass[1]=ques;
    pass[2]=cat;
    pass[3]=answer;
    pass[4]=points;
    console.log("1=",pass)
  
   
axios.post("http://localhost:5000/add4data",pass).then(
  res=>{
    console.log("respose Data==",res.data)
  }
)
  console.log("Quiz Created");
  console.log(answer,cat,ques);
}
  const handleSort = () =>{
    
    let _Cat=[...cat]
    let draggedItem=_Cat.splice(dragItem.current,1)[0];
   _Cat.splice(dragOverItem.current,0,draggedItem);
    dragItem.current=null;
   dragOverItem.current=null;
   setCat(_Cat)
  }

  
  const clickHandler=(index)=>{
    let _cat=[...cat]
      _cat.splice(index,1)
  setCat(_cat)
  }
  const answerHandler=(item)=>{
    setAnswer(item);
   // console.log("=========",answer);
  }
  const answerHandler1=(item)=>{
    setAnswer(" ");
   // console.log("=========",answer);
  }
  const changeHandler=(e)=>{
    setCatdata(e.target.value);
 cat[e.target.name]=e.target.value;
 let _filter=(cat.filter(item=> item==""))
 
  if(_filter.length==0){
   cat.push('')
  }
   
 }
 
  return (
    
      <div  className="container mt-3 bdy3"> 
   
   <div>
     
 <h3>Section 4</h3>
     
   <div  className="form-outline"style={{display:"flex"}}>
  <input type ="text" value={ques} onChange={(e)=>{setQues(e.target.value)}} className="form-control input4"/><input type ="text" value={points} onChange={(e)=>{setPoints(e.target.value)}} placeholder="Enter Marks" className="form-control inputl" required/></div>
 
 <h5>Options</h5>
  
   {cat.map((item,index)=>
    <div style={{display:"flex"}} draggable
    onDragStart={(e) =>dragItem.current=index}
    onDragEnter={(e) =>dragOverItem.current=index} 
    onDragEnd={handleSort}
    onDragOver={(e) => e.preventDefault()}>
   <h4> <PiDotsSixVerticalBold/></h4>
   {item==answer? <h5 type="button" className="m-1" onClick={()=>{answerHandler1(item)}}> <BsCircleFill/></h5>:<h5 type="button" className="m-1" onClick={()=>{answerHandler(item)}}> <BsCircle/></h5>}
     
  
     <input type="text" className="cat4 mb-2" value={item}  name={index} onChange={changeHandler}/>
   {item.length> 0?  <h4 type="button" onClick={()=>{clickHandler(index)}}> <RxCross1/> </h4>:""}
    </div> 
     )}</div></div>
    
  )
}

export default Section4
