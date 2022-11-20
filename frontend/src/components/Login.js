import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Login = () => {
 const [credentials, setCredentials]= useState({email: "",password: ""});
  let history = useNavigate();

 const handleSubmit= async (e)=>{
    e.preventDefault();
   
    const response = await fetch("http://localhost:4000/login/login", {
        method: 'POST', 
         headers: {
          'Content-Type': 'application/json',
         // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZTQwMmNhOGE0ZDkzMmM1YjQ1OTI0In0sImlhdCI6MTYzOTg1ODIyMH0.uC2EcwPUtIIuMlru4AJSRF2wjJv6IQ1s1b9moJMXlS8'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({email:credentials.email, password:credentials.password  }) // body data type must match "Content-Type" header
      });
      const json= await response.json()

      if(json.success){
        //redirect
        localStorage.setItem("token",json.authtoken)
        history("/");
      }else{
        alert("invalid credentials")
      }
      console.log(json)
}
const onChange =(e)=>{ 
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

    return (
        <>
        <div className="container my-5" style={{width:"30vw"}}>
         
        <form onSubmit={handleSubmit} style={{marginTop:"8vw"}}>
        <h2 className='text-center my-5'> Login To continue to INoteBook</h2>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email"id="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="password"/>
  </div>
  <div className='d-flex justify-content-center '>
  <button type="submit" className="btn btn-success my-3" style={{width:"8vw"}} >Login</button>
  </div>
</form>
</div>
</>
    )
}

export default Login
