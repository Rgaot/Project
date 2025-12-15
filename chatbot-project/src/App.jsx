import { useState , useEffect} from 'react';
import './App.css';
import  ChatMessages  from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import {Chatbot} from 'supersimpledev';

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('chatMessages')) || []
  );
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages))
  })
  useEffect(() => {
    Chatbot.addResponses({
      "hello":  "Aurevoir"
    })
  }, [])
  // const chatMessages = array[0];
  // const setChatMessages = array[1];
  //const [chatMessages, setChatMessages] = array;

  return (
    <div className = "app-container">
    {chatMessages.length === 0 &&
        <p 
          className = "welcome-message"
          >Welcome to the chatbot project! Send a message using the textbox below.
        </p>}
    <ChatMessages 
      chatMessages = {chatMessages}
    />
    <ChatInput
      chatMessages = {chatMessages}
      setChatMessages = {setChatMessages}
    />
    </div>)
}

export default App
