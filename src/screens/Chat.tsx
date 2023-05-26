import {useState, useEffect, useRef, useCallback} from 'react';
import {View, FlatList, Keyboard, useWindowDimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import {useTheme} from 'react-native-paper';
import useChatbot from '../hooks/useChatbot';
import StatusBar from '../components/StatusBar';
import Title from '../components/Title';
import FlatListItem from '../components/FlatListItem';
import Input from '../components/Input';
import Error from '../components/Error';
import {chatTitleRequestText, uniqueTitleText} from '../utils/chatTitleRequest';
import {MessageTypes, ChatRouteProp} from '../types';
import useChatHistoryStore from '../store/useChatHistoryStore';

const Chat = () => {
  const route = useRoute<ChatRouteProp>();
  const flatListRef = useRef<FlatList>(null);
  const {height} = useWindowDimensions();

  const {response, chatTitle, fetchData, error} = useChatbot();
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentChat, setCurrentChat] = useState<MessageTypes>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentChatTitle, setCurrentChatTitle] = useState(
    chatTitle || undefined,
  );

  const {chatHistory, saveChatHistory, updateChatHistory} = useChatHistoryStore(
    state => state,
  );

  let id = route.params?.id;
  const chat = chatHistory?.find(chat => chat.id === id);
  const title = chat?.title;
  const messages = chat?.messages;

  const {
    colors: {background},
  } = useTheme();

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
      console.log('runs title request');

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
        id: id || 1,
        title: title || currentChatTitle,
        messages: currentChat,
      });
    }

    if (currentChatTitle && !savedChatNames.includes(currentChatTitle)) {
      saveChatHistory({
        id: id || 1,
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

  const handleContentSizeChange = useCallback(
    (_: number, h: number) => {
      if (h > height / 2) flatListRef.current?.scrollToEnd();
    },
    [height],
  );

  const handleInput = useCallback(
    (text: string) => setInputValue(text),
    [inputValue],
  );

  const handleSubmit = useCallback(() => {
    const message = {role: 'user', content: inputValue};

    fetchData([...currentChat.slice(-5), message]);
    setCurrentChat(prev => [...prev, message]);
    setInputValue('');

    Keyboard.dismiss();
  }, [inputValue, fetchData]);

  const handleRefresh = useCallback(() => {
    id = 0;
    setCurrentChat([]);
    setCurrentChatTitle(undefined);
    setHasError(false);
  }, [id]);

  return (
    <View style={{flex: 1, backgroundColor: background}}>
      <StatusBar />
      <OrientationLocker orientation={PORTRAIT} />
      <Title />

      {hasError ? (
        <Error handleRefresh={handleRefresh} />
      ) : (
        <FlatList
          keyboardDismissMode="on-drag"
          ref={flatListRef}
          onContentSizeChange={handleContentSizeChange}
          data={currentChat}
          renderItem={props => (
            <FlatListItem
              {...{currentResponse, currentChat, response, ...props}}
            />
          )}
        />
      )}

      <Input {...{inputValue, handleInput, handleSubmit, error}} />
    </View>
  );
};

export default Chat;
