import {useMemo} from 'react';
import {useRoute} from '@react-navigation/native';
import useChatHistoryStore from '../../../store/useChatHistoryStore';
import {ChatRouteProp} from '../../../types';

const useChatHistoryState = () => {
  const {chatHistory, saveChatHistory, updateChatHistory} = useChatHistoryStore(
    state => state,
  );

  const id = useRoute<ChatRouteProp>().params?.id;

  const savedChatNames = useMemo(() => {
    return chatHistory?.map(el => el.title);
  }, [chatHistory]);

  const chat = useMemo(() => {
    return chatHistory.find(el => el.id === id);
  }, [chatHistory, id]);

  const title = chat?.title;
  const messages = useMemo(() => chat?.messages, [chat?.messages]);
  const lastChatId = chatHistory[chatHistory?.length - 1]?.id;
  const currId = id ? id : lastChatId ? lastChatId : 1;

  return {
    saveChatHistory,
    updateChatHistory,
    savedChatNames,
    id,
    chat,
    title,
    messages,
    currId,
  };
};

export default useChatHistoryState;
