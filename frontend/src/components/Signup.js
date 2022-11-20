import React ,{useState}from 'react'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
    const [credentials, setCredentials]= useState({name:"",email: "",password: "", confirmpassword:""});
    
    const navigate= useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();
    const {name,email,password}=credentials;
        const response = await fetch("http://localhost:4000/login/createuser", {
            method: 'POST', 
             headers: {
              'Content-Type': 'application/json',
             // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZTQwMmNhOGE0ZDkzMmM1YjQ1OTI0In0sImlhdCI6MTYzOTg1ODIyMH0.uC2EcwPUtIIuMlru4AJSRF2wjJv6IQ1s1b9moJMXlS8'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({name, email, password }) // body data type must match "Content-Type" header
          });
          const json= await response.json()
         
            //redirect
            localStorage.setItem("token",json.authtoken)
            navigate("/login");
          
        }
    const onchange =(e)=>{ 
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }
    
    
    return (
        <>
        <div className="container " style={{width:"30vw"}}>
         <form onSubmit={handleSubmit}>
         <h2 className='text-center my-5'> Signup To continue to INoteBook</h2>
  <div className="mb-3 my-5">
    <label htmlFor="name"  className="form-label">Name</label>
    <input type="text" className="form-control"  name="name" value={credentials.name} id="name"  aria-describedby="emailHelp" onChange={onchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 ">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email"  value={credentials.email}id="email" aria-describedby="emailHelp" onChange={onchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} id="password" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="confirmpassword" value={credentials.confirmpassword} id="confirmpassword" onChange={onchange}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-success mx-3">Confirm and Signup</button>
</form> 
</div>
        </>
    )
}

export default Signup
