import React from 'react'
import { Link , useLocation} from "react-router-dom";
import {useNavigate} from 'react-router-dom'
function Navbar() {
  let navigator=useNavigate()
  let location =useLocation();

const handlelogout=()=>{
  localStorage.removeItem('token')
  navigator('login');
}



  return (
        <>
          <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light" style={{borderBottom:"2px grey"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="/">INoteBook</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link>
        </li>
       
      </ul>
      
{!localStorage.getItem('token')?<form className="d-flex">
      <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary" to="/signup" role="button">SignUp</Link>
      </form>:<button onClick={handlelogout} className='btn btn-success'>Logout</button>  }
      {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
  */} 
    </div>
  </div>
</nav>  
        </>
    )
}

export default Navbar
