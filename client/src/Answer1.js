import {React,useState,useRef,useEffect} from 'react';
import {LiaUndoAltSolid} from 'react-icons/lia'
import axios from 'axios';
//import {store} from './Result.js';
import './Answer1.css'

const Answer1  = (props) => {

//const [marks,setMarks]=useContext(store);
  //console.log("{{{{[[[[props.arr]]]]}}}}",props.arr)
    const [cat,setCat]=useState([]);
    const [ques,setQues]=useState();
const [boo,setBoo]=useState(true);
const dataindex=useRef(null);
    const [data,setData]=useState([])
     const [ddata,setDdata]=useState([])
      const [pdata,setPdata]=useState([]);
      const [marks,setMarks]=useState([-1]);

      if(props.bin==true && marks[0]==-1){
        marks[0]=1;
     setMarks(props.arr[5])
          console.log("..............Answer1","cat",cat,"data",props.arr[3],"ddata",ddata,"pdata",pdata);
          let dat=props.arr[3]
          let c= ddata.filter((item,index)=>
           (!( pdata[cat.indexOf(item)].includes(dat[index])))
          )
          if(c.length==0){
            console.log("Answer1 is true")
            axios.post("http://localhost:5000/marks",[props.arr[5],"ans1"]).then(
              res=>{
                console.log("respose Data==",res.data)
              }
            )
          }
        }
      
      useEffect(()=>{
        setCat(props.arr[2])
        setQues(props.arr[1])
       
        setData(props.arr[3])
        setDdata(props.arr[4])
      },[])
      

     if(boo && cat.length>0){
    

 // console.log("3333333333333333",ques,cat,data,ddata)
      //console.log("------------------inside loop------------",cat)
      cat.map((item,index)=>{
        console.log("item=",item,index)
       let arr=[];
       pdata.push(arr)
        })
        setBoo(false);}
        //console.log("pdata===========================================",pdata);

    

    const drop=(index1)=>{
     // console.log("onDrop");
      let _pdata=[...pdata]
      
        
        if(_pdata[index1].indexOf('=')>=0){
          _pdata[index1][_pdata[index1].indexOf('=')]=data[dataindex.current];
        }
        else{
          _pdata.map((item,index)=>{
        
        if(index==index1){
          _pdata[index1].unshift(data[dataindex.current]);
        }  
        else{
          _pdata[index].push("="); 
        }
        
      })}
     
      setPdata(_pdata);
      data.splice(dataindex.current,1);
     // let str=item+":"+dragitem;
     // setPdata([...pdata,str]);
    }

    const resetHandler = ()=>{
      setData(props.arr[3]);
      setPdata([]);
      setBoo(true);
     }
  return (
    <div style={{backgroundColor:"white"}}>
    <h4>Question {props.indi}</h4>
    <div className="container">
       
      <div style={{display:"flex"}}>
     <h5 className="container p-1 ques mt-3">{ques}</h5><h4 style={{margin:"5px 5px 5px 25px",padding:"8px"}} type="button" onClick={()=>{resetHandler()}} ><LiaUndoAltSolid/></h4></div>
       <center> 
      {data.map((item,index)=>
      <div draggable onDragStart={()=>{dataindex.current=index}} style={{display:"inline-block",marginRight:"15px"}}>
        <div className="data">{item}</div></div>
       )} 

<div>
        {cat.map((item,index)=>
        
        <div  style={{display:"inline-block",marginRight:"35px"}} className="p-3">
          <div>
          {index%2==0?
          <div>
          <div className="cate c3" >{item}</div>
          <div  droppable onDragOver={(e)=>{e.preventDefault();}} onDrop={()=>{drop(index)}}  className="container-lg p-3 border space c3">
            {pdata[index].map((item)=>
            <div>
            {item=="="?
            <div className="content1">{item}</div>:
           <div className="content">{item}</div>}</div>)}</div></div>:
           <div>
           <div className="cate c4" >{item}</div>
          <div  droppable onDragOver={(e)=>{e.preventDefault();}} onDrop={()=>{drop(index)}}  className="container-lg p-3 border space c4">
            {pdata[index].map((item)=>
            <div>
            {item=="="?
            <div className="content1" >{item}</div>:
           <div className="content" >{item}</div>}</div>)}</div></div>}
        </div></div>
    )}</div>
  </center>
    </div> </div>
  )
}

export default Answer1 
