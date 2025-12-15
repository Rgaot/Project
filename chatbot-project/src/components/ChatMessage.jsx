import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import './ChatMessage.css';
import dayjs from 'dayjs';

export function ChatMessage({message, sender, time}) {
  // const {message, sender} = props;
  if(sender === 'robot') {
    return(
      <div className = "chat-message-robot">
        <img src= {RobotProfileImage} alt="profile image" className = "chat-message-profile" />
        <div className = "chat-message-text">
          {message}
          <div className = "chat-message-time">
            {dayjs(time).format('HH:mm')}
          </div>
        </div>
      </div>
    )
  } 
  
  return(
    <div className = "chat-message-user">
      <div className = "chat-message-text">
        {message}
        <div className = "chat-message-time">
          {dayjs(time).format('HH:mm')}
        </div>
      </div>
      {sender === 'user' && (
        <img src= {UserProfileImage} alt="profile image" className= "chat-message-profile" />
      )}
    </div>
  )
};