import {React,useState,useEffect} from 'react'
import {BsCircleFill,BsCircle} from 'react-icons/bs';
import axios from 'axios';
//import {store} from './Result';

const Answer4 = (props) => {
 // const [marks,setMarks]=useContext(store);

    const [cat,setCat]=useState([])
    const [ques,setQues]=useState("");
    const [cans,setCans]=useState("");
    const [ans,setAns]=useState("");
    const [marks,setMarks]=useState([-1]);

useEffect(()=>{
  setQues(props.arr[1])
  setCat(props.arr[2])
  setCans(props.arr[3])
},[])
if(props.bin==true && marks[0]==-1){
  marks[0]=1
  console.log("..............Answer4","correct",cans,ans);
  if(ans==cans){
  console.log("4 is true")
  axios.post("http://localhost:5000/marks",[props.arr[4],"ans4"]).then(
    res=>{
      console.log("respose Data==",res.data)
    }
  )}
}

    const answerHandler=(item)=>{
        setAns(" ");
    }
    const answerHandler1=(item)=>{
        setAns(item);
    }
    //console.log("Answer=",ans)
  return (
    <div>
     <h4>Question {props.indi}</h4>
     <div className="container">
      <h5 className="container p-1 mt-3" style={{border:"2px solid gray",borderRadius:"15px"}}>{ques}</h5>
      
      {cat.map((item)=>
        <div style={{display:"flex"}} >
         {item==ans? <h5 type="button" style={{paddingRight:"5px",marginTop:"5px"}} onClick={()=>{answerHandler(item)}}> <BsCircleFill/></h5>:<h5 type="button" className=""  style={{paddingRight:"5px",marginTop:"5px"}}onClick={()=>{answerHandler1(item)}}> <BsCircle/></h5>}
     <div className="mt-2 ml-5">{item}</div></div>
      )}</div>
    </div>
  )
}

export default Answer4
