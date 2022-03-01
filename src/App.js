import socketIO from 'socket.io-client'
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Join from './component/Join/Join.js'
import Chat from './component/Chat/Chat'

const ENDPOINT = "https://groupe-chat.herokuapp.com/"
const socket = socketIO(ENDPOINT,{transports:['websocket']});

function App() {

  
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/" element={<Join/>}> </Route>
              <Route path="/chat" element={<Chat/>} ></Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
