import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import useChatHistoryStore from '../store/useChatHistoryStore';
import {DeleteButtonProps, ChatNavigationProp} from '../types/index';

const DeleteButton = ({color, navigation, id}: DeleteButtonProps) => {
  const {chatHistory, deleteChatHistory} = useChatHistoryStore(state => state);

  const lastChatId = chatHistory[chatHistory?.length - 1]?.id;

  const handleChatDelete = (navigation: ChatNavigationProp, id: number) => {
    deleteChatHistory(id);

    navigation.navigate('Chat', {
      id: lastChatId ? lastChatId + 1 : 1,
      title: '',
      messages: [],
    });
  };

  return (
    <IconButton
      icon="delete"
      iconColor={color}
      size={22}
      onPress={() => handleChatDelete(navigation, id)}
      style={styles.iconStyle}
    />
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    margin: 0,
    position: 'absolute',
    right: 5,
  },
});

export default DeleteButton;
