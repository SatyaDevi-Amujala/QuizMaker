import {useState,React,useEffect} from 'react';
import axios from 'axios';
import {useLocation,useNavigate} from 'react-router-dom';

const Dashboard = () => {
  let location=useLocation(); 
    const [name,setName]=useState("");
    const [data,setData]=useState([]);
    let navigate=useNavigate();
    var uname=location.state.name;
    var email=location.state.email;
    console.log("////",data.length)
    
    console.log("-------------",uname,email);
    useEffect(()=>{
axios.post("http://localhost:5000/dashboard",[email]).then(
    res=>{console.log("response",res.data)
      if(res.data!="empty")
setData(res.data);
      
    }
)},[])
  return (
    <div>
      <center>
        <h2>Welcome {uname}</h2>
        <br></br>
        {data.length>0?
        <div className="container">

              
<center><h4>Your Quizes</h4></center>
          <table >
          <div style={{borderTop:"2px solid gray",padding:"20px"}}> 
         <div classname="container">
          {data.map((item) =>
         <tr><td> <h5 style={{marginRight:"15px"}}>{item.quizname}</h5></td><td><center><p  className="btn btn-secondary btn-sm mt-3" onClick={()=>{navigate('/Questionsheet',{state:{email:email,name:item.quizname}})}}>Open</p></center></td></tr>)}
         </div>
         </div> </table> </div>

      :<p>Create Your First Quiz</p> }
        
        
 
        <div className="form-outline cenent p-4  mb-4">
                  <label className="form-label" >Create New Quiz </label>
                    <input type="text"required onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Quiz Name" name="name" value={name} className="form-control w-80" style={{minWidth:"30px"}} />
                    
                  </div>
                  <div> <button className="btn btn-primary" onClick={()=>{navigate('/Quizsheet',{state:{email:email,name:name}})}}>Submit</button></div>
        </center>
    </div>
  )
}

export default Dashboard
