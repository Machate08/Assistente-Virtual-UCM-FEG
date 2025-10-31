import React from 'react';
import { Message, MessageAuthor } from '../../types';
import BotIcon from '../icons/BotIcon';
import UserIcon from '../icons/UserIcon';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.author === MessageAuthor.USER;

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
          <BotIcon className="w-6 h-6" />
        </div>
      )}
      <div
        className={`max-w-xl rounded-2xl px-4 py-3 text-sm md:text-base ${
          isUser
            ? 'bg-blue-800 text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
        }`}
      >
        <p style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
      </div>
       {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-white">
          <UserIcon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
