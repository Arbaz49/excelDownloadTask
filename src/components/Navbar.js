import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {BiLogOut} from "react-icons/bi"
import axios from 'axios';
import { toast } from 'react-toastify';
const Navbar = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    let user=localStorage.getItem('user');
    if(!user){
navigate("/login")
    }
  })
  const handleLogout=()=>{
    localStorage.removeItem("user");
    navigate("/login")
  }
  const [adviceArray, setAdviceArray] = React.useState("");
  const [ad,setad]=React.useState(false);
const getAdvice=async()=>{
try{
  let {data}=await axios.get("https://api.adviceslip.com/advice")
  setAdviceArray(data.slip.advice);

}catch(e){
console.log(e.message);
}
}
useEffect(()=>{
  getAdvice();
},[ad])

const handleAdvice=()=>{
  setad(!ad)
  toast(`"${adviceArray}"`, {
    position: "top-left",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    className: 'bg-black text-white'
    });

}
  return (
    <header className="text-gray-600" >
    <div className="container mx-auto flex flex-wrap bg-black text-white p-5 flex-col md:flex-row items-center">
    
        <span className="ml-3 text-xl">AS</span>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a href="ns"  className="mr-5 hover:text-gray-900">HOME</a>
        <a href="ns" className="mr-5 hover:text-gray-900">ABOUT</a>
        <a href="ns" className="mr-5 hover:text-gray-900">SERVICES</a>
        <a href="ns" className="mr-5 hover:text-gray-900">CONTACT</a>
        <button onClick={handleAdvice}>Get Advice</button>
      </nav>
      <button className="inline-flex items-center bg-black border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={handleLogout}>LogOut
      <BiLogOut/>
      </button>
    </div>
  </header>
  )
}

export default Navbar
