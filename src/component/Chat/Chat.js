import React,{useEffect,useState} from 'react'
import {user} from '../Join/Join'
import socketIo from 'socket.io-client'
import './Chat.css'
// import sendLogo from '../'
import Message from '../Message/Message'
import ReactScrollToBottom from "react-scroll-to-bottom"
import  cross from '../images/cross.jpg'

const ENDPOINT = "http://localhost:4500/"
let socket;
const url = "data:image/png;base64,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"

const Chat = () => {
  
  const [id, setId] = useState('');
  const [messages , setMessages] = useState([]);

  const send=()=>{
    const message = document.getElementById('chatInput').value;
    socket.emit('message',{message,id})
    document.getElementById('chatInput').value = '';
  }
  
  useEffect(() => {
    socket = socketIo(ENDPOINT , {transports: ['websocket']});
    
    socket.on('connect',()=>{
      alert('connection on');
      setId(socket.id);
  })

  socket.emit('joined', {user});

  socket.on('welcome',(data)=>{
    setMessages([...messages , data])
    console.log(data.user,data.message);
  })

  socket.on('userJoined',(data)=>{
    setMessages([...messages , data])
    console.log(data.user, data.message);
  })

  socket.on('leave',(data)=>{
    setMessages([...messages,data]);
    console.log(data.user, data.message);
  })

  return ()=>{
    socket.emit("disconnect")
    socket.off();
  }

  }, [])


  useEffect(() => {
    socket.on('sendMessage',(data)=>{
      setMessages([...messages , data])
      console.log(data.user, data.message);
    })
    return ()=>{
      socket.off();
    }
  
  }, [messages])
  

  return (
    <div className="chatPage">
        <div className="chatContainer">
          <div className="header">
              <h2>GROUPE CHAT</h2>
              <a href="/">
                 <img src={cross} alt="close"/>
              </a>
          </div>
          <ReactScrollToBottom className="chatBox">
            {
              messages.map((item,index) => <Message user={item.id===id?"":item.user} key={index} classs={item.id===id?'right':'left'}  message={item.message}/>) 
            }
          </ReactScrollToBottom>
          <div className="inputBox">
            <input onKeyPress={(e)=>e.key==="Enter"? send():null} type="text" id="chatInput"/>
            <button onClick={send} className='sendBtn'>Send</button>
          </div>
        </div>
    </div>
  )

}

export default Chat

