import {React,useState} from 'react';
import validator from 'validator';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
const Register = () => {
        let navigate=useNavigate();
          const [data,setData]=useState({
            name:"",
            email:"",
            pswd:"",
            cpswd:""
          })
        const { name,email,pswd,cpswd}=data;
        const changeHandler=(e)=>{
          setData({...data,[e.target.name] : e.target.value})
 }
        const submitHandler=(e)=>{
          e.preventDefault();
          var letters = /^[A-Za-z]+$/;
          var passw=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
            if( !(name.trim().split(" ") .join("").match(letters)))
                alert("Enter Valid Name(Name should contain Alphabets Only)");
            else if(!(validator.isEmail(email))){
                alert("Invalid Email");}
          
            else if(!(pswd.match(passw))){
                alert("Invalid Password(Submit [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter)")
                }
           else if(pswd!=cpswd)
                alert("Passwods Not Match")
            else{
              axios.post("http://localhost:5000/register",data).then(
                
              res=>{
                if(res.data=="Registered"){
                    return navigate('/');
                }
                else
                alert(res.data)
            }
                
              )}
           }
  return (
    <div style={{backgroundImage:"radial-gradient(rgb(83, 17, 80), rgb(248, 151, 240))"}}>
      
   
     
<section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-12 col-lg-9 col-xl-7">
        <div className="card shadow-2-strong card-registration" style={{borderRadius: "15px;"}}>
          <div className="card-body p-4 p-md-5">
           <center> <h3 className="mb-4 pb-2 pb-md-0 mb-md-5"> Register Form</h3></center>
            <form onSubmit={submitHandler} autoComplete="off">

              <div >
         

                  <div className="form-outline mb-4">
                  <label className="form-label" >Name</label>
                    <input type="text"required onChange={changeHandler}  name="name" value={name} className="form-control form-control-lg" />
                    
                  </div>

        
              </div>
                  <div class="form-outline mb-4">
                  <label class="form-label" >Email</label>
                <input type="text"required onChange={changeHandler} name="email" value={email} className="form-control" />
                {(email.length != 0 && !(validator.isEmail(email)))?
                <span style={{color:"red"}}>Email Invalid</span>
                :''}
               </div>

               <div className="row">
                <div className="col-md-6 mb-4">

                  <div className="form-outline">
                  <label className="form-label" >Password</label>
                    <input type="password" required onChange={changeHandler}  name="pswd" value={pswd} className="form-control form-control-lg" />
            
                    {(pswd.length<8 && pswd.length!=0)?<span style={{color:"green"}}>* minmum 8 characters </span>:""}
                    {(pswd.length>15 && pswd.length!=0)?<span style={{color:"green"}}>* not exceeds 15 characters </span>:""}
                    {pswd.length !=0 && !(/[!@#$%^&*]/.test(pswd))?<span style={{color:"green"}}> * atleast 1 special character</span>:"" }
                    { pswd.length!=0 && !(/[A-Z]/.test(pswd))?<span style={{color:"green"}}> * atleast 1 uppercase letter</span>:""}
                    {pswd.length !=0 && !(/[a-z]/.test(pswd))?<span style={{color:"green"}}> * atleast 1 lowercase letter</span>:""}
                    {pswd.length !=0 && !(/\d/.test(pswd))?<span style={{color:"green"}}> * atleast 1 number</span>:""}
                  </div>

                </div>
                <div className="col-md-6 mb-4">

                  <div className="form-outline">
                  <label className="form-label"  >Confirm Password</label>
                    <input type="password" required className="form-control form-control-lg"onChange={changeHandler}  name="cpswd" value={cpswd} />
                    {(cpswd.length != 0 && cpswd.trim().split(" ").join("") != pswd.trim().split(" ").join(""))?<span style={{color:"red"}}>Passwords did not match </span>:""}
                    </div>
                    </div>
              </div>

             <center><div className="mt-4 pt-2">
              <input className="btn btn-primary btn-lg" type="submit" value="Register" />
               </div><br/>
               <p>Already Registered? Click <Link to ="/">Login</Link></p>
               </center>
             

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>

  )
}

export default Register
