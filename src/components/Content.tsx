import {useState, useEffect, useRef, useCallback} from 'react';
import {View, FlatList, Keyboard, useWindowDimensions} from 'react-native';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import {useTheme} from 'react-native-paper';
import useChatbot from '../hooks/useChatbot';
import StatusBar from './StatusBar';
import Title from './Title';
import FlatListItem from './FlatListItem';
import Input from './Input';
import {MessageTypes} from '../types';

const Content = () => {
  const {height} = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);

  const {response, fetchData} = useChatbot();
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState<MessageTypes>([]);
  const [currentResponse, setCurrentResponse] = useState('');

  const {
    colors: {background},
  } = useTheme();

  useEffect(() => {
    if (response) {
      setCurrentResponse('');
      setData(prev => [...prev, {role: 'assistant', content: response}]);

      let i = 0;

      const interval = setInterval(() => {
        if (i < response.length)
          setCurrentResponse(prev => prev + response[i]), i++;
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

  const handleInput = useCallback((text: string) => {
    setInputValue(text);
  }, []);

  const handleSubmit = useCallback(() => {
    const message = {role: 'user', content: inputValue};

    fetchData([...data.slice(-5), message]);
    setData(prev => [...prev, message]);
    setInputValue('');

    Keyboard.dismiss();
  }, [inputValue, fetchData]);

  return (
    <View style={{flex: 1, backgroundColor: background}}>
      <StatusBar />
      <OrientationLocker orientation={PORTRAIT} />
      <Title />

      <FlatList
        keyboardDismissMode="on-drag"
        ref={flatListRef}
        onContentSizeChange={handleContentSizeChange}
        data={data}
        renderItem={props => (
          <FlatListItem {...{currentResponse, data, ...props}} />
        )}
      />

      <Input {...{inputValue, handleInput, handleSubmit}} />
    </View>
  );
};

export default Content;
