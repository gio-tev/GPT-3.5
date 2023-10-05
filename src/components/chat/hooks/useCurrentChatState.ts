import {useState} from 'react';
import {MessageTypes} from '../../../types';

const useCurrentChatState = () => {
  const [currentChat, setCurrentChat] = useState<MessageTypes>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentChatTitle, setCurrentChatTitle] = useState<string>('');

  return {
    currentChat,
    currentResponse,
    currentChatTitle,
    setCurrentChat,
    setCurrentResponse,
    setCurrentChatTitle,
  };
};

export default useCurrentChatState;
