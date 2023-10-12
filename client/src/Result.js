
import{React,useState,useEffect} from 'react'
import axios from 'axios';
import {useParams,Link} from 'react-router-dom';
import './result.css'

const Result = () => {
  const [marks,setMarks]=useState();
  let params=useParams();


  useEffect(()=>{
axios.get("http://localhost:5000/getmarks").then(
  res=>{setMarks(res.data)

  }
)},[])

  return (
    
    <div> <center>
    <div className="container section">
     
     <h2 style={{color:'green'}}>Thanks for Submission</h2>
     <br></br>
     <h3>You got</h3>
     <div  style={{border:"none",borderRadius:"50%",backgroundColor:"rgb(219, 212, 212)",width:"150px",height:"150px"}}>
      <center>
        <br></br>
      <h2>{marks}</h2>
      <h2 style={{border:"2px solid black"}}></h2>
      <h2>{params.points}</h2></center>
      </div>
      
     
    </div><Link   to={'/'} className="btn btn-primary " >Logout</Link> </center>
    </div>
  )
}

export default Result
