import {useState, useEffect, useRef, useCallback} from 'react';
import {
  StatusBar,
  View,
  useWindowDimensions,
  FlatList,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import {Provider} from 'react-native-paper';
import useChatbot from './src/hooks/useChatbot';
import Title from './src/components/Title';
import FlatListItem from './src/components/FlatListItem';
import Input from './src/components/Input';
import theme from './src/theme';
import {MessageTypes} from './src/types';

const App = () => {
  const {height} = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);

  const {response, fetchData} = useChatbot();
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState<MessageTypes>([]);
  const [currentResponse, setCurrentResponse] = useState('');

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
    <Provider theme={theme}>
      <View style={styles.container}>
        <OrientationLocker orientation={PORTRAIT} />
        <StatusBar backgroundColor={theme.colors.background} />

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
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
