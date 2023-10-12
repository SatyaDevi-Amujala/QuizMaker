import {React,useEffect,useState} from 'react'
import {useLocation,Link} from 'react-router-dom';
import axios from 'axios';
import Answer1 from './Answer1.js';
import Answer2 from './Answer2.js';
import Answer3 from './Answer3.js';
import Answer4 from './Answer4.js';
import Answer5 from './Answer5.js';



const Questionsheet = () => {
  
  const [data,setData]=useState([]);
  const [bin,setBin]=useState(false);
  const [point,setPoint]=useState([0]);

  let location=useLocation();
  var email=location.state.email;
  var name=location.state.name;
  console.log("....>>",email,name);
    useEffect(()=>{
    axios.post("http://localhost:5000/getdata",[email,name]).then(
  res=>{
    console.log("respose Data==",res.data)
    setData(res.data[0].question);
    let _data=res.data[0].question;
if(point[0]==0){
    _data.map(item=>{
      if(item.length>0){
      if(item[0]=="section1" || item[0]=="Section3"){
      console.log("item{5}",item[5])
        point[0]=point[0]+Number(item[5]);}
      else{
      point[0]=point[0]+Number(item[4]);
      console.log("item{4}",item[4])}}
    })}
  }
)

},[])
console.log("DDDDDAAAAATTTTTAAAA==",data)
  return (
    <div style={{backgroundColor:"white"}}>
      <center>
      <h1>{name}</h1>
      </center>
    {data.map((item,index)=>
    <div>
{item.length>0?
 <div>
  <div>{item[0]=="section1"?<Answer1 arr={item} indi={index} bin={bin} />:""}</div>
  <div className="pb-3">{item[0]=="Section2"?<Answer2 arr={item} indi={index} bin={bin}/>:""}</div>
  <div>{item[0]=="Section3"?<Answer3 arr={item} indi={index} bin={bin}/>:""}</div>
  <div className="pb-3">{item[0]=="Section4"?<Answer4 arr={item} indi={index} bin={bin} />:""}</div>
  <div className="pb-3">{item[0]=="Section5"?<Answer5 arr={item} indi={index} bin={bin} />:""}</div>
  </div> :""
}</div>
   )}
   <div>
     <center> 
<div style={{display:"flex",marginLeft:"500px"}}> <h4 className="btn btn-primary" onClick={()=>{setBin(true)}}>Save</h4>
{bin==true?<h4 style={{margin:'0px 20px'}}><Link   to={`/Result/${point[0]}`} className="btn btn-primary " >Submit</Link></h4>:""}
</div>
</center>
    </div></div>
  )
}

export default Questionsheet
