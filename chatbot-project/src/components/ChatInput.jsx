import { useState } from 'react';
import {Chatbot} from 'supersimpledev';
import LoadingGif from '../assets/loading-spinner.gif'
import '../components/ChatInput.css';
import dayjs from 'dayjs'

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState();

  function saveInputText(event) {
    setInputText(event.target.value);
  };

  function escape(event) {
    if (event.key === 'Escape') {
      setInputText('')
    }
  }
  
  async function sendMessage() {
    if (inputText != "" && !isLoading) {
      const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setChatMessages(newChatMessages);
    
    setChatMessages([
      ...newChatMessages,
      {
        message: <img 
          src = {LoadingGif}
          className = "loading-image" 
        />,
        sender: "robot",
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(true);

    await Chatbot.getResponseAsync(inputText).then((response) => {
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ])
    });
    setIsLoading(false)
    setInputText('');
    }
  }

  function clear () {
    setChatMessages([])
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages))
  }

  function enter(event) {
    if(event.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to chatbot" 
        size="30" 
        onChange = {saveInputText}
        onKeyDown = {enter}
        onKeyUp = {escape}
        value = {inputText}
        className = "chat-input"
      />
      <button 
      onClick={sendMessage}
      className="send-button"
      >Send</button>
      <button 
        className  = "clear-button"
        onClick = {clear}
      >Clear</button>

    </div>
  );
};