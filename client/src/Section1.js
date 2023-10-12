import {React,useState,useRef} from 'react'
import {PiDotsSixVerticalBold} from 'react-icons/pi';
import {NavDropdown} from 'react-bootstrap'
import {RxCross1} from 'react-icons/rx';
import axios from 'axios';
import './Section1.css';
const Section1 = (props) => {

  
 
  const [cat,setCat]=useState([""]);
  const [points,setPoints]=useState();
  const [catdata,setCatdata]=useState("");
  const [items, setItems]=useState([""])
  const [itemdata, setItemdata]=useState([])
  const [dd,setDd]=useState(["category"])
  const dragItem=useRef(null);
  const dragOverItem=useRef(null);
  const [ques,setQues]=useState("")
  const [pass,setPass]=useState([[""],[],[],[],[],[]])

  if(props.value==true && pass[0] ==""){
    items.map((item,index)=>{
      if(item==''){
        items.splice(index,1);
        dd.splice(index,1);
      }
    })
    cat.map((item,index)=>{
      if(item==''){
        cat.splice(index,1);
      }
    })
pass[0]="section1";

    pass[1]=ques;
    pass[2]=cat;
    console.log("1=",pass)
    pass[3]=items;
    console.log("2=",pass)
    pass[4]=dd;
    pass[5]=points;
    console.log("3=",pass)
axios.post("http://localhost:5000/add1data",pass).then(
  res=>{
    console.log("respose Data==",res.data)
  }
)
    console.log("Quiz Ceated");
    console.log(items,cat,dd);
  }

  const handleSort = () =>{
    
    let _Cat=[...cat]
    let draggedItem=_Cat.splice(dragItem.current,1)[0];
   _Cat.splice(dragOverItem.current,0,draggedItem);
    dragItem.current=null;
   dragOverItem.current=null;
   setCat(_Cat)
  }

  const handleSort1 = () =>{
    
    let _items=[...items]
    let _dropdown=[...dd]
    let draggeddd=_dropdown.splice(dragItem.current,1)[0];
    let draggedItem=_items.splice(dragItem.current,1)[0];
   _items.splice(dragOverItem.current,0,draggedItem);
   _dropdown.splice(dragOverItem.current,0,draggeddd)
    dragItem.current=null;
   dragOverItem.current=null;
   setDd(_dropdown)
   setItems(_items)
  }

  const clickHandler=(index)=>{
   let _cat=[...cat]
   let _dd=[...dd]
   let _items=[...items]
   let _del=_cat[index]
     _cat.splice(index,1)
    dd.map((item,ind)=>{
   if(item==_del){_dd.splice(ind,1);
  _items.splice(ind,1)}
  })
  setDd(_dd)
  setItems(_items)
 setCat(_cat)
 }

 const clickHandler1=(index)=>{
 
   let _items=[...items]
   let _dd=[...dd]
   _dd.splice(index,1)
   setDd(_dd)
 _items.splice(index,1)
setItems(_items)

}

const changeHandler=(e)=>{
   setCatdata(e.target.value);
cat[e.target.name]=e.target.value;
let _filter=(cat.filter(item=> item==""))

 if(_filter.length==0){
  cat.push('')
 }
  
}

const changeHandler1=(e)=>{
  setItemdata(e.target.value);
items[e.target.name]=e.target.value;
let _filter1=(items.filter(item=> item==""))

if(_filter1.length==0){
 items.push('')
let _dd=[...dd]
_dd.push("category")
setDd(_dd)
}
 
}

//console.log("final Data",cat)
const Dropdown=(item,index)=>{
let _dd=[...dd]
  _dd[index]=item
  setDd(_dd)
  //console.log("dddddd",dd)
 }
//console.log("length",dd.length)
//console.log("----items---",items)
//console.log("dd",dd)


return (
    <div className="container mt-3 bdy"> 
   
    <div>
      
  <h3>Section 1</h3>
      
    <div  className="form-outline" style={{display:"flex"}}>
   <input type ="text"  value={ques} onChange={(e)=>{setQues(e.target.value)}} className="form-control input1"/><input type="text" className="form-control inputl"value={points} onChange={(e)=>{setPoints(e.target.value)}} placeholder="Enter Marks" required/></div>
  <h5>Categories</h5>
    
    {cat.map((item,index)=>
     <div style={{display:"flex"}} draggable
     onDragStart={(e) =>dragItem.current=index}
     onDragEnter={(e) =>dragOverItem.current=index} 
     onDragEnd={handleSort}
     onDragOver={(e) => e.preventDefault()}>
    <h4> <PiDotsSixVerticalBold/></h4>
      <input type="text" className="cat mb-2" value={item}  name={index} onChange={changeHandler}/>
    {item.length> 0?  <h4 type="button" onClick={()=>{clickHandler(index)}}> <RxCross1/> </h4>:""}
     </div> 
      )}


     
<div className="row ">
      <div className="col-md-6 mb-2 ">
        <h5>Items</h5> </div> 
        <div className="col-md-6 mb-2 ">
        <h5>Belong To</h5> </div> 
   </div>
      {items.map((item,index)=>      
     <div draggable
     onDragStart={(e) =>dragItem.current=index}
     onDragEnter={(e) =>dragOverItem.current=index} 
     onDragEnd={handleSort1}
     onDragOver={(e) => e.preventDefault()}>
    
       <div className="row ">
       
      <div className="col-md-6 mb-2 Display ">
    <h4> <PiDotsSixVerticalBold/></h4>
      <input type="text" className="cat" value={item}  name={index} onChange={changeHandler1}/>
    {item.length> 0?  <h4 type="button" onClick={()=>{clickHandler1(index)}}> <RxCross1/> </h4>:""}
    </div>
    
    
  <div className="col ">
    
        <div className="dropdown-style">
     <NavDropdown title={dd[index]} id="collasible-nav-dropdown">
      {cat.map((item)=>
        <NavDropdown.Item onClick={()=>{Dropdown(item,index)}} >{item}</NavDropdown.Item>
    )}
      </NavDropdown>
      </div>
 
  
</div>
</div></div> 
)}
      
  
      </div>
 
     
    </div>
  )
}

export default Section1
