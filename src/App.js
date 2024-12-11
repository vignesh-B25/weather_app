import React from 'react';
import { useState } from 'react';
// import  './form.php';
import './App.css';
import Show from './fetchdata';
function App(){
     const [Msg,setMsg]=useState("");
     const [Details,setDetails]=useState({fname:'',lname:'',num:'',email:''});
     
     const handleChange = (e) => {
      setDetails({
        ...Details,
        [e.target.name]: e.target.value,
      });
    };
    const Formhandle= async (e)=>{
      e.preventDefault();
       if(!Details.fname|| !Details.lname||!Details.num||!Details.email){
        alert("Enter all feilds");
        return;
       
       }
       if(!/^\d{10}$/.test(Details.num)){
        alert("Please enter 10 digit number");
        return;
       }else{
        setDetails({fname:'',lname:'',num:'',email:''});
       }
      
       const formData = new FormData(e.target);
       try {
        const response = await fetch('http://localhost/form.php', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setMsg(data.message); // Message from PHP response
        } else {
          setMsg('Error submitting form: ' + data.message);
        }
      } catch (error) {
        setMsg('Error submitting form!');
        console.log(error);
      }
    };
    
     
  return ( 

  <div>
      <h1>Fill the details below </h1>
      <div>
      <form className='form' onSubmit={Formhandle} method='post'>
        <label>First Name:</label><br/>
        <input type="text" id="fname" name='fname'
        value={Details.fname} onChange={handleChange}/><br/>
        <label>Last Name:</label><br/>
        <input type="text" id="lname" name="lname" value={Details.lname} onChange={handleChange}/><br/>
        <label>Mobile No:</label><br/>
        <input type="text" id="num" name="num" value={Details.num} onChange={handleChange} max={'10'} /><br/>
        <label>Email:</label><br/>
        <input type="email" id="mail" name="email" value={Details.email} onChange={handleChange} /><br/><br/>
        <input type="submit" id="btn" /><br/>
      </form>
      {Msg&& Msg}

      </div>
      <Show />
  </div>
  )
}

export default App;
