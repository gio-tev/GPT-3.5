import {useState, useCallback} from 'react';
import {SafeAreaView, Keyboard} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import {useTheme} from 'react-native-paper';
import useChatbot from '../hooks/useChatbot';
import useChatEffects from '../hooks/useChatEffects';
import StatusBar from '../components/StatusBar';
import Title from '../components/Title';
import Input from '../components/Input';
import Error from '../components/Error';
import FlatList from '../components/FlatList';
import {MessageTypes, ChatRouteProp} from '../types';

const Chat = () => {
  const {response, chatTitle, fetchData, error} = useChatbot();
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentChat, setCurrentChat] = useState<MessageTypes>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentChatTitle, setCurrentChatTitle] = useState(
    chatTitle || undefined,
  );

  const route = useRoute<ChatRouteProp>();
  const id = route.params?.id;

  const {
    colors: {background},
  } = useTheme();

  const values = {
    id,
    response,
    chatTitle,
    currentChat,
    currentChatTitle,
    error,
  };

  const setters = {
    setCurrentChat,
    setCurrentChatTitle,
    setHasError,
    setCurrentResponse,
  };

  useChatEffects(values, setters, fetchData);

  const handleInput = useCallback((text: string) => setInputValue(text), []);

  const handleSubmit = useCallback(() => {
    const message = {role: 'user', content: inputValue};

    fetchData([...currentChat.slice(-5), message]);
    setCurrentChat(prev => [...prev, message]);
    setInputValue('');

    Keyboard.dismiss();
  }, [inputValue, fetchData, currentChat]);

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
