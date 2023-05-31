import {useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  FlatList,
  useWindowDimensions,
  Keyboard,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import {useTheme} from 'react-native-paper';
import useChatbot from '../hooks/useChatbot';
import useChatEffects from '../hooks/useChatEffects';
import StatusBar from '../components/StatusBar';
import Title from '../components/Title';
import FlatListItem from '../components/FlatListItem';
import Input from '../components/Input';
import Error from '../components/Error';
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

  const {height} = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const route = useRoute<ChatRouteProp>();
  let id = route.params?.id;

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
    setHasError(false);
  }, [id]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: background}}>
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
    </SafeAreaView>
  );
};

export default Chat;
