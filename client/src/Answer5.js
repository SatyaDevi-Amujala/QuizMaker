import {React,useState,useEffect} from 'react'
import {BsFillCheckSquareFill,BsSquare} from 'react-icons/bs';
import axios from 'axios';
//import {store} from './Result';

const Answer5 = (props) => {
  //const [marks,setMarks]=useContext(store);
    const [cat,setCat]=useState([])
    const [ques,setQues]=useState("");
    const [cans,setCans]=useState([]);
    const [ans,setAns]=useState([]);
    const [marks,setMarks]=useState([-1]);
    var c=0;
     useEffect(()=>{
        
      setQues(props.arr[1]);
      setCat(props.arr[2])
      setCans(props.arr[3])
      while(props.arr[2].length>c){
        ans.push(" ");
        c++;
    }
 },[])
     
 if(props.bin==true && marks[0]==-1){
  marks[0]=1;
        console.log("..............Answer5","correct",cans,ans);
        let check1=cans.filter(item=> item!=" ")
        let check2=ans.filter(item => item!=" ")
        let crct=check1.filter((item,index)=> item==check2[index])
        if(crct.length==check1.length){
        console.log("ANSwer5=====true")
        axios.post("http://localhost:5000/marks",[props.arr[4],"ans5"]).then(
          res=>{
            console.log("respose Data==",res.data)
          }
        )}
      
     
     }

     const answerHandler=(index,item)=>{
        let _ans=[...ans]
        if(_ans[index]==" ")
        _ans[index]=item;
      setAns(_ans);
      
    }
        
        const answerHandler1=(index)=>{
          
           let _ans=[...ans];
           _ans[index]=" "
           setAns(_ans);
          
       }
       console.log("Answerrrrr===",ans)
  return (
    <div>
        
        <h4>Question {props.indi}</h4> 
        <div className='container'>
        <h5 className="container p-1 mt-3" style={{border:"2px solid gray",borderRadius:"15px"}}>{ques}</h5>
      {cat.map((item,index)=>
        <div style={{display:"flex"}} >
        {item==ans[index]? <h5 type="button" className="m-2" onClick={()=>{answerHandler1(index,item)}}> <BsFillCheckSquareFill/></h5>:<h5 type="button"  className="m-2" onClick={()=>{answerHandler(index,item)}}> <BsSquare/></h5>}
   
        <div className="mt-2 ml-5">{item}</div></div>
      )}
    </div></div>
  )
}

export default Answer5
