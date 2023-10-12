import {React,useState,useRef} from 'react';
import {PiDotsSixVerticalBold} from 'react-icons/pi';
import {BsFillCheckSquareFill,BsSquare} from 'react-icons/bs';
import {RxCross1} from 'react-icons/rx';
import axios from 'axios';
import './Section5.css';

const Section4 = (props) => {


  const [cat,setCat]=useState([""]);
  const [points,setPoints]=useState(0);
  const [catdata,setCatdata]=useState("");
  const [answer,setAnswer]=useState([" "]);
  const dragItem=useRef(null);
  const [ques,setQues]=useState("")
  const dragOverItem=useRef(null);
  const [pass,setPass]=useState([[""],[],[],[],[]])

 
  if(props.value==true && pass[0]==""){
    cat.map((item,index)=>{
      if(item==''){
        cat.splice(index,1);
      }
    })
    answer.map((item,index)=>{
      if(item==" "){
        answer.splice(index,1);
      }
    })
    pass[0]="Section5";
    pass[1]=ques;
    pass[2]=cat;
    pass[3]=answer;
    pass[4]=points;
    console.log("1=",pass)
  
   
axios.post("http://localhost:5000/add5data",pass).then(
  res=>{
    console.log("respose Data==",res.data)
  }
)
    console.log("Quiz Ceated");
    console.log(answer,cat,ques);
  }
  const handleSort = () =>{
    
    let _Cat=[...cat]
    let _ans=[...answer]
    let draggedItem=_Cat.splice(dragItem.current,1)[0];
    let answerItem=_ans.splice(dragItem.current,1)[0];
   _Cat.splice(dragOverItem.current,0,draggedItem);
   _ans.splice(dragOverItem.current,0,answerItem);
    dragItem.current=null;
   dragOverItem.current=null;
   setCat(_Cat)
   setAnswer(_ans)
  }

  
  const clickHandler=(index)=>{
    let _cat=[...cat]
      _cat.splice(index,1)
  setCat(_cat)
  let _ans=[...answer]
  _ans.splice(index,1);
  setAnswer(_ans);
  //console.log("=========after deletion",answer);
  }
  const answerHandler=(index,item)=>{
    let _ans=[...answer]
    if(_ans[index]==" ")
    _ans[index]=item;
  setAnswer(_ans);
  // console.log("=========",answer);
}
    //let _answer=(answer.filter(item=> item==item1))
    //if(_answer.length==0){
      //  answer.push(item1);
   // }
    const answerHandler1=(index)=>{
       //let ind= answer.indexOf(item1);
       let _ans=[...answer];
       _ans.splice(index,1);
       setAnswer(_ans);
       // console.log("=========",answer);
   }
   
    
  
  const changeHandler=(e)=>{
    setCatdata(e.target.value);
 cat[e.target.name]=e.target.value;
 answer[e.target.name]=" ";
 let _filter=(cat.filter(item=> item==""))
 
  if(_filter.length==0){
   cat.push('')
   answer.push(" ")
  }
   
 }
// console.log("=========",answer);
 //console.log("---------",cat);
  return (
   
      <div className="container mt-3 bdy4"> 
   
   <div>
     
 <h3>Section 5</h3>
     
   <div  className="form-outline" style={{display:"flex"}}>
  <input type ="text" value={ques} onChange={(e)=>{setQues(e.target.value)}} className="form-control input1"/><input type ="text" value={points} placeholder="Enter Marks" onChange={(e)=>{setPoints(e.target.value)}} className="form-control inputl required"/>
 </div>
 <h5>Options</h5>

   {cat.map((item,index)=>
    <div style={{display:"flex"}} draggable
    onDragStart={(e) =>dragItem.current=index}
    onDragEnter={(e) =>dragOverItem.current=index} 
    onDragEnd={handleSort}
    onDragOver={(e) => e.preventDefault()}>
   <h4> <PiDotsSixVerticalBold/></h4>
 {item==answer[index]? <h5 type="button" className="m-1" onClick={()=>{answerHandler1(index,item)}}> <BsFillCheckSquareFill/></h5>:<h5 type="button"  className="m-1" onClick={()=>{answerHandler(index,item)}}> <BsSquare/></h5>}
     <input type="text" className="cat mb-2" value={item}  name={index} onChange={changeHandler}/>
   {item.length> 0?  <h4 type="button" onClick={()=>{clickHandler(index)}}> <RxCross1/> </h4>:""}
    </div> 
     )}</div></div>
 
  )
}

export default Section4
