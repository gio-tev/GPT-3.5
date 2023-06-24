import {useEffect} from 'react';
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

  const chat = chatHistory?.find(chat => chat.id === id);
  const title = chat?.title;
  const messages = chat?.messages;

  useEffect(() => {
    if (messages) {
      setCurrentChat(messages);
      setCurrentChatTitle(title);
    } else {
      setCurrentChat([]);
      setCurrentChatTitle(undefined);
    }
  }, [id]);

  useEffect(() => {
    if (chatTitle) setCurrentChatTitle(chatTitle);
  }, [chatTitle]);

  useEffect(() => {
    if (error) setHasError(true);
  }, [error]);

  useEffect(() => {
    const savedChatNames = chatHistory?.map(chat => chat.title);

    if (currentChat.length === 2 && !chat && !currentChatTitle) {
      const content =
        savedChatNames.length === 0
          ? chatTitleRequestText
          : chatTitleRequestText + uniqueTitleText + savedChatNames.join(', ');

      const message = {
        role: 'user',
        content,
      };

      fetchData([...currentChat, message]);
    }

    const oneChatExists = chatHistory.some(chat => chat.id === 1);

    if (currentChat.length > 2 && currentChatTitle && oneChatExists) {
      updateChatHistory({
        id,
        title: title || currentChatTitle,
        messages: currentChat,
      });
    }

    if (currentChatTitle && !savedChatNames.includes(currentChatTitle)) {
      saveChatHistory({
        id,
        title: currentChatTitle,
        messages: currentChat,
      });
    }
  }, [currentChat, currentChatTitle]);

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
        if (i < withoutTimestamp.length)
          setCurrentResponse(prev => prev + withoutTimestamp[i]), i++;
        else clearInterval(interval);
      }, 10);
    }
  }, [response]);
};

export default useChatEffects;
