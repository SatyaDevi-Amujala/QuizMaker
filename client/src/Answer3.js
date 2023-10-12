import {React,useState,useRef,useEffect} from 'react';
import {LiaUndoAltSolid} from 'react-icons/lia'
import axios from 'axios';
//import {store} from './Result';
import './Answer3.css';

const Answer3 = (props) => {
  //const [marks,setMarks]=useContext(store);
   const [col1,setCol1]=useState( []);
   const [col1d,setCol1d]=useState([]);
const [ind,setInd]=useState([])
const [ques,setQues]=useState("");
   const [col2,setCol2]=useState( []);
   const [col2d,setCol2d]=useState([]);
   const dataindex=useRef(null);
   const [marks,setMarks]=useState([-1]);

   useEffect(()=>{
setQues(props.arr[1])
    setCol1(props.arr[2])
    setCol2(props.arr[3])
    setInd(props.arr[4])
    col1.map((a) =>{
    if(col1.length>col1d.length){
      //console.log("col1=",a)
      col1d.push(" ");}
    })
    col2.map((a)=>{
      if(col2.length>col2d.length){
      //console.log("col2",a)
    col2d.push(" ");}
    })
   },[]);

   if(props.bin==true && marks[0]==-1){
    marks[0]=1;
    setMarks(props.arr[5])
    console.log("..............Answer3","col1d",col1d,"col2d",col2d,"col2",col2,"col1",col1,ind);
   let fill= col2d.filter((item,index)=>
        col1d.indexOf(item)+1 == ind[index]
    )
    if(fill.length==col1.length){
    console.log("match=== true")
    axios.post("http://localhost:5000/marks",[props.arr[5],"ans3"]).then(
      res=>{
        console.log("respose Data==",res.data)
      }
    )}
  }
   const drop=(index)=>{
    let _col1d=[...col1d];
_col1d[dataindex.current]=col1[dataindex.current];
setCol1d(_col1d)
let _col2d=[...col2d];
_col2d[index]=col1[dataindex.current];
setCol2d(_col2d)

   }
   const resetHandler = ()=>{
   
    setCol1d([]);
    setCol2d([]);
    col1.map((a) =>{
      if(col1.length>col1d.length){
        //console.log("col1=",a)
        col1d.push(" ");}
      })
      col2.map((a)=>{
        if(col2.length>col2d.length){
       // console.log("col2",a)
      col2d.push(" ");}
      })
    }
//console.log("col1=",col1,"col1d=",col1d,"col2=",col2,"col2d=",col2d);
  return (
    <div>
      <h4>Question {props.indi}</h4>
      <div style={{display:"flex"}}>
       <h5 className="container p-1 ques2 mt-3">{ques}</h5><h4 style={{margin:"5px 5px 5px 25px",padding:"8px"}} type="button" onClick={()=>{resetHandler()}} ><LiaUndoAltSolid/></h4></div>
     
  <center>
    <h5>{col1d}{col2d}</h5>
     <table>
      <tr>
      <center>
      <td style={{ padding:"35px"}}>
       
        <h4 className="mb-5">Column 1</h4> 
        
        {col1.map((item,index)=>
        <div>
        {item==col1d[index]?
        <div draggable onDragStart={()=>{dataindex.current=index}} className="container col1"style={{opacity:"0.2"}} ><center>{item}</center></div>
       
        :<div draggable onDragStart={()=>{dataindex.current=index}} className="container col1"><center>{item}</center></div>
}</div>)}
        </td> 
        <td style={{ padding:"35px"}}>
        <h4 className="mb-5">Column 2</h4> 
        {col2.map((item,index)=>
        <div>
          {col1.includes(col2d[index])?
        <div droppable onDragOver={(e)=>{e.preventDefault();}} onDrop={()=>{drop(index)}}  className="container "><center><div className="match">{item}</div><div style={{color:"gray"}}>{col2d[index]}</div></center></div>
        
       : <div droppable onDragOver={(e)=>{e.preventDefault();}} onDrop={()=>{drop(index)}}  className="container col2"><center>{item}</center></div>
      } </div>
         
        )}</td>  </center>
  </tr> </table></center>
    </div>
  )
}

export default Answer3
