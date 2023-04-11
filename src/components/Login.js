import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });


  const handleChage=(e)=>{
      setuser({ ...user, [e.target.name]: e.target.value });

  }
  const navigate=useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
  let  Email = "Admin@gmail.com";
let Password="Admin@123";
if(user.email !== Email || user.password !== Password){
  alert("invalid credentials !!!")
}else{
  localStorage.setItem("user",JSON.stringify(user));
  navigate("/")
}
   
  };

  return (
    <div style={{ width: "40%", margin: "200px auto" }}>
      <div className="login-form">
        <form onSubmit={handlesubmit}>
          <h2 className="text-center">Log in</h2>
          <div className="form-group">
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={(e)=>handleChage(e)}
              className="form-control"
              placeholder="Username"
              required="required"
            />
          </div>
          <div className="form-group my-3">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e)=>handleChage(e)}
              className="form-control"
              placeholder="Password"
              required="required"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn text-2xl text-white bg-black">
              Log in
            </button>
          </div>
        </form>
        <p className="text-center">
          <a href="#">Create an Account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
