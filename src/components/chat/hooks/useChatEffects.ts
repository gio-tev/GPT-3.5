import {useEffect} from 'react';
import {
  titleRequestText,
  uniqueTitleText,
} from '../../../utils/chatTitleRequest';
import useChatHistoryState from './useChatHistoryState';
import {EffectState} from '../../../types';

const useChatEffects = (...args: EffectState[]) => {
  const {
    response,
    chatTitle,
    fetchData,
    currentChat,
    currentChatTitle,
    setCurrentChat,
    setCurrentResponse,
    setCurrentChatTitle,
  } = args[0];

  const {
    saveChatHistory,
    updateChatHistory,
    savedChatNames,
    chat,
    title,
    messages,
    currId,
  } = useChatHistoryState();

  useEffect(() => {
    if (messages && title) {
      setCurrentChat(messages);
      setCurrentChatTitle(title);
    }
  }, [messages, title, setCurrentChat, setCurrentChatTitle]);

  useEffect(() => {
    if (currentChat.length === 2 && !chat && !currentChatTitle) {
      const content =
        savedChatNames.length === 0
          ? titleRequestText
          : titleRequestText + uniqueTitleText + savedChatNames.join(', ');

      const message = {
        role: 'user',
        content,
      };

      fetchData([...currentChat, message]);
    }
  }, [currentChat, currentChatTitle, chat, fetchData, savedChatNames]);

  useEffect(() => {
    if (chatTitle) {
      setCurrentChatTitle(chatTitle);
    }
  }, [chatTitle, setCurrentChatTitle]);

  useEffect(() => {
    if (currentChatTitle && !savedChatNames.includes(currentChatTitle)) {
      saveChatHistory({
        id: currId + 1,
        title: currentChatTitle,
        messages: currentChat,
      });
    }
  }, [currentChat, currentChatTitle, saveChatHistory, currId, savedChatNames]);

  useEffect(() => {
    if (
      currentChat.length > 2 &&
      messages?.length !== currentChat.length &&
      currentChatTitle
    ) {
      updateChatHistory({
        id: currId,
        title: title || currentChatTitle,
        messages: currentChat,
      });
    }
  }, [
    messages,
    currentChat,
    currId,
    currentChatTitle,
    title,
    updateChatHistory,
  ]);

  useEffect(() => {
    if (response) {
      const lastIndex = response.lastIndexOf('_');
      const withoutTimestamp = response.slice(0, lastIndex);
      const message = {role: 'assistant', content: withoutTimestamp};

      setCurrentChat(prevSate => [...prevSate, message]);
      setCurrentResponse('');

      let i = 0;

      const interval = setInterval(() => {
        if (i < withoutTimestamp.length) {
          setCurrentResponse(prevState => prevState + withoutTimestamp[i]);
          i++;
        } else clearInterval(interval);
      }, 10);
    }
  }, [response, setCurrentChat, setCurrentResponse]);
};

export default useChatEffects;
