import React from 'react'
import Register from './Register';
import Result from './Result';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Quizsheet from './Quizsheet.js';
import Questionsheet from './Questionsheet.js';

const App = () => {
 
  return (
    <div>
      
      <div>
     
     <BrowserRouter>
     <Routes>
       <Route path='/' element={<Login/>}/>
       <Route path='/Result/:points' element={<Result/>}/>
       <Route path='/Register' element={<Register/>}/>
       <Route path='/Quizsheet' element={<Quizsheet/>}/>
       <Route path='/Dashboard' element={<Dashboard/>}/>
       <Route path='/Questionsheet' element={<Questionsheet/>}/>
     </Routes>
     </BrowserRouter>
     
   </div>
    </div>
  )
}

export default App
