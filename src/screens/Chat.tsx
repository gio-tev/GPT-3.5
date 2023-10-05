import {useState, useCallback} from 'react';
import {SafeAreaView, Keyboard} from 'react-native';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import {useTheme} from 'react-native-paper';
import useChatbot from '../hooks/useChatbot';
import useCurrentChatState from '../components/chat/hooks/useCurrentChatState';
import useChatEffects from '../components/chat/hooks/useChatEffects';
import StatusBar from '../components/statusBar/StatusBar';
import Title from '../components/chat/Title';
import Input from '../components/chat/Input';
import Error from '../components/error/Error';
import FlatList from '../components/flatList/FlatList';

const Chat = () => {
  const {response, chatTitle, error, fetchData} = useChatbot();
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const {
    currentChat,
    currentResponse,
    currentChatTitle,
    setCurrentChat,
    setCurrentResponse,
    setCurrentChatTitle,
  } = useCurrentChatState();

  const {
    colors: {background},
  } = useTheme();

  useChatEffects({
    response,
    chatTitle,
    error,
    setHasError,
    fetchData,
    currentChat,
    currentChatTitle,
    setCurrentChat,
    setCurrentResponse,
    setCurrentChatTitle,
  });

  const handleInput = useCallback((text: string) => {
    setInputValue(text);
  }, []);

  const handleSubmit = useCallback(() => {
    const message = {role: 'user', content: inputValue};

    fetchData([...currentChat.slice(-5), message]);
    setCurrentChat(prevSate => [...prevSate, message]);
    setInputValue('');

    Keyboard.dismiss();
  }, [inputValue, fetchData, currentChat, setCurrentChat]);

  const handleRefresh = useCallback(() => {
    setHasError(false);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: background}}>
      <StatusBar />
      <OrientationLocker orientation={PORTRAIT} />
      <Title />

      {hasError ? (
        <Error handleRefresh={handleRefresh} />
      ) : (
        <FlatList {...{currentChat, currentResponse, response}} />
      )}

      <Input {...{inputValue, handleInput, handleSubmit, error}} />
    </SafeAreaView>
  );
};

export default Chat;
