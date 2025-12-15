import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

function ChatMessages({chatMessages}) {
  function useAutoScroll(dependencies) {
    const chatMessagesRef = useRef(null);
    useEffect(() => {
    const containerElem = chatMessagesRef.current;
        if (containerElem) {
        containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [dependencies]);
    return chatMessagesRef;
  };
  const chatMessagesRef = useAutoScroll(chatMessages);
  const ChatMessageComponents = chatMessages.map((chatMessage) => {
    return (
    <ChatMessage
      message = {chatMessage.message}
      sender = {chatMessage.sender}
      key = {chatMessage.id}
    />)
  });

  return (
    <div 
      className = "chat-messages-container" 
      ref = {chatMessagesRef}
    >
      {chatMessages.map(chatMessage => {
        return (
          <ChatMessage
            message = {chatMessage.message}
            sender = {chatMessage.sender}
            key = {crypto.randomUUID()}
          />
        )
      })}
    </div>)
}

export default ChatMessages;