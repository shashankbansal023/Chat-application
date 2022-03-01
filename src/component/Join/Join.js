import React,{useState} from 'react'
import './Joinstyle.css'
import {Link} from 'react-router-dom'
import logo from '../images/logo.jpg'

let user;

const Join = () => {

    const [input,setInput] = useState('');
    const sendUser = ()=>{
        user = input;
        setInput('');
    }

  return (
    <div className="JoinPage">
        <div className="JoinContainer">
          <img src={logo} alt="logo-img" />
                <h1>C CHAT</h1>
            <input type="text" 
            value={input}
              placeholder="Enter your name"
               id="joinInput"
               onChange={(e)=>setInput(e.target.value)}/>
            <Link to="/chat">
                <button disabled={!input} onClick={sendUser} className="join-btn">Login</button>
            </Link>
        </div>    
    </div>
  )
}

export default Join
export {user}