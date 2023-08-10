import {useEffect, useMemo} from 'react';
import useChatHistoryStore from '../store/useChatHistoryStore';
import {chatTitleRequestText, uniqueTitleText} from '../utils/chatTitleRequest';
import {ChatEffectTypes} from '../types';

const useChatEffects = (...args: ChatEffectTypes) => {
  const {chatHistory, saveChatHistory, updateChatHistory} = useChatHistoryStore(
    state => state,
  );
  const [values, setters, fetchData] = args;

  const {id, response, chatTitle, currentChat, currentChatTitle, error} =
    values;
  const {setCurrentChat, setCurrentChatTitle, setHasError, setCurrentResponse} =
    setters;

  const chat = chatHistory?.find(el => el.id === id);
  const messages = chat?.messages;
  const title = chat?.title;
  const oneChatExists = chatHistory.some(el => el.id === 1);
  const lastChatId = chatHistory[chatHistory?.length - 1]?.id;
  const savedChatNames = useMemo(
    () => chatHistory?.map(el => el.title),
    [chatHistory],
  );

  useEffect(() => {
    if (messages) {
      setCurrentChat(messages);
      setCurrentChatTitle(title);
    } else {
      setCurrentChat([]);
      setCurrentChatTitle(undefined);
    }
  }, [id, messages, title, setCurrentChat, setCurrentChatTitle]);

  useEffect(() => {
    if (chatTitle) setCurrentChatTitle(chatTitle);
  }, [chatTitle, setCurrentChatTitle]);

  useEffect(() => {
    if (error) setHasError(true);
  }, [error, setHasError]);

  useEffect(() => {
    const curSavedChatNames = chatHistory?.map(el => el.title);

    if (currentChat.length === 2 && !chat && !currentChatTitle) {
      const content =
        curSavedChatNames.length === 0
          ? chatTitleRequestText
          : chatTitleRequestText +
            uniqueTitleText +
            curSavedChatNames.join(', ');

      const message = {
        role: 'user',
        content,
      };

      fetchData([...currentChat, message]);
    }
  }, [currentChat, currentChatTitle, chat, fetchData, chatHistory]);

  useEffect(() => {
    const currId = id ? id : lastChatId ? lastChatId + 1 : 1;

    if (currentChat.length > 2 && currentChatTitle && oneChatExists) {
      updateChatHistory({
        id: currId,
        title: title || currentChatTitle,
        messages: currentChat,
      });
    }
  }, [
    currentChat,
    currentChatTitle,
    id,
    title,
    updateChatHistory,
    oneChatExists,
    lastChatId,
  ]);

  useEffect(() => {
    const currId = id ? id : lastChatId ? lastChatId + 1 : 1;

    if (currentChatTitle && !savedChatNames.includes(currentChatTitle)) {
      saveChatHistory({
        id: currId,
        title: currentChatTitle,
        messages: currentChat,
      });
    }
  }, [
    currentChat,
    currentChatTitle,
    saveChatHistory,
    id,
    lastChatId,
    savedChatNames,
  ]);

  useEffect(() => {
    if (response) {
      const idx = response.lastIndexOf('_');
      const withoutTimestamp = response.slice(0, idx);

      setCurrentChat(prev => [
        ...prev,
        {role: 'assistant', content: withoutTimestamp},
      ]);

      setCurrentResponse('');

      let i = 0;

      const interval = setInterval(() => {
        if (i < withoutTimestamp.length) {
          setCurrentResponse(prev => prev + withoutTimestamp[i]);
          i++;
        } else clearInterval(interval);
      }, 10);
    }
  }, [response, setCurrentChat, setCurrentResponse]);
};

export default useChatEffects;
