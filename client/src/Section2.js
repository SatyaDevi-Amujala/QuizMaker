
import { React, useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import {PiDotsSixVerticalBold} from 'react-icons/pi';
import {RxCross1} from 'react-icons/rx';
import axios from 'axios';
import './Section2.css';

const Section2 = (props) => {
  
    const editor = useRef(null);
	const [content, setContent] = useState('');
  const [content1, setContent1] = useState([""]);
  
  const [points,setPoints]=useState(0);
  const [ques,setQues]=useState("");
  const [data, setData] = useState([""]);
  const [bit, setBit] = useState([" "]);
  const dragItem=useRef(null);
  const dragOverItem=useRef(null);
  const [pass,setPass]=useState([[""],[],[],[],[]])

 
  if(props.value==true && pass[0]==""){
    data.map((item,index)=>{
      if(item==''){
        data.splice(index,1);
      }
    })
    bit.map((item,index)=>{
      if(item==" "){
        bit.splice(index,1);
      }
    })
    pass[0]="Section2"
    pass[1]=ques;
    pass[2]=data;
    console.log("1=",pass)
    pass[3]=bit;
    pass[4]=points;
    console.log("2=",pass)
   
axios.post("http://localhost:5000/add2data",pass).then(
  res=>{
    console.log("respose Data==",res.data)
  }
)
    
    console.log("Quiz Created");
    console.log("ques=",ques,"data=",data,"bit=",bit);
  }
  
   const changehandler = (datas) =>{
    console.log("datas",datas);
    setQues(datas);
    //setContent1(datas)
   
	//console.log("Content==",content1,typeof content1)
  const regex = /<u>(.*?)<\/u>/g;
      // console.log("regex",content1)
     
        
        
        if(datas.match(regex) != null){
        let _data1=datas.match(regex)
      let  _data = _data1.map(match => 
          match.replace(/<\/?u>/g, '')
        )
        //console.log("@@@@@@@@@@",_data)
        let add=[...data]
        _data.map((item)=>{
          if(!(add.includes(item))){
              add.push(item)
          setData(_data)

         }
        })
        
       console.log("add",add)
        console.log("data",data)
        console.log("-data-",_data)
        let _bit=[...bit];
        
        add.map((item)=>{
          if(!(_data.includes(item))){
            let ind=_bit.indexOf(item)
            _bit.splice(ind,1)
            if(!(_bit.includes(" "))){
              _bit.push(" ")
            } 
          }
        })  
        setBit(_bit)
        console.log("bittttt1=",bit)
        _data.map((item)=>{
       if(!(_bit.includes(item))){
        _bit.unshift(item);
        if(!(_bit.includes(" "))){
          _bit.push(" ")
        }
       
       }
      }
        )
         setBit(_bit);
        // console.log("bittttt2=",bit)
      
     }}

       
      // console.log("Data",data)
        
        const handleSort = () =>{
    
          let _Bit=[...bit]
          let draggedItem=_Bit.splice(dragItem.current,1)[0];
         _Bit.splice(dragOverItem.current,0,draggedItem);
          dragItem.current=null;
         dragOverItem.current=null;
         setBit(_Bit)
        }
        const clickHandler=(index)=>{
 
        let _bit=[...bit]
       _bit.splice(index,1)
       setBit(_bit)}
       const changeHandler=(e)=>{
        setContent1(e.target.value);
     bit[e.target.name]=e.target.value;
  
     let _filter=(bit.filter(item=> item==" "))
     
      if(_filter.length==0){
       bit.push(" ")
       
      }
      console.log("bittttt3=",bit) 
     }




  
  return (
    <div className="container mt-3 bdy1">
      <h5>{data}</h5>
    
    
    <div>
         <h3>Section 2 </h3>
      
      <div  className="form-outline" style={{display:"flex"}}>
     <input type ="text"  value={content} onChange={(e) => setContent(e.target.value)} className="form-control input1"/><input type="text" className="form-control inputl"value={points} onChange={(e)=>{setPoints(e.target.value)}} placeholder="Enter Marks" required/></div>
      <JoditEditor
			ref={editor}
			value={content}
			onChange={newcontent=> changehandler(newcontent)}
       
		/>
      <h5>Options</h5>
    
    {bit.map((item,index)=>
     <div style={{display:"flex",marginRight:"15px"}} draggable
     onDragStart={(e) =>dragItem.current=index}
     onDragEnter={(e) =>dragOverItem.current=index} 
     onDragEnd={handleSort}
     onDragOver={(e) => e.preventDefault()}>
    
    <h4> <PiDotsSixVerticalBold/></h4>
    {item!= " " && (data!=null && (data.includes(item)))?  <h4 style={{marginRight:"12px",paddingBottom:"5px"}} > <input type="radio" checked />  </h4>:<h4 style={{marginRight:"12px",paddingBottom:"5px"}}> <input type="radio" /></h4>}
     
      <input type="text" className="cat mb-2" value={item}  name={index} onChange={changeHandler}/>
    {(item != " " && data!=null && !(data.includes(item)))?  <h4 type="button" onClick={()=>{clickHandler(index)}}> <RxCross1/> </h4>:""}
     </div> 
      )}
	 
    </div> </div>
  )
}

export default Section2
