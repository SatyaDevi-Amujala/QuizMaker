import {React,useState,useEffect,useRef} from 'react'
import {LiaUndoAltSolid} from 'react-icons/lia'
import axios from 'axios';
//import {store} from './Result';
import './Answer2.css';

const Answer2 = (props) => {
 // const [marks,setMarks]=useContext(store);
    const [bit,setBit]=useState( []);
    const [content,setContent]=useState("");
    const [data,setData]=useState( [])
    const [count,setCount]=useState([]);
    const dataindex=useRef(null);
    const [marks,setMarks]=useState([-1]);
     
    if(props.bin==true && marks[0]==-1){
      marks[0]=1
      console.log("..............Answer2","data",data,count);
      let fill=count.filter(item=> item!="=");
      let check=data.filter((item,index) => item!=fill[index])
      if(check.length>0){
        console.log("False")
      }
      else{
        console.log("true")
        axios.post("http://localhost:5000/marks",[props.arr[4],"ans2"]).then(
          res=>{
            console.log("respose Data==",res.data)
          }
        )
      }
    }
    
    useEffect(()=>{
setData(props.arr[2])
setBit(props.arr[3])
     


 // console.log("use Effect>>>>>>>>>>",content)
 let deet=props.arr[1];
        let _content= deet.replace(/<u>(.*?)<\/u>/g, ' __ ');
       
       
       
       let _content1= _content.replace(/<\/?p>/g, '');
      setContent(_content1);
      //console.log(content,_content)
       _content1.split(" ").map(a=>{
        if(a!=" "){
         console.log("split",a)
            count.push("=")}
          
       })
       //console.log("111",count);
      // console.log("9999999999",content);
    },[]);

    const drop=(index)=>{
      let _count=[...count]
        _count[index]=bit[dataindex.current];
        setCount(_count);
        //console.log("count",count)
        let _bit=[...bit];
        _bit.splice(dataindex.current,1);
        setBit(_bit);
    }

    const resetHandler = ()=>{
      setBit(props.arr[3]);
      let _count=[];
      content.split(" ").map(a=>{
         _count.push("=")
      })
   setCount(_count)
     }
  return (
    <div>
      <h4>Question {props.indi}</h4>
      <div style={{display:"flex"}}>
      <h5 className="container p-1 ques1 mt-3 mb-5">Fill the Blanks</h5><h4 style={{margin:"5px 5px 5px 25px",padding:"8px"}} type="button" onClick={()=>{resetHandler()}} ><LiaUndoAltSolid/></h4></div>
      <center> 
       {bit.map((item,index)=>
      <div  style={{display:"inline-block",marginRight:"15px"}}>
        <div draggable onDragStart={()=>{dataindex.current=index}} className="bit" >{item}</div></div>
       )}
       <div>
       {content.split(" ").map((a,index)=>
        <div style={{display:"inline-block",marginRight:"4px"}}>
           
          {a=="__"?
          
          count[index] == "=" ?
          <div droppable onDragOver={(e)=>{e.preventDefault();}} onDrop={()=>{drop(index)}} className="container mt-3 dash"><center style={{visibility:"hidden"}}>{ count[index]}</center></div>
          : <div droppable onDragOver={(e)=>{e.preventDefault();}} onDrop={()=>{drop(index)}} className="container mt-3 dash "><center>{ count[index]}</center></div>
          :<div>{a}</div>}</div>  
        )}</div></center>


    </div>
  )
}

export default Answer2
