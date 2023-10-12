import { React, useState, useRef } from 'react';
import {PiDotsSixVerticalBold} from 'react-icons/pi';
import {RxCross1} from 'react-icons/rx';
import axios from 'axios';
import './Section3.css';

const Section3 = (props) => {

    const [ind,setInd]=useState([1])
    const [column, setColumn] = useState([""]);
    const [data,setData]=useState("")
    const [points,setPoints]=useState(0);
    const [ques,setQues]=useState("")
    const [data1,setData1]=useState("")
  const [column1, setColumn1] = useState([""]);
  const dragItem=useRef(null);
  const dragOverItem=useRef(null);
  const [pass,setPass]=useState([[""],[],[],[],[],[]])

 
  if(props.value==true && pass[0]==""){
    column.map((item,index)=>{
      if(item==''){
        column.splice(index,1);
        column1.splice(index,1);
        ind.splice(index,1);
      }
    })
    pass[0]="Section3";
    pass[1]=ques;
    pass[2]=column;
    pass[3]=column1;
    console.log("1=",pass)
    pass[4]=ind;
    pass[5]=points;
    console.log("2=",pass)
   
axios.post("http://localhost:5000/add3data",pass).then(
  res=>{
    console.log("respose Data==",res.data)
  }
)
    console.log("Quiz Ceated");
    console.log(column,column1,ind);
  }
  const handleSort = () =>{
    let _ind=[...ind]
    let _column1=[...column1]
    let draggedItem=_column1.splice(dragItem.current,1)[0];
   _column1.splice(dragOverItem.current,0,draggedItem);
   let draggedNum=_ind.splice(dragItem.current,1)[0];
   _ind.splice(dragOverItem.current,0,draggedNum);
    dragItem.current=null;
   dragOverItem.current=null;
   setColumn1(_column1)
   setInd(_ind)
 
  }

  const changeHandler=(e)=>{
    setData(e.target.value);
 column[e.target.name]=e.target.value;
 let _filter=(column.filter(item=> item==""))
 
  if(_filter.length==0){
   column.push('')
  }
   
 }

 const changeHandler1=(e)=>{
    let _ind=[...ind]
   

        if(!(_ind.includes((e.target.name*1)+2))){
            _ind.push((e.target.name*1)+2 )
        }
       
    setInd(_ind)
    
    setData1(e.target.value);
 column1[e.target.name]=e.target.value;
 let _filter=(column1.filter(item=> item==""))
 
  if(_filter.length==0){
   column1.push('')
  }
   
 }

 
 const clickHandler=(index)=>{
 
    let _column=[...column]
  _column.splice(index,1)
 setColumn(_column)
 let _ind=ind.indexOf(index+1)
 
 
 let _index=[...ind]
 _index.splice(_ind,1)
 _index.map((item,inde)=>{
   
    if(item > index+1){
        
        _index[inde]=item-1
    }
 })
setInd(_index)


let _column1=[...column1]
  _column1.splice(_ind,1)
 setColumn1(_column1)
 }

  return (
    
       <div className="container mt-3 mb-3 bdy2"> 
   <div>
     <h3>Section 3</h3>
     <div  className="form-outline" style={{display:"flex"}}>
   <input type ="text"value={ques} onChange={(e)=>{setQues(e.target.value)}} className="form-control input1"/><input type="text" className="form-control inputl"value={points} onChange={(e)=>{setPoints(e.target.value)}} placeholder="Enter Marks" required/></div>
     <div className="row ">
      <div className="col-md-6 mb-2 ">
        <h5>Column 1</h5> </div> 
        <div className="col-md-6 mb-2 ">
        <h5>Column 2</h5> </div> 
   </div>
     <div className="row ">
       <div className="col md-6 mb-2">
       {column.map((item,index)=>
       <div className="Display">
       <input type="text" className="cat mb-2" value={item}  name={index} onChange={changeHandler}/><h4> {index+1} </h4>
       {item.length> 0?  <h4 type="button" onClick={()=>{clickHandler(index)}}> <RxCross1/> </h4>:""}
       </div>)}
    
     </div>
     
     
   <div className="col md-6 mb-2">
     {column1.map((item,index)=>
     <div className="Display" draggable
     onDragStart={(e) =>dragItem.current=index}
     onDragEnter={(e) =>dragOverItem.current=index} 
     onDragEnd={handleSort}
     onDragOver={(e) => e.preventDefault()}>
    <h4> <PiDotsSixVerticalBold/></h4><h4>{ind[index]} </h4>
      <input type="text" className="cat mb-2" value={item}  name={index} onChange={changeHandler1}/>
    
     </div> 
      )}
    </div></div>
    </div></div>
  )
}

export default Section3
