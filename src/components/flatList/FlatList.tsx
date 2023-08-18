import {useRef, useCallback} from 'react';
import {FlatList as List, useWindowDimensions} from 'react-native';
import FlatListItem from './FlatListItem';
import {FlatListTypes} from '../../types';

const FlatList = ({currentChat, currentResponse, response}: FlatListTypes) => {
  const flatListRef = useRef<List>(null);

  const {height} = useWindowDimensions();

  const handleContentSizeChange = useCallback(
    (_: number, h: number) => {
      if (h > height / 2) {
        flatListRef.current?.scrollToEnd();
      }
    },
    [height],
  );

  return (
    <List
      keyboardDismissMode="on-drag"
      ref={flatListRef}
      onContentSizeChange={handleContentSizeChange}
      data={currentChat}
      renderItem={props => (
        <FlatListItem {...{currentResponse, currentChat, response, ...props}} />
      )}
    />
  );
};

export default FlatList;
